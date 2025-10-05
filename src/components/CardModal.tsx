export const CardModal = () => {
	return (
		<div className='relative w-full flex items-end'>
			<div className=' flex items-center'>
				<div className='relative'>
					<img src='./doctor-screen/image-1.1 1.jpg' alt='' />
					<span className='absolute left-6 top-6 text-base font-normal text-white uppercase'>
						до
					</span>
				</div>
				<div className='relative'>
					<img src='./doctor-screen/image-1.jpg' alt='' />
					<span className='absolute left-6 top-6 text-base font-normal text-white uppercase'>
						после
					</span>
				</div>
			</div>

			<button className='absolute left-6 bottom-4 flex items-center gap-3 text-base text-white font-semibold uppercase cursor-pointer bg-transparent border-none transform transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:scale-105 group-hover:gap-4'>
				Работа 1
				<img
					src='/icon-r.svg'
					alt=''
					className='transform transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:scale-110'
				/>
			</button>
		</div>
	)
}

