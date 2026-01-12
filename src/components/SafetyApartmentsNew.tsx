export const SafetyApartmentsNew = () => {
	return (
		<div
			id='safety-apartments-new'
			className='relative w-full min-h-[1400px] bg-white pt-[160px] pl-10 overflow-hidden'
		>
			<h1 className='relative z-10 text-[110px] font-normal text-[#691c32] uppercase leading-none'>
				безопасность <br />
				пребывания
			</h1>

			<p className='relative z-10 text-[13px] font-medium text-[#1D1D1D] uppercase leading-[140%] max-w-[300px] ml-60 mt-[300px]'>
				Палата оснащена для проведения интенсивной терапии с круглосуточным
				мониторингом состояния пациента. Встроенная медицинская консоль
				обеспечивает жизнеобеспечение подачей кислорода и вакуума, а для
				оперативной связи используется система палатной сигнализации
			</p>

			<img
				src='/apartmentsnew-screen/bg5.jpg'
				alt=''
				className='absolute right-0 bottom-0'
			/>
			{/* <img
				src='/apartmentsnew-screen/bg9.png'
				alt=''
				className='absolute left-0 bottom-[-52rem]'
			/> */}
		</div>
	)
}
