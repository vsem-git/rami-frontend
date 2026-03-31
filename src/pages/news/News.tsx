import { useEffect, useMemo, useState } from "react";
import { CardNews } from "./components/CardNews";
import { usePopup } from "../../components/PopupContext";
import { Button } from "../../components/ui/Button";
import { Dropdown } from "../../components/ui/Dropdown";
import { fetchAllNews, type NewsItem } from "../../services/news";

const DIRECTIONS = ["все", "мероприятие", "услуга", "врач"];
const MONTHS_ORDER = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
];

export const News = () => {
    const { openPopup } = usePopup();

    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [filterDate, setFilterDate] = useState("все");
    const [filterAuthor, setFilterAuthor] = useState("все");
    const [filterDirection, setFilterDirection] = useState("все");
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        fetchAllNews().then(setNewsItems);
    }, []);

    const authors = useMemo(() => {
        const unique = [
            ...new Set(newsItems.map((n) => n.author).filter(Boolean)),
        ];
        return ["все", ...unique];
    }, [newsItems]);

    const months = useMemo(() => {
        const unique = [...new Set(newsItems.map((n) => n.month.toLowerCase()))];
        return [
            "все",
            ...unique.sort(
                (a, b) => MONTHS_ORDER.indexOf(b) - MONTHS_ORDER.indexOf(a),
            ),
        ];
    }, [newsItems]);

    const filtered = useMemo(() => {
        return newsItems.filter((n) => {
            const matchDate =
                filterDate === "все" || n.month.toLowerCase() === filterDate;
            const matchAuthor =
                filterAuthor === "все" || n.author === filterAuthor;
            const matchDir =
                filterDirection === "все" || n.direction === filterDirection;
            return matchDate && matchAuthor && matchDir;
        });
    }, [filterDate, filterAuthor, filterDirection, newsItems]);

    const handleCardClick = (news: NewsItem) => {
        openPopup("newsCardInfo", { news });
    };

    const hasFilters =
        filterDate !== "все" ||
        filterAuthor !== "все" ||
        filterDirection !== "все";
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="relative w-full flex flex-col px-4 md:px-6 xl:px-12 pt-[7rem] md:pt-[9rem] 2xl:pt-[13rem] gap-4 sm:gap-6">
            <h1 className="relative z-10 text-[32px] sm:text-[44px] md:text-[64px] xl:text-[88px] 2xl:text-[110px] font-normal uppercase text-[#1D1D1D]">
                Новости
            </h1>

            <div className="relative z-10 w-full flex justify-end 2xl:mt-[56px]">
                <div className="w-full max-w-[1200px] flex items-center flex-col gap-y-6 md:gap-y-8">
                    <div className="w-full flex flex-wrap gap-3 items-center">
                        <Dropdown
                            value={filterDate}
                            options={months}
                            placeholder="Дата"
                            onChange={(v) => {
                                setFilterDate(v);
                                setVisibleCount(6);
                            }}
                            formatLabel={capitalize}
                        />
                        <Dropdown
                            value={filterAuthor}
                            options={authors as string[]}
                            placeholder="Автор"
                            onChange={(v) => {
                                setFilterAuthor(v);
                                setVisibleCount(6);
                            }}
                        />
                        <Dropdown
                            value={filterDirection}
                            options={DIRECTIONS}
                            placeholder="Направление"
                            onChange={(v) => {
                                setFilterDirection(v);
                                setVisibleCount(6);
                            }}
                            formatLabel={capitalize}
                        />

                        <button
                            onClick={() => {
                                setFilterDate("все");
                                setFilterAuthor("все");
                                setFilterDirection("все");
                                setVisibleCount(6);
                            }}
                            className={`text-xs font-semibold uppercase text-[#691C32] underline underline-offset-2
                                hover:opacity-70 transition-all duration-300
                                ${hasFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                        >
                            Сбросить
                        </button>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="w-full py-20 text-center text-[#1D1D1D]/40 text-sm uppercase font-semibold">
                            Ничего не найдено
                        </div>
                    ) : (
                        <div className="grid max-[680px]:grid-cols-1 grid-cols-2 gap-2 xl:gap-5 w-full">
                            {filtered.slice(0, visibleCount).map((news) => (
                                <CardNews
                                    key={news.id}
                                    title={news.title}
                                    day={news.day}
                                    month={news.month}
                                    image={news.image}
                                    positionImage={news.positionImage}
                                    positionDay={news.positionDay}
                                    onClick={() => handleCardClick(news)}
                                />
                            ))}
                        </div>
                    )}

                    {visibleCount < filtered.length && (
                        <Button
                            className="max-[680px]:w-[170px] w-[205px] max-[560px]:h-14 h-16 max-[680px]:text-xs"
                            onClick={() => setVisibleCount((v) => v + 6)}
                        >
                            ПОКАЗАТЬ ЕЩЕ
                        </Button>
                    )}
                </div>
            </div>

            <img
                src="/Vector (2).png"
                alt=""
                className="absolute top-0 left-0 z-0 hidden 2xl:block"
            />
            <img
                src="news/Vector (15).png"
                alt=""
                className="absolute top-0 right-0 block 2xl:hidden w-[182px] sm:w-[298px] md:w-[479px] xl:w-auto"
            />
        </div>
    );
};
