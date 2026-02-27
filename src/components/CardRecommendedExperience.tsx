export const CardRecommendedExperience = () => {
    return (
        <div className="w-full max-w-[1034px] flex items-center gap-[50px]">
            <div className="">
                <div className="flex items-start gap-4">
                    <img
                        src="tourism/Quote icon.svg"
                        alt=""
                        className="w-16 h-16 -mt-3"
                    />
                    <p className="text-lg text-[#1D1D1D] uppercase leading-[155%] max-w-[604px]">
                        желаю Медицинскому центру «РАМИ» дальнейших успехов в
                        Вашей очень важной и нужной для людей работе. В Вашей
                        клинике замечательный персонал, профессиональные
                        специалисты, очень внимательное и заботливое отношение
                        к пациентам. Благополучия Вам и процветания!
                    </p>
                </div>

                <button className="flex items-center gap-4 text-base text-[#1D1D1D] font-semibold uppercase mt-2.5 ml-20 cursor-pointer group">
                    <span className="relative overflow-hidden">
                        <span>подробнее</span>
                        <span className="absolute left-0 bottom-0 w-full h-px bg-[#1D1D1D] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                    </span>
                    <img
                        src="/plus-s.svg"
                        alt=""
                        style={{
                            filter: "brightness(0)",
                        }}
                    />
                </button>

                <div className="flex flex-col mt-10 ml-20">
                    <span className="text-lg font-bold text-[#1D1D1D] uppercase leading-[155%]">
                        екатерина петрова
                    </span>
                    <span className="text-lg font-normal text-[#1D1D1D] uppercase leading-[155%]">
                        Россия{" "}
                    </span>
                </div>
            </div>

            <img
                src="tourism/9.webp"
                alt=""
                className="w-[300px] h-[400px] rounded-full object-cover"
            />
        </div>
    );
};
