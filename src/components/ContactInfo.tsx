import { PhoneList } from './PhoneList'

export const ContactInfo = () => {
	return (
		<>
			<h2 className='text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase'>
				Контакты
			</h2>

			<div className='flex flex-wrap gap-8 sm:gap-10 md:block mt-6 md:mt-0'>
				<div className='flex flex-col md:flex-row gap-3 md:gap-10 text-[11px] md:text-sm xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase mt-0 md:mt-14'>
					<p className='max-w-[248px] xl:max-w-[340px]'>
						Москва, Яузская улица, 5, офис 222
					</p>
					<p className='whitespace-nowrap'>
						Выходные: с 12 до 19 <br />
						Будни: с 12 до 21
					</p>
				</div>

				<div className='mt-0 sm:mt-4 md:mt-10 mb-0 md:mb-14'>
					<h3 className='text-[11px] md:text-sm xl:text-[21px] leading-[155%] text-[#1D1D1D99] uppercase max-w-[280px] xl:max-w-[420px]'>
						вход вверх по лестнице в Бизнес-центр «Яузская, 5».
					</h3>
					<button className='h-[48px] md:h-[56px] flex items-center gap-4 text-[11px] md:text-xs xl:text-lg leading-[155%] text-[#1D1D1D] uppercase bg-transparent border-none cursor-pointer mt-0 md:mt-2 font-semibold'>
						<span className='w-full border-b border-[#1D1D1D26]'>
							Открыть в картах
						</span>
						<img
							src='/icon-r.svg'
							alt='icon'
							className='min-w-6 xl:min-w-8 min-h-6 xl:min-h-8'
							style={{
								filter:
									'invert(100%) sepia(14%) saturate(0%) hue-rotate(4deg) brightness(106%) contrast(90%)',
							}}
						/>
					</button>
				</div>

				<PhoneList />
			</div>
		</>
	)
}
