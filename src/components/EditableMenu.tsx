interface MenuItem {
    id: number;
    label: string;
    link?: string;
    popup?: string;
    onClick?: () => void;
}

interface EditableMenuProps {
    items: MenuItem[];
    pageKey: string;
    onPopupOpen?: (popupName: string) => void;
    className?: string;
}

export const EditableMenu = ({
    items,
    pageKey,
    onPopupOpen,
    className = '',
}: EditableMenuProps) => {
    const handleClick = (item: MenuItem) => {
        if (item.popup && onPopupOpen) {
            onPopupOpen(item.popup);
        } else if (item.link) {
            window.location.href = item.link;
        } else if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <ul className={`flex flex-col gap-3 ${className}`}>
            {items.map((item, i) => (
                <li
                    key={item.id}
                    onClick={() => handleClick(item)}
                    className="flex items-center gap-4 cursor-pointer uppercase group"
                    data-content-hint={`${pageKey}.menu.${i}.label`}
                >
                    <span
                        className="text-white transition-all duration-300"
                        data-content-hint={`${pageKey}.menu.${i}.number`}
                    >
                        {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="text-sm 2xl:text-base text-white font-normal leading-none relative">
                        <span
                            data-content-hint={`${pageKey}.menu.${i}.label`}
                            className="relative"
                        >
                            {item.label}
                            <span className="absolute left-0 bottom-0 h-[1px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </span>
                </li>
            ))}
        </ul>
    );
};
