const Documents = () => {
    return (
        <div className="w-full mt-[120px] sm:mt-[140px] xl:mt-[210px] max-w-[720px] xl:max-w-[1080px] mx-auto mb-20 px-4">
            <h1 className="text-xl sm:text-2xl lg:text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase">
                Документы
            </h1>
            <div className="mt-4 xl:mt-8 text-xs xl:text-lg leading-[155%] uppercase text-[#1D1D1D]">
                <h3 className="font-bold mb-4">Договор</h3>
                <a href="https://rami.clinic/pravovaya-informaciya/dogovor-online-consultaciya.pdf">
                    Ссылка
                </a>
            </div>

            <div className="mt-4 xl:mt-8 text-xs xl:text-lg leading-[155%] uppercase text-[#1D1D1D]">
                <h3 className="font-bold mb-4">Лицензия</h3>
                <a href="/%D0%92%D1%8B%D0%BF%D0%B8%D1%81%D0%BA%D0%B0_%D0%B8%D0%B7_%D1%80%D0%B5%D0%B5%D1%81%D1%82%D1%80%D0%B0.pdf">
                    Ссылка
                </a>
            </div>

            <div className="mt-4 xl:mt-8 text-xs xl:text-lg leading-[155%] uppercase text-[#1D1D1D]">
                <h3 className="font-bold mb-4">Политика конфиденциальности</h3>
                <a href="/privacy-policy">Ссылка</a>
            </div>

            <div className="mt-4 xl:mt-8 text-xs xl:text-lg leading-[155%] uppercase text-[#1D1D1D]">
                <h3 className="font-bold mb-4">Прайс</h3>
                <a href="/price">Ссылка</a>
            </div>
        </div>
    );
};

export default Documents;
