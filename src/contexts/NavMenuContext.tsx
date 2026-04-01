import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { NavMenuData, NavMenuItem } from '../shared/types/navMenu';
import { defaultNavMenuData } from '../shared/types/navMenu';

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

const SECTION_KEYS: SectionKey[] = ['mainMenu', 'patientLinks1', 'patientLinks2', 'footerLinks'];

const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

// v2 — old key had invalid/empty data; new key guarantees a clean start
const STORAGE_KEY = 'navMenuData_v3';

const isValid = (d: unknown): d is NavMenuData => {
    if (!d || typeof d !== 'object') return false;
    const m = d as Record<string, unknown>;
    return (
        SECTION_KEYS.every((k) => Array.isArray(m[k]) && (m[k] as unknown[]).length > 0) &&
        Array.isArray(m.burgerHiddenPages)
    );
};

const load = (): NavMenuData => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (isValid(parsed)) return parsed as NavMenuData;
        }
    } catch {}
    return defaultNavMenuData;
};

const save = (data: NavMenuData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Returns the section array from prev, falling back to default if prev is stale/empty
const safeSection = (prev: NavMenuData, key: SectionKey): NavMenuItem[] => {
    const arr = prev[key];
    return Array.isArray(arr) && arr.length > 0 ? arr : defaultNavMenuData[key];
};

export const NavMenuProvider = ({ children }: { children: ReactNode }) => {
    const [menuData, setMenuDataState] = useState<NavMenuData>(load);

    const setMenuData = useCallback((data: NavMenuData) => {
        setMenuDataState(data);
        save(data);
    }, []);

    const updateItem = useCallback((section: SectionKey, id: number, updates: Partial<NavMenuItem>) => {
        setMenuDataState((prev) => {
            const updated = {
                ...prev,
                [section]: safeSection(prev, section).map((item) =>
                    item.id === id ? { ...item, ...updates } : item
                ),
            };
            save(updated);
            return updated;
        });
    }, []);

    const toggleItem = useCallback((section: SectionKey, id: number) => {
        setMenuDataState((prev) => {
            const updated = {
                ...prev,
                [section]: safeSection(prev, section).map((item) =>
                    item.id === id ? { ...item, enabled: !item.enabled } : item
                ),
            };
            save(updated);
            return updated;
        });
    }, []);

    const addItem = useCallback((section: SectionKey) => {
        setMenuDataState((prev) => {
            const items = safeSection(prev, section);
            const maxId = items.reduce((m, item) => Math.max(m, item.id), 0);
            const updated = {
                ...prev,
                [section]: [...items, { id: maxId + 1, label: 'Новый пункт', link: '/', enabled: true }],
            };
            save(updated);
            return updated;
        });
    }, []);

    const deleteItem = useCallback((section: SectionKey, id: number) => {
        setMenuDataState((prev) => {
            const updated = {
                ...prev,
                [section]: safeSection(prev, section).filter((item) => item.id !== id),
            };
            save(updated);
            return updated;
        });
    }, []);

    const setBurgerHiddenPages = useCallback((pages: string[]) => {
        setMenuDataState((prev) => {
            const updated = { ...prev, burgerHiddenPages: pages };
            save(updated);
            return updated;
        });
    }, []);

    // If in-memory state is stale (HMR), expose defaultNavMenuData to consumers
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
