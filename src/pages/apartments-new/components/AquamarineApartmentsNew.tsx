export const AquamarineApartmentsNew = () => {
    return (
        <div className="w-full h-[1194px] border-t border-[#EAE6E01F] overflow-hidden">
            <div className="flex flex-col items-center mt-[188px]">
                <h4 className="text-base font-normal text-white  uppercase mb-[30px] leading-none">
                    Апартаменты
                </h4>
                <h2 className="relative z-10 text-[110px] font-normal text-[#89685C] uppercase leading-none">
                    Аквамарин
                </h2>

                <div className="relative w-full flex justify-center mt-[140px]">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-[#EAE6E01F]" />
                    <div className="w-full max-w-[890px] relative ">
                        <img
                            src="/apartmentsnew-screen/bg7.webp"
                            alt=""
                            className="w-full h-[490px] object-cover rounded-full"
                        />
                        <button className="absolute w-10 h-10 rounded-full flex items-center justify-center bg-white top-1/2 left-1/2 -translate-1/2 cursor-pointer">
                            <img src="/plus-ap.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-start justify-between px-15 -mt-80">
                <div className="w-[435px] h-[435px] border border-[#EAE6E01F] flex items-center justify-center flex-col rounded-full mt-[17rem]">
                    <h2 className="text-[110px] font-normal text-[#89685C] uppercase leading-none -mt-34">
                        1
                    </h2>
                    <h4 className="text-base font-normal text-white  uppercase mt-2 leading-none">
                        Аквамарин
                    </h4>
                </div>
                <ul className="flex items-center gap-[45px] text-base font-normal text-white uppercase mt-[30rem] cursor-pointer">
                    <li>бриллиант</li>
                    <li>турмалин</li>
                    <li>Изумруд</li>
                    <li>Лазурит</li>
                    <li>жемчуг</li>
                    <li>Сапфир</li>
                    <li>рубин</li>
                </ul>
            </div>
        </div>
    );
};
