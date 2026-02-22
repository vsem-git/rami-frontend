interface CardAboutHistoryProps {
    data: {
        year: string;
        image: string;
        description: string[];
    };
}

export const CardAboutHistory = ({ data }: CardAboutHistoryProps) => {
    return (
        <div className="w-[540px] h-full min-h-[670px] bg-white p-5">
            <img
                src={data.image}
                alt=""
                className="w-full h-[320px] object-cover"
            />
            <div className='h-[310px] flex flex-col justify-between'>
                <div className="flex justify-between mt-5 text-[#89685C]">
                    <h3 className="text-[56px] uppercase leading-none">
                        {data.year}
                    </h3>
                    <span className="text-xs uppercase leading-none pt-2 font-suisse">
                        год
                    </span>
                </div>

                <div className="w-full text-[15px] text-[#1D1D1D] uppercase font-suisse font-semibold space-y-5">
                    {data.description.map((text, index) => (
                        <p
                            key={index}
                            className={
                                index === 0
                                    ? "max-w-[450px] leading-[22px]"
                                    : "leading-[22px]"
                            }
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
