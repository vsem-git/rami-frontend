export const AboutInfo = () => {
    return (
        <div className="relative w-full h-[1660px] bg-[#1D1D1D]">
            <img src="about/Group 630.png" alt="" className="absolute w-full" />

            <div className="w-full relative z-10 pt-[15rem] pl-[17.8rem]">
                <p className="text-base text-[#EAE6E0] uppercase max-w-[372px] ">
                    RAMICLINIC RESIDENCE — новая Клиника-резиденция с
                    традициями, где в центре внимания — пациент. Здесь воплощён
                    уникальный пациентоцентричный подход: врачи, диагностическое
                    оборудование, всё, что необходимо для оценки здоровья,
                    обеспечения безопасной хирургии и эффективной реабилитации —
                    устремляется к пациенту, окружает заботой, работает на его
                    мечту
                </p>
            </div>

            <div className="w-full relative z-10 flex justify-end pr-[288px] -mt-[4rem]">
                <div className="">
                    <img
                        src="about/image 110.png"
                        alt=""
                        className="absolute top-1/2 -translate-y-1/2 ml-[-10rem] w-[254px]"
                    />
                    <img
                        src="about/image 108.png"
                        alt=""
                        className="w-[738px]"
                    />
                </div>
            </div>

            <img
                src="about/in.png"
                alt=""
                className="absolute left-[-1rem] top-[55%] -translate-y-1/2"
            />
        </div>
    );
};
