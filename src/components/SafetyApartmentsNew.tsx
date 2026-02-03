export const SafetyApartmentsNew = () => {
    return (
        <div
            id="safety-apartments-new"
            className="relative w-full max-[650px]:min-h-[780px] min-h-[800px] md:min-h-[900px] lg:min-h-[1300px] xl:min-h-[1400px] bg-white max-[650px]:pt-[96px] pt-[112px] md:pt-[140px] lg:pt-[160px] pl-4 md:pl-6 lg:pl-10 overflow-hidden"
        >
            <h1 className="relative z-10 max-[650px]:text-[32px] text-[44px] md:text-[55px] lg:text-[88px] 2xl:text-[110px] font-normal text-[#691c32] uppercase leading-none">
                безопасность <br />
                пребывания
            </h1>

            <p className="relative z-10 text-xs xl:text-base font-medium text-[#1D1D1D] uppercase leading-[140%] max-w-[350px] xl:max-w-[450px] ml-0 xl:ml-60 max-[650px]:mt-11 mt-[96px] lg:mt-[300px]">
                Палата оснащена для проведения интенсивной терапии с
                круглосуточным мониторингом состояния пациента. Встроенная
                медицинская консоль обеспечивает жизнеобеспечение подачей
                кислорода и вакуума, а для оперативной связи используется
                система палатной сигнализации
            </p>

            <img
                src="/apartmentsnew-screen/bg5.webp"
                alt=""
                className="absolute right-0 bottom-0 max-[650px]:w-[386px]  max-[700px]:w-[450px] w-[530px] lg:w-[558px] lg:w-[800px] xl:w-[900px] 2xl:w-auto "
            />
            {/* <img
				src='/apartmentsnew-screen/bg9.webp'
				alt=''
				className='absolute left-0 bottom-[-52rem]'
			/> */}
        </div>
    );
};
