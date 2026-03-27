import { useState } from "react";
import { usePopup } from "./PopupContext";
import { submitFeedback } from "../services/api";

const ContactPopUp = () => {
    const { isOpen, closePopup } = usePopup();
    const [agree, setAgree] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [interest, setInterest] = useState("");

    // Стейт для ошибок валидации
    const [errors, setErrors] = useState<{ phone?: string; email?: string }>(
        {},
    );

    const [status, setStatus] = useState<
        null | "success" | "error" | "loading"
    >(null);

    const popupName = "contact";

    // Функция валидации
    const validateForm = () => {
        const newErrors: { phone?: string; email?: string } = {};
        let isValid = true;

        // Валидация Email (простейшая регулярка: текст@текст.текст)
        // Проверяем только если email введен (так как он не required в HTML)
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Введите корректный email";
            isValid = false;
        }

        // Валидация Телефона
        // Очищаем от скобок, минусов, плюсов и пробелов для проверки длины
        const cleanPhone = phone.replace(/\D/g, "");

        // Проверка: должны быть цифры, и их количество от 10 до 15 (стандарт РФ - 11 цифр)
        if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            newErrors.phone =
                "Введите корректный номер телефона (минимум 10 цифр)";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Сбрасываем статус перед новой попыткой
        setStatus(null);

        // 1. Проверка чекбокса
        if (!agree) {
            alert("Вы должны принять условия обработки персональных данных");
            return;
        }

        // 2. Валидация полей
        if (!validateForm()) {
            return; // Прерываем, если есть ошибки
        }

        setStatus("loading");

        try {
            const data = await submitFeedback({ name, phone, email, message: interest });

            if (data.success) {
                setName("");
                setPhone("");
                setEmail("");
                setInterest("");
                setAgree(false);
                setErrors({});
                setStatus("success");
            } else {
                setStatus("error");
                console.error("Ошибка сервера:", data.error);
            }
        } catch (err) {
            setStatus("error");
            console.error("Ошибка запроса:", err);
        }
    };

    // Обработчик изменений инпутов, чтобы убирать ошибку при вводе
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        if (errors.phone) setErrors({ ...errors, phone: undefined });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: undefined });
    };

    return (
        <div
            className="fixed inset-0 bg-[#691C32] h-dvh w-full overflow-hidden group z-[999999] md:grid grid-cols-2 transition-all duration-1000"
            style={{
                scale: isOpen(popupName) ? 1 : 0.5,
                opacity: isOpen(popupName) ? 1 : 0,
                pointerEvents: isOpen(popupName) ? "auto" : "none",
            }}
        >
            <div className="max-h-full overflow-hidden md:block hidden">
                <img
                    src="/contact.webp"
                    alt="contact"
                    className="object-cover max-h-full w-full object-center h-full"
                />
            </div>
            <div className="p-[30px] md:p-[80px] 2xl:p-[160px]">
                <div className="flex justify-between gap-2 items-center mb-6 pt-[50px]">
                    <h2 className="leading-[125%] text-[24px] 2xl:text-[44px] text-white uppercase">
                        Запланировать визит
                    </h2>
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        className="cursor-pointer absolute top-6 right-6"
                        onClick={() => closePopup(popupName)}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.5"
                            y="0.5"
                            width="47"
                            height="47"
                            rx="23.5"
                            stroke="white"
                            strokeOpacity="0.1"
                        />
                        <path
                            d="M30.75 17.25L24 24M17.25 30.75L24 24M24 24L17.25 17.25L30.75 30.75"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="КАК ВАС ЗОВУТ?*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-2"
                    />

                    {/* Телефон */}
                    <div className="mb-2">
                        <input
                            type="tel"
                            placeholder="ТЕЛЕФОН*"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                            className={`placeholder:text-[#FFFFFF80] py-4 border-b w-full text-white text-sm 2xl:text-[21px] outline-none ${
                                errors.phone
                                    ? "border-red-400"
                                    : "border-[#FFFFFF1A]"
                            }`}
                        />
                        {errors.phone && (
                            <span className="text-red-400 text-xs mt-1 block">
                                {errors.phone}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        <input
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={handleEmailChange}
                            className={`placeholder:text-[#FFFFFF80] py-4 border-b w-full text-white text-sm 2xl:text-[21px] outline-none ${
                                errors.email
                                    ? "border-red-400"
                                    : "border-[#FFFFFF1A]"
                            }`}
                        />
                        {errors.email && (
                            <span className="text-red-400 text-xs mt-1 block">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="ЧТО ВАС ИНТЕРЕСУЕТ?"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-10"
                    />

                    {/* Чекбокс согласия */}
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="border-[1.5px] border-white w-[15px] h-[15px] aspect-square relative cursor-pointer"
                            style={{
                                backgroundColor: agree
                                    ? "#FFFFFF"
                                    : "transparent",
                            }}
                            onClick={() => setAgree(!agree)}
                        >
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                className="absolute inset-0 sr-only"
                            />
                        </div>
                        <div className="text-[#FFFFFFBF] text-sm 2xl:text-base">
                            Принимаю{" "}
                            <span className="text-white underline">
                                условия обработки персональных данных
                            </span>
                        </div>
                    </div>

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-white 2xl:px-8 px-4 2xl:py-5 py-2.5 text-sm 2xl:text-base text-[#691C32] font-semibold uppercase cursor-pointer disabled:opacity-50 transition-opacity"
                    >
                        {status === "loading" ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
                    </button>

                    {/* Статус */}
                    {status === "success" && (
                        <p className="mt-2 text-white">
                            Заявка успешно отправлена!
                        </p>
                    )}
                    {status === "error" && (
                        <p className="mt-2 text-white">
                            Ошибка при отправке. Попробуйте снова.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactPopUp;
