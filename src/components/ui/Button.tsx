import cn from "classnames";

interface ButtonProps {
    variant?: "outline" | "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Button = ({
    variant = "outline",
    size = "md",
    children,
    className,
    onClick,
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center justify-center uppercase cursor-pointer transition-all duration-300 font-semibold border",
                {
                    "border-[#1D1D1D1F] text-[#1D1D1D] bg-transparent  hover:border-[#1D1D1D] hover:scale-101 active:scale-99":
                        variant === "outline",

                    "bg-[#1D1D1D] text-white border-transparent hover:bg-opacity-80":
                        variant === "primary",
                    "bg-gray-200 text-[#1D1D1D] border-transparent hover:bg-gray-300":
                        variant === "secondary",

                    "py-3 px-6 text-sm": size === "sm",
                    "py-5 px-8 text-base": size === "md",
                    "py-6 px-10 text-lg": size === "lg",
                },
                className,
            )}
        >
            {children}
        </button>
    );
};
