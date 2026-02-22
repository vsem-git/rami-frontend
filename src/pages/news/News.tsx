import { CardNews } from "../../components/CardNews";
import { usePopup } from "../../components/PopupContext";
import { Button } from "../../components/ui/Button";
import { newsData } from "../../shared/data/news";

export const News = () => {
    const { openPopup } = usePopup();

    const handleCardClick = (news: (typeof newsData)[0]) => {
        openPopup("newsCardInfo", { news });
    };

    return (
        <div className="relative w-full flex flex-col px-12 pt-[13rem] gap-6">
            <h1 className="relative z-10 text-[110px] font-normal uppercase text-[#1D1D1D]">
                Новости
            </h1>

            <div className="relative z-10 w-full flex justify-end mt-[110px]">
                <div className="w-full max-w-[1200px] flex items-center flex-col gap-y-20">
                    <div className="grid grid-cols-2 gap-5">
                        {newsData.map((news) => (
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

                    <Button className="w-[205px] h-16">пОКАЗАТЬ ЕЩЕ</Button>
                </div>
            </div>

            <img
                src="/Vector (2).png"
                alt=""
                className="absolute top-0 left-0 z-0"
            />
        </div>
    );
};
