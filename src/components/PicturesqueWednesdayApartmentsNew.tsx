export const PicturesqueWednesdayApartmentsNew = () => {
    return (
        <div
            id="picturesque-wednesday-apartments-new"
            className="relative w-full max-[500px]:h-[500px] max-[650px]:h-[600px] max-[764px]:h-[700px] max-[800px]:h-[800px] max-[1100px]:h-[900px]  h-[1050px] 2xl:h-[1250px] overflow-hidden bg-cover bg-center bg-no-repeat max-[650px]:py-8 py-16 md:py-[96px] lg:py-[100px]"
            style={{
                backgroundImage: `
      linear-gradient(230.27deg, rgba(0, 0, 0, 0) 13.2%, rgba(0, 0, 0, 0.4) 82.61%, rgba(0, 0, 0, 0.4) 99.66%),
      url('/apartmentsnew-screen/bg-s.webp')
    `,
                transform: "scaleX(-1)",
            }}
        >
            <div
                className="relative h-full z-10 flex flex-col px-4 md:px-6 lg:px-16 max-[650px]:justify-between"
                style={{
                    transform: "scaleX(-1)",
                }}
            >
                <h2 className="relative z-10 max-[450px]:text-2xl max-[650px]:text-[32px] max-[800px]:text-[44px] max-[1100px]:text-[64px] text-[88px] 2xl:text-[110px] font-normal text-[#EAE6E0] uppercase leading-[120%]">
                    Живописная
                    <br />
                    пространственная
                    <br />
                    среда
                </h2>
                <div className="w-full flex items-center flex-col mt-20 md:mt-[124px] lg:mt-[140px] max-[650px]:hidden">
                    <h4 className="text-xs xl:text-base font-medium text-white uppercase mb-10 max-w-[550px]  xl:max-w-[738px] text-center">
                        Из окон открываются прекрасные виды на старинный парк,
                        способствующие релаксации
                    </h4>

                    <p className="relative z-10 text-xs xl:text-base font-normal text-white uppercase leading-[140%] max-w-[350px] xl:max-w-[425px] mt-32 xl:mt-[154px] mr-[20rem] xl:mr-[32rem] lg:block hidden">
                        Для отдыха на свежем воздухе после согласования с врачом
                        доступны террасы «Летний сад» и «Sky Bar» на крыше, а
                        также уединенная чайная беседка
                    </p>
                </div>

                <div className="mt-32 md:mt-[124px] lg:mt-[154px]  space-y-4">
                    <h4 className="text-xs xl:text-base font-medium text-white uppercase max-w-[350px]  hidden max-[650px]:block">
                        Из окон открываются прекрасные виды на старинный парк,
                        способствующие релаксации
                    </h4>
                    <p className="relative z-10 text-xs xl:text-base font-normal text-white uppercase leading-[140%] max-w-[350px] xl:max-w-[425px] lg:hidden block">
                        Для отдыха на свежем воздухе после согласования с врачом
                        доступны террасы «Летний сад» и «Sky Bar» на крыше, а
                        также уединенная чайная беседка
                    </p>
                </div>
            </div>
        </div>
    );
};
