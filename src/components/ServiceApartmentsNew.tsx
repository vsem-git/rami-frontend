export const ServiceApartmentsNew = () => {
	return (
		<div
			id='service-apartments-new'
			className='relative w-full min-h-[1400px] bg-white pt-[160px] pl-[54px] overflow-hidden'
		>
			<h1 className='relative z-10 text-[80px] font-normal text-[#1D1D1D] uppercase leading-[110%]'>
				Персонализированный <br />
				сервис 24/7
			</h1>

			<div className='relative z-10 w-full flex items-start gap-5 justify-end mt-[154px]'>
				<div className='w-[359px] mt-[78px] space-y-[28px]'>
					<div
						className='w-full h-[450px] overflow-hidden'
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
					<p className='text-base font-medium text-[#1A1A1A] uppercase '>
						На всех этапах эстетического преображения вас сопровождает
						персональный менеджер, а консьерж-сервис решает все организационные
						вопросы
					</p>
				</div>

				<div className='space-y-[30px]'>
					<p className='text-base font-medium text-[#1A1A1A] uppercase max-w-[891px]'>
						Мы обеспечиваем медицинское персонализированное сопровождение и
						создаем атмосферу доверия для вашего психологического комфорта
					</p>

					<img
						src='/apartmentsnew-screen/bg13.jpg'
						alt=''
						className='w-[966px] h-[980px] object-cover'
					/>
				</div>
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
