interface CardAboutHistoryProps {
    data: {
        year: string;
        image: string;
        description: string[];
    };
}

export const CardAboutHistory = ({ data }: CardAboutHistoryProps) => {
    return (
        <div className="w-[364px] lg:w-[375px] xl:w-[450px] 2xl:w-[540px] h-full min-h-[510px] 2xl:min-h-[670px] bg-white p-5">
            <img
                src={data.image}
                alt=""
                className="w-full h-[200px] xl:h-[280px] 2xl:h-[320px] object-cover"
                data-content-hint={`about.history.card.${data.year}.image`}
                data-content-hint-type="image"
            />
            <div className='h-[310px] flex flex-col justify-between'>
                <div className="flex justify-between mt-5 text-[#89685C]">
                    <h3 className="text-[40px] 2xl:text-[56px] uppercase leading-none"
                        data-content-hint={`about.history.card.${data.year}.year`}>
                        {data.year}
                    </h3>
                    <span className="text-xs uppercase leading-none pt-2 font-suisse"
                        data-content-hint="about.history.card.year.label">
                        год
                    </span>
                </div>

                <div className="w-full text-xs xl:text-[15px] text-[#1D1D1D] uppercase font-suisse font-semibold space-y-5">
                    {data.description.map((text, index) => (
                        <p
                            key={index}
                            className={
                                index === 0
                                    ? "max-w-[450px] leading-[22px]"
                                    : "leading-[22px]"
                            }
                            data-content-hint={`about.history.card.${data.year}.desc.${index}`}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
