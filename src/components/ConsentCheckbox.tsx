import { useState } from "react";

export const ConsentCheckbox = ({
    isChecked = false,
}: {
    isChecked?: boolean;
}) => {
    const [checked, setChecked] = useState(isChecked);

    return (
        <div className="flex items-center gap-3">
            <label
                className={`relative cursor-pointer w-[15px] h-[15px] border-[1.5px] border-white block ${
                    checked ? "bg-white" : ""
                }`}
            >
                <input
                    type="checkbox"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
            </label>
            <p className="text-[#FFFFFFBF] text-sm">
                Принимаю{" "}
                <span className="text-white underline">
                    условия обработки персональных данных
                </span>
            </p>
        </div>
    );
};
