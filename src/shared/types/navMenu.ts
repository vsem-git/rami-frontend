export interface NavMenuItem {
    id: number;
    label: string;
    link: string;
    enabled: boolean;
}

export interface NavMenuData {
    /** Основные ссылки бургер-меню (верхняя группа) */
    mainMenu: NavMenuItem[];
    /** «Пациентам» → левая колонка */
    patientLinks1: NavMenuItem[];
    /** «Пациентам» → правая колонка */
    patientLinks2: NavMenuItem[];
    /** Нижние ссылки в бургере */
    footerLinks: NavMenuItem[];
    /** Ссылки в футере */
    footerMenuLinks: NavMenuItem[];
    /** Маршруты, на которых бургер-кнопка СКРЫТА */
    burgerHiddenPages: string[];
}

export const defaultNavMenuData: NavMenuData = {
    /** Главные ссылки бургера (верхняя группа) */
    mainMenu: [
        { id: 1, label: "Управление возрастом", link: "/anti-age", enabled: true },
        { id: 2, label: "Пластическая хирургия", link: "/plastic", enabled: true },
        { id: 3, label: "Косметология", link: "/cosmetology", enabled: true },
        { id: 4, label: "Врачи", link: "/doctors", enabled: true },
    ],
    /** «Пациентам» → левая колонка */
    patientLinks1: [
        { id: 10, label: "О клинике", link: "/about", enabled: true },
        { id: 11, label: "Реабилитация", link: "/reabilitation", enabled: true },
        { id: 12, label: "Безопасность", link: "/safety", enabled: true },
        { id: 13, label: "Умные операционные", link: "/operation-rooms", enabled: true },
        { id: 14, label: "Подготовка к операции", link: "/getting-ready", enabled: true },
        { id: 15, label: "Цены", link: "/prices", enabled: true },
    ],
    /** «Пациентам» → правая колонка */
    patientLinks2: [
        { id: 20, label: "Медицинские апартаменты", link: "/apartments", enabled: true },
        { id: 21, label: "Медицинский туризм", link: "/tourism", enabled: true },
        { id: 22, label: "Персонализированный сервис", link: "/#", enabled: false },
        { id: 23, label: "Здоровье крестовского", link: "/#", enabled: false },
        { id: 24, label: "Партнёры", link: "/#", enabled: false },
    ],
    /** Нижние ссылки бургера */
    footerLinks: [
        { id: 30, label: "Блог", link: "/news", enabled: true },
        { id: 31, label: "Контакты", link: "/contacts", enabled: true },
        { id: 32, label: "Пациентам", link: "/patient", enabled: true },
        { id: 33, label: "Документы", link: "/documents", enabled: true },
    ],
    /** Ссылки в футере */
    footerMenuLinks: [
        { id: 40, label: "Блог", link: "/", enabled: true },
        { id: 41, label: "Пациентам", link: "/patient", enabled: true },
        { id: 42, label: "Лицензия", link: "/Выписка_из_реестра.pdf", enabled: true },
        { id: 43, label: "Политика конфиденциальности", link: "/privacy-policy", enabled: true },
    ],
    /** Страницы, на которых бургер скрыт */
    burgerHiddenPages: [],
};
