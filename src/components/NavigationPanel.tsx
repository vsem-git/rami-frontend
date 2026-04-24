import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavMenu } from '../contexts/NavMenuContext';
import type { NavMenuData, NavMenuItem } from '../shared/types/navMenu';
import { defaultNavMenuData } from '../shared/types/navMenu';

interface NavigationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const SECTIONS: { key: keyof Omit<NavMenuData, 'burgerHiddenPages'>; label: string }[] = [
    { key: 'mainMenu',      label: 'Главное меню' },
    { key: 'patientLinks1', label: 'Пациентам — левая колонка' },
    { key: 'patientLinks2', label: 'Пациентам — правая колонка' },
    { key: 'footerLinks',   label: 'Нижние ссылки (бургер)' },
    { key: 'footerMenuLinks', label: 'Ссылки футера' },
];

export const NavigationPanel = ({ isOpen, onClose }: NavigationPanelProps) => {
    const { menuData, setMenuData, updateItem, toggleItem, addItem, deleteItem, setBurgerHiddenPages } = useNavMenu();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        mainMenu: true, patientLinks1: true, patientLinks2: true, footerLinks: true, burger: true,
    });
    const [newPage, setNewPage] = useState('');

    if (!isOpen) return null;

    const toggleSection = (key: string) =>
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

    const addBurgerPage = () => {
        const trimmed = newPage.trim();
        if (!trimmed || menuData.burgerHiddenPages.includes(trimmed)) return;
        setBurgerHiddenPages([...menuData.burgerHiddenPages, trimmed]);
        setNewPage('');
    };

    const handleReset = () => {
        if (!confirm('Сбросить навигацию к значениям по умолчанию?')) return;
        setMenuData(defaultNavMenuData);
    };

    const inp = 'border border-gray-200 rounded px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-[#691C32]/50 transition-colors';

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40"
                style={{ zIndex: 99995 }}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className="fixed top-0 right-0 h-full bg-[#f8f7f6] border-l border-black/10 shadow-2xl flex flex-col"
                style={{ width: 560, zIndex: 99996 }}
            >
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-black/8 shrink-0">
                    <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider flex-1">
                        Навигация
                    </span>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-gray-400 hover:text-red-500 uppercase tracking-wider transition-colors cursor-pointer px-2 py-1"
                    >
                        Сброс
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-gray-400 hover:text-gray-700"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div
                    className="flex-1 overflow-y-auto"
                    style={{ minHeight: 0 }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* Column hint row */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        <span className="w-5 shrink-0" />
                        <span className="flex-1">Название</span>
                        <span className="w-32">Ссылка</span>
                        <span className="w-5 shrink-0" />
                    </div>

                    {/* Menu sections */}
                    {SECTIONS.map(({ key, label }) => {
                        const items: NavMenuItem[] = menuData[key] ?? [];
                        const isOpen = openSections[key] ?? true;
                        const enabledCount = items.filter((i) => i.enabled).length;

                        return (
                            <div key={key} className="border-t border-gray-100">
                                {/* Section header */}
                                <button
                                    type="button"
                                    onClick={() => toggleSection(key)}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <svg
                                        width="10" height="10" viewBox="0 0 10 10"
                                        className={`shrink-0 text-gray-400 transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
                                        fill="currentColor"
                                    >
                                        <path d="M3 2l4 3-4 3V2z" />
                                    </svg>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex-1">
                                        {label}
                                    </span>
                                    <span className="text-xs bg-[#691C32]/10 text-[#691C32] px-1.5 py-0.5 rounded font-mono">
                                        {enabledCount}/{items.length}
                                    </span>
                                </button>

                                {/* Items */}
                                {isOpen && (
                                    <div className="px-4 pb-4 flex flex-col gap-2">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-2 p-2 rounded border bg-white"
                                                style={{ borderColor: item.enabled ? '#e5e7eb' : '#f3f4f6' }}
                                            >
                                                {/* Enable toggle */}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleItem(key, item.id)}
                                                    className="shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors cursor-pointer"
                                                    style={{ backgroundColor: item.enabled ? '#691C32' : '#d1d5db' }}
                                                    title={item.enabled ? 'Включено' : 'Выключено'}
                                                >
                                                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2">
                                                        {item.enabled
                                                            ? <path d="M2 5l2.5 2.5L8 3" />
                                                            : <circle cx="5" cy="5" r="3" />
                                                        }
                                                    </svg>
                                                </button>

                                                {/* Label */}
                                                <input
                                                    type="text"
                                                    value={item.label}
                                                    onChange={(e) => updateItem(key, item.id, { label: e.target.value })}
                                                    className={`${inp} flex-1`}
                                                    style={{ color: '#1d1d1d' }}
                                                    placeholder="Название"
                                                />

                                                {/* Link */}
                                                <input
                                                    type="text"
                                                    value={item.link}
                                                    onChange={(e) => updateItem(key, item.id, { link: e.target.value })}
                                                    className={`${inp} w-32`}
                                                    style={{ color: '#1d1d1d' }}
                                                    placeholder="/page"
                                                />

                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={() => deleteItem(key, item.id)}
                                                    className="shrink-0 w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <line x1="2" y1="2" x2="8" y2="8" />
                                                        <line x1="8" y1="2" x2="2" y2="8" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={() => addItem(key)}
                                            className="mt-1 flex items-center gap-1.5 text-xs text-[#691C32]/60 hover:text-[#691C32] uppercase tracking-wider transition-colors cursor-pointer"
                                        >
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <line x1="5" y1="1" x2="5" y2="9" />
                                                <line x1="1" y1="5" x2="9" y2="5" />
                                            </svg>
                                            Добавить пункт
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Burger hidden pages */}
                    <div className="border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => toggleSection('burger')}
                            className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <svg
                                width="10" height="10" viewBox="0 0 10 10"
                                className={`shrink-0 text-gray-400 transition-transform duration-150 ${openSections.burger ? 'rotate-90' : ''}`}
                                fill="currentColor"
                            >
                                <path d="M3 2l4 3-4 3V2z" />
                            </svg>
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex-1">
                                Бургер скрыт на страницах
                            </span>
                            {menuData.burgerHiddenPages.length > 0 && (
                                <span className="text-xs bg-[#691C32]/10 text-[#691C32] px-1.5 py-0.5 rounded font-mono">
                                    {menuData.burgerHiddenPages.length}
                                </span>
                            )}
                        </button>

                        {openSections.burger && (
                            <div className="px-4 pb-4 flex flex-col gap-2">
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Маршруты, на которых кнопка-бургер скрыта (например{' '}
                                    <code className="bg-gray-100 px-1 rounded">/patient</code>).
                                </p>

                                {menuData.burgerHiddenPages.map((page) => (
                                    <div key={page} className="flex items-center gap-2 p-2 rounded border border-gray-200 bg-white">
                                        <span className="flex-1 text-xs font-mono text-gray-700">{page}</span>
                                        <button
                                            type="button"
                                            onClick={() => setBurgerHiddenPages(menuData.burgerHiddenPages.filter((p) => p !== page))}
                                            className="w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                                        >
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <line x1="2" y1="2" x2="8" y2="8" />
                                                <line x1="8" y1="2" x2="2" y2="8" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}

                                <div className="flex gap-2 mt-1">
                                    <input
                                        type="text"
                                        value={newPage}
                                        onChange={(e) => setNewPage(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addBurgerPage(); } }}
                                        className={`${inp} flex-1`}
                                        style={{ color: '#1d1d1d' }}
                                        placeholder="/page"
                                    />
                                    <button
                                        type="button"
                                        onClick={addBurgerPage}
                                        className="px-3 py-1.5 text-xs uppercase tracking-wider bg-gray-800 text-white rounded hover:bg-[#691C32] transition-colors cursor-pointer"
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-8" />
                </div>
            </div>
        </>,
        document.body,
    );
};
