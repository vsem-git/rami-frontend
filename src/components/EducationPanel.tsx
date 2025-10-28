import { POPUP_NAMES } from '../constants/popupNames'
import ModalPanel from './ModalPanel'

const EducationPanel = () => {
	const content = (
		<>
			<div className='flex flex-col border-t border-[#FFFFFF80] pt-6 md:pt-10 xl:pt-16'>
				<div className='flex flex-col gap-2 xl:gap-3'>
					<h4 className='text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase'>
						1998
					</h4>
					<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[640px]'>
						выпускница медицинского факультета Петрозаводского государственного
						университета им. Куусинена
					</p>
				</div>

				<h4 className='text-[18px] text-[#FFFFFF80] leading-[130%] uppercase mt-8 md:mt-10 xl:mt-14 mb-6'>
					Специализация:
				</h4>
				<ul className='space-y-1 md:space-y-2 mb-10 xl:mb-16'>
					{[
						'общая хирургия',
						'челюстно-лицевая хирургия',
						'травматология и ортопедия',
						'сосудистая и микроссудистая хирургия',
						'хирургия кисти и стопы',
					].map((specialization, index) => (
						<li
							key={index}
							className='flex items-center gap-0 xl:gap-6 text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase'
						>
							<span className='text-[#FFFFFF80] min-w-[40px]'>
								{(index + 1).toString().padStart(2, '0')}
							</span>
							{specialization}
						</li>
					))}
				</ul>
			</div>

			<div className='flex flex-col border-t border-[#FFFFFF80] py-6 md:py-10 xl:py-16'>
				<div className='flex flex-col gap-3'>
					<h4 className='text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase'>
						2000
					</h4>
					<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[640px]'>
						прошла специализацию по пластической, реконструктивной и
						эстетической хирургии на базе СПб МАПО и по настоящее время является
						практикующим пластическим хирургом
					</p>
				</div>
			</div>

			<div className='flex flex-col border-t border-[#FFFFFF80] pt-6 md:pt-10 xl:pt-16 pb-20'>
				{[
					'Более 10 лет практики в ургентной и плановой микрохирургии и травматологии.',
					'Каждые 5 лет проходит Курсы повышения квалификации по специальности «Пластическая, реконструктивная и эстетическая хирургия».',
					'Ежегодно посещает самые продвинутые курсы по эстетической коррекции лица и тела, а также проходит обучение в рамках курса всемирно известного американского пластического хирурга, основоположника методики глубокого SMAS – лифтинга, профессора Сэма Хамра. Стажировки в ведущих клиниках США, Испании, Германии.',
				].map((paragraph, index) => (
					<p
						key={index}
						className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase mb-6 last:mb-0'
					>
						{paragraph}
					</p>
				))}
			</div>
		</>
	)

	return (
		<ModalPanel
			popupName={POPUP_NAMES.DOCTORS_EDUCATION}
			title='Образование'
			content={content}
		/>
	)
}

export default EducationPanel
