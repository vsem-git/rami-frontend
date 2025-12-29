export const TechnologiesApartmentsNew = () => {
	return (
		<div className='relative w-full min-h-[1600px] bg-[#1D1D1D] pt-52 overflow-hidden'>
			<div className='relative z-10 flex flex-col items-center'>
				<h2 className='relative z-10 text-[110px] font-normal text-white uppercase leading-none text-center mb-20'>
					Hi-tech
					<br />
					технологии
				</h2>

				<div className='relative'>
					<div
						className='w-[738px] h-[863px] bg-cover bg-center'
						style={{
							backgroundImage: `
      linear-gradient(160.27deg, rgba(0, 0, 0, 0) 13.2%, rgba(0, 0, 0, 0.4) 82.61%, rgba(0, 0, 0, 0.4) 99.66%),
      url('/apartmentsnew-screen/bg3.png')
    `,
						}}
					/>

					<div className='w-[254px] h-[334px] rounded-full absolute top-1/2 left-[-10rem] -translate-y-1/2 overflow-hidden'>
						<img
							src='/apartmentsnew-screen/bg8.jpg'
							alt=''
							className='w-full h-full object-cover'
						/>

						<div className='absolute inset-0 bg-[#00000033]' />
					</div>
				</div>
				<p className='relative z-10 text-[13px] font-normal text-white uppercase leading-[140%] max-w-[300px] ml-[45%] -mt-32'>
					{' '}
					Здесь создана максимально комфортная среда: функциональная кровать,
					круглогодичный камин для релаксации и климат-контроль с теплыми
					полами, которыми можно управлять с планшета через систему «умный» дом.
					Организацию быта обеспечивает умный гардероб, а для досуга есть
					SMART-TV с персональным доступом
				</p>
			</div>
			{/* <img
				src='/apartmentsnew-screen/bg10.png'
				alt=''
				className='absolute left-0 top-0'
			/> */}
		</div>
	)
}
