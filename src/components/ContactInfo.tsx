import { PhoneList } from './PhoneList'

export const ContactInfo = () => {
	return (
		<>
			<h2 className='text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase'>
				КОНТАКТЫ
			</h2>

			<div className='flex flex-wrap gap-8 sm:gap-10 md:block mt-6 md:mt-0'>
				<div className='mt-0 md:mt-14'>
					<p className='text-[11px] md:text-sm xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase max-w-[280px] xl:max-w-[420px] font-semibold'>
						РОССИЙСКАЯ ФЕДЕРАЦИЯ, САНКТ-ПЕТЕРБУРГ, КРЕСТОВСКИЙ ОСТРОВ, КРЕСТОВСКИЙ ПР., 4 Б
					</p>
				</div>

				<div className='mt-4 md:mt-6'>
					<p className='text-[11px] md:text-sm xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase font-semibold'>
						ВИЗИТ – ПО ПРЕДВАРИТЕЛЬНОЙ ЗАПИСИ
					</p>
				</div>

				<div className='mt-4 md:mt-6 mb-0 md:mb-14'>
					<button className='h-[48px] md:h-[56px] flex items-center gap-4 text-[11px] md:text-xs xl:text-lg leading-[155%] text-[#1D1D1D] uppercase bg-transparent border-none cursor-pointer font-semibold'>
						<span className='w-full border-b border-[#1D1D1D26]'>
							ОТКРЫТЬ В КАРТАХ
						</span>
						<img
							src='/icon-r.svg'
							alt='icon'
							className='min-w-6 xl:min-w-8 min-h-6 xl:min-h-8'
							style={{
								filter:
									'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)',
							}}
						/>
					</button>
				</div>

				<PhoneList />
			</div>
		</>
	)
}