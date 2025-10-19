export const ConsentCheckbox = () => {
	return (
		<div className='flex items-center gap-3'>
			<label className='relative cursor-pointer w-[15px] h-[15px] border-[1.5px] border-white bg-white block'>
				<input
					type='checkbox'
					className='absolute inset-0 opacity-0 cursor-pointer'
				/>
			</label>
			<p className='text-[#FFFFFFBF] text-sm'>
				Принимаю{' '}
				<span className='text-white underline'>
					условия обработки персональных данных
				</span>
			</p>
		</div>
	)
}
