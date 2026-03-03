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
        <div className="relative w-full flex flex-col px-4 md:px-6 xl:px-12 pt-[7rem] md:pt-[9rem] 2xl:pt-[13rem] gap-4 sm:gap-6">
            <h1 className="relative z-10 text-[32px] sm:text-[44px] md:text-[64px] xl:text-[88px] 2xl:text-[110px] font-normal uppercase text-[#1D1D1D]">
                Новости
            </h1>

            <div className="relative z-10 w-full flex justify-end 2xl:mt-[56px]">
                <div className="w-full max-w-[1200px] flex items-center flex-col gap-y-6 md:gap-y-8">
                    <div className="grid max-[680px]:grid-cols-1 grid-cols-2 gap-2 xl:gap-5">
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

                    <Button className="max-[680px]:w-[170px] w-[205px] max-[560px]:h-14 h-16 max-[680px]:text-xs">пОКАЗАТЬ ЕЩЕ</Button>
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
