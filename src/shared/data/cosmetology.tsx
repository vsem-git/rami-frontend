import { usePopup } from "../../components/PopupContext";

const ContactButton = () => {
    const { openPopup } = usePopup();

    return (
        <button
            className="w-full sm:w-[211px] md:w-[289px] whitespace-nowrap h-[56px] md:h-[64px] flex items-center justify-center px-8 py-6 bg-white border border-transparent text-[#691C32] text-xs md:text-base font-semibold uppercase cursor-pointer hover:bg-transparent hover:border-white hover:text-white transition-colors duration-300"
            onClick={() => openPopup("contact")}
        >
            Запланировать визит
        </button>
    );
};

const ContactButtonSecond = () => {
    const { openPopup } = usePopup();

    return (
        <button
            className="
   	w-[211px] md:w-[289px] whitespace-nowrap h-[56px] md:h-[64px] flex items-center justify-center px-8 py-6
    bg-white border border-transparent text-[#691C32] text-xs md:text-base font-semibold uppercase cursor-pointer
    hover:bg-transparent hover:border-white hover:text-white transition-colors duration-300
    relative z-50   "
            onClick={() => openPopup("contact")}
        >
            Запланировать визит
        </button>
    );
};

export const COSMETOLOGY = [
    {
        id: 1,
        content: (
            <>
                <p className="text-[10px]/[155%] md:text-xs/[155%] xl:text-[clamp(0.75rem,1vw,0.875rem)]/[155%] text-white uppercase font-normal max-w-full sm:max-w-[356px] md:max-w-[400px] xl:max-w-[clamp(400px,40vw,580px)] mb-10">
                    Интеллектуальная косметология – это{" "}
                    <span className="font-bold">
                        глубинный междисциплинарный подход{" "}
                    </span>
                    который кардинально отличает принципы работы отделения
                    косметологии RAMICLINIC RESIDENCE от обычной клиники
                    эстетической медицины.
                </p>
                <ContactButton />
            </>
        ),
    },
    {
        id: 2,
        content: (
            <>
                <h3 className="text-base md:text-base xl:text-[clamp(0.875rem,1.2vw,1rem)] text-white uppercase font-normal max-w-[400px] xl:max-w-[clamp(400px,40vw,580px)]">
                    Современные возможности интеллектуальной косметологии:
                </h3>
                <p className="text-[11px] sm:text-xs md:text-xs xl:text-[clamp(0.75rem,1vw,0.875rem)]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[clamp(350px,35vw,480px)] mt-8">
                    Специалисты RAMICLINIC RESIDENCE назначают процедуры на
                    основе данных{" "}
                    <span className="font-bold">
                        генетического паспорта, лабораторных и инструментальных
                        исследований
                    </span>{" "}
                    с единственной целью – достижение максимально яркого и
                    стойкого результата для каждого отдельного человека,
                    обладающего уникальным набором генетических и физических
                    характеристик, определенным гормональным статусом.
                </p>
            </>
        ),
    },
    {
        id: 3,
        content: (
            <p className="text-sm md:text-sm xl:text-[clamp(0.875rem,1.2vw,1rem)]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[clamp(400px,45vw,580px)]">
                Только такой глубинный подход позволяет избежать назначения
                ненужных процедур и составить{" "}
                <span className="font-bold">
                    наиболее точную программу омоложения
                </span>
                , подготовки к пластической операции и реабилитации после нее.
            </p>
        ),
    },
    {
        id: 4,
        content: (
            <p className="text-sm md:text-sm xl:text-[clamp(0.875rem,1.2vw,1rem)]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[clamp(400px,40vw,580px)]">
                Устранение дефицитов в организме и гормональных нарушений –
                важные составляющие преображения, которые решают те же вопросы
                красоты и молодости, но изнутри. Таким глубоким пониманием связи
                внутренних процессов и внешних изменений обладает редкий на
                сегодняшний день в России{" "}
                <span className="font-bold">антиэйдж-специалист</span>.
            </p>
        ),
    },
    {
        id: 5,
        content: (
            <p className="text-sm md:text-sm xl:text-[clamp(0.875rem,1.2vw,1rem)]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[clamp(400px,40vw,580px)]">
                Наши гости отмечают, что вопросы их красоты и молодости еще
                нигде так пристально и всесторонне не рассматривались, как в
                Клинике-резиденции
                <strong className="ml-1">RAMICLINIC RESIDENCE</strong>.
            </p>
        ),
    },
    {
        id: 6,
        content: (
            <>
                <p className="text-sm md:text-sm xl:text-[clamp(0.875rem,1.2vw,1rem)]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[clamp(400px,40vw,580px)] mb-10">
                    Только такой подход позволяет достичь{" "}
                    <span className="font-bold">
                        предельной результативности
                    </span>{" "}
                    всех процессов, которые ежесекундно протекают в Клинике:
                    омоложение внешности, эффективная подготовка к пластической
                    операции, быстрое восстановление после нее.
                </p>
                <ContactButtonSecond />
            </>
        ),
    },
];
