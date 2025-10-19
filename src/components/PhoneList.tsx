export const PhoneList = () => {
	return (
		<div>
			<div className='flex items-center gap-6 md:gap-10 text-[11px] md:text-xs xl:text-base font-semibold leading-[155%] text-[#1D1D1D] uppercase whitespace-nowrap'>
				<a href='tel:+79214470031' className='border-b border-[#1D1D1D26]'>
					+7 (921) 447-00-31
				</a>
				<a href='tel:+78126271313' className='border-b border-[#1D1D1D26]'>
					+7 (812) 627-13-13
				</a>
			</div>
			<div className='flex items-center gap-1 mt-3 md:mt-6'>
				<a
					href='#'
					className='w-12 h-12 flex items-center justify-center cursor-pointer'
				>
					<img src='/social/tg.svg' alt='tg' className='w-5 h-5' />
				</a>
				<a
					href='#'
					className='w-12 h-12 flex items-center justify-center cursor-pointer'
				>
					<img src='/social/wt.svg' alt='wt' className='w-5 h-5' />
				</a>
			</div>
		</div>
	)
}
