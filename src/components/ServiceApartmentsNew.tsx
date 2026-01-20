export const ServiceApartmentsNew = () => {
	return (
		<div
			id='service-apartments-new'
			className='relative w-full max-[500px]:min-h-[75vh] min-h-[90vh] md:min-h-screen 2xl:min-h-[1400px] bg-white max-[650px]:pt-16 pt-[112px] md:pt-[140px] lg:pt-[160px] 
			max-[650px]:px-4 max-[1070px]:px-6 px-15 overflow-hidden'
		>
			<h1 className='relative z-10 max-[500px]:text-2xl max-[650px]:text-[32px] text-[38px] md:text-[44px] lg:text-[64px] 2xl:text-[88px] font-normal text-[#691c32] uppercase leading-[110%]'>
				Персонализированный <br />
				сервис 24/7
			</h1>

			<div className='relative z-10 w-full flex items-start max-[650px]:gap-2.5 gap-2 lg:gap-5 justify-end max-[650px]:mt-8 mt-11 md:mt-20 lg:mt-[140px] 2xl:mt-[154px] max-[650px]:flex-row-reverse '>
				<div className='max-[500px]:w-[102px] max-[650px]:w-[170px] w-[240px] md:w-[349px] lg:w-[324px] 2xl:w-[359px] max-[685px]:mt-[5.5rem] max-[941px]:mt-[4.5rem] mt-[57px] 2xl:mt-[78px] space-y-6 2xl:space-y-[28px] max-[650px]:mt-0'>
					<div
						className='w-full max-[500px]:h-[120px] max-[650px]:h-[200px] h-[279px] md:h-[406px] 2xl:h-[450px] overflow-hidden'
						style={{
							transform: 'scaleX(-1)',
						}}
					>
						<img
							src='/apartmentsnew-screen/bg12.png'
							alt=''
							className='w-full h-full object-cover'
							style={{
								objectPosition: '43% 50%',
								transform: 'scale(1.4)',
							}}
						/>
					</div>
					<p className='text-xs 2xl:text-base font-medium text-[#1A1A1A] uppercase max-[650px]:hidden'>
						На всех этапах эстетического преображения вас сопровождает
						персональный менеджер, а консьерж-сервис решает все организационные
						вопросы
					</p>
				</div>

				<div className='max-[500px]:w-[270px] max-[650px]:w-[350px] w-[488px] md:w-[587px] lg:w-[570px] 2xl:w-[966px] space-y-6 2xl:space-y-[30px]'>
					<p className='text-xs 2xl:text-base font-medium text-[#1A1A1A] uppercase max-w-[700px] 2xl:max-w-[891px] max-[650px]:hidden'>
						Мы обеспечиваем медицинское персонализированное сопровождение и
						создаем атмосферу доверия для вашего психологического комфорта
					</p>

					<img
						src='/apartmentsnew-screen/bg13.jpg'
						alt=''
						className='w-full max-[500px]:h-[300px] max-[650px]:h-[430px] h-[495px] md:h-[578px] 2xl:h-[980px] object-cover'
					/>
				</div>
			</div>
			<div className='mt-6 space-y-4 max-[650px]:block hidden mb-16'>
				<p className='text-xs 2xl:text-base font-medium text-[#1A1A1A] uppercase max-w-[500px]'>
					Мы обеспечиваем медицинское персонализированное сопровождение и
					создаем атмосферу доверия для вашего психологического комфорта
				</p>
				<p className='text-xs 2xl:text-base font-medium text-[#1A1A1A] uppercase max-w-[500px]'>
					На всех этапах эстетического преображения вас сопровождает
					персональный менеджер, а консьерж-сервис решает все организационные
					вопросы
				</p>
			</div>

			{/* <img
				src='/apartmentsnew-screen/bg9.png'
				alt=''
				className='absolute left-0 bottom-[-26rem]'
			/>
			<img
				src='/apartmentsnew-screen/bg14.png'
				alt=''
				className='absolute right-0 top-[-28rem]'
			/> */}
		</div>
	)
}
