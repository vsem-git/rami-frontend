import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { NavMenuData, NavMenuItem } from '../shared/types/navMenu';
import { defaultNavMenuData } from '../shared/types/navMenu';
import pb from '../services/pocketbase';

interface NavMenuContextType {
    menuData: NavMenuData;
    setMenuData: (data: NavMenuData) => void;
    updateItem: (section: SectionKey, id: number, updates: Partial<NavMenuItem>) => void;
    toggleItem: (section: SectionKey, id: number) => void;
    addItem: (section: SectionKey) => void;
    deleteItem: (section: SectionKey, id: number) => void;
    setBurgerHiddenPages: (pages: string[]) => void;
}

type SectionKey = keyof Omit<NavMenuData, 'burgerHiddenPages'>;

const SECTION_KEYS: SectionKey[] = ['mainMenu', 'patientLinks1', 'patientLinks2', 'footerLinks', 'footerMenuLinks'];

const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

const STORAGE_KEY = 'navMenuData_v3';
const PB_KEY = 'main';

const isValid = (d: unknown): d is NavMenuData => {
    if (!d || typeof d !== 'object') return false;
    const m = d as Record<string, unknown>;
    return (
        SECTION_KEYS.every((k) => Array.isArray(m[k]) && (m[k] as unknown[]).length > 0) &&
        Array.isArray(m.burgerHiddenPages)
    );
};

const loadLocal = (): NavMenuData => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (isValid(parsed)) return parsed as NavMenuData;
        }
    } catch {}
    return defaultNavMenuData;
};

const saveLocal = (data: NavMenuData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const safeSection = (prev: NavMenuData, key: SectionKey): NavMenuItem[] => {
    const arr = prev[key];
    return Array.isArray(arr) && arr.length > 0 ? arr : defaultNavMenuData[key];
};

export const NavMenuProvider = ({ children }: { children: ReactNode }) => {
    const [menuData, setMenuDataState] = useState<NavMenuData>(loadLocal);
    const pbRecordId = useRef<string | null>(null);

    // Load from PocketBase on mount, override local state if found
    useEffect(() => {
        pb.collection('navigation')
            .getFirstListItem(`key="${PB_KEY}"`)
            .then((record) => {
                pbRecordId.current = record.id;
                try {
                    const parsed = JSON.parse(record.data as string);
                    if (isValid(parsed)) {
                        setMenuDataState(parsed);
                        saveLocal(parsed);
                    }
                } catch {}
            })
            .catch(() => {
                // Record not yet in DB — will be created on first save
            });
    }, []);

    // Persist to localStorage + PocketBase
    const persist = useCallback((data: NavMenuData) => {
        saveLocal(data);
        const json = JSON.stringify(data);
        if (pbRecordId.current) {
            pb.collection('navigation')
                .update(pbRecordId.current, { data: json })
                .catch(console.error);
        } else {
            pb.collection('navigation')
                .create({ key: PB_KEY, data: json })
                .then((r) => { pbRecordId.current = r.id; })
                .catch(console.error);
        }
    }, []);

    const setMenuData = useCallback((data: NavMenuData) => {
        setMenuDataState(data);
        persist(data);
    }, [persist]);

    const updateItem = useCallback((section: SectionKey, id: number, updates: Partial<NavMenuItem>) => {
        setMenuDataState((prev) => {
            const updated = {
                ...prev,
                [section]: safeSection(prev, section).map((item) =>
                    item.id === id ? { ...item, ...updates } : item
                ),
            };
            persist(updated);
            return updated;
        });
    }, [persist]);

    const toggleItem = useCallback((section: SectionKey, id: number) => {
        setMenuDataState((prev) => {
            const updated = {
                ...prev,
                [section]: safeSection(prev, section).map((item) =>
                    item.id === id ? { ...item, enabled: !item.enabled } : item
                ),
            };
            persist(updated);
            return updated;
        });
    }, [persist]);

    const addItem = useCallback((section: SectionKey) => {
        setMenuDataState((prev) => {
            const items = safeSection(prev, section);
            const maxId = items.reduce((m, item) => Math.max(m, item.id), 0);
            const updated = {
                ...prev,
                [section]: [...items, { id: maxId + 1, label: 'Новый пункт', link: '/', enabled: true }],
            };
            persist(updated);
            return updated;
        });
    }, [persist]);

    const deleteItem = useCallback((section: SectionKey, id: number) => {
        setMenuDataState((prev) => {
            const updated = {
                ...prev,
                [section]: safeSection(prev, section).filter((item) => item.id !== id),
            };
            persist(updated);
            return updated;
        });
    }, [persist]);

    const setBurgerHiddenPages = useCallback((pages: string[]) => {
        setMenuDataState((prev) => {
            const updated = { ...prev, burgerHiddenPages: pages };
            persist(updated);
            return updated;
        });
    }, [persist]);

    const exposedData = isValid(menuData) ? menuData : defaultNavMenuData;

    return (
        <NavMenuContext.Provider
            value={{ menuData: exposedData, setMenuData, updateItem, toggleItem, addItem, deleteItem, setBurgerHiddenPages }}
        >
            {children}
        </NavMenuContext.Provider>
    );
};

export const useNavMenu = () => {
    const context = useContext(NavMenuContext);
    if (!context) throw new Error('useNavMenu must be used within NavMenuProvider');
    return context;
};
