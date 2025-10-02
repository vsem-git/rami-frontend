import { usePopup } from '../../components/PopupContext'

const ContactButton = () => {
	const { openPopup } = usePopup()

	return (
		<button
			className='w-full sm:w-[211px] md:w-[289px] h-[56px] md:h-[64px] flex items-center justify-center px-8 py-6 bg-white border border-transparent text-[#691C32] text-xs md:text-base font-semibold uppercase cursor-pointer hover:bg-transparent hover:border-white hover:text-white transition-colors duration-300 whitespace-nowrap mt-8'
			onClick={() => openPopup('contact')}
		>
			Запланировать визит
		</button>
	)
}

const ContactButtonSecond = () => {
	const { openPopup } = usePopup()

	return (
		<button
			className='w-[211px] md:w-[289px] h-[56px] md:h-[64px] flex items-center justify-center px-8 py-6 bg-white border border-transparent text-[#691C32] text-xs md:text-base font-semibold uppercase cursor-pointer hover:bg-transparent hover:border-white hover:text-white transition-colors duration-300 whitespace-nowrapp relative z-20'
			onClick={() => openPopup('contact')}
		>
			Запланировать визит
		</button>
	)
}

export const COSMETOLOGY = [
	{
		id: 1,
		content: (
			<>
				<p className='text-[10px]/[155%] md:text-xs/[155%] xl:text-base/[155%] text-white uppercase font-normal max-w-full sm:max-w-[356px] md:max-w-[400px] xl:max-w-[580px]'>
					Интеллектуальная косметология – это глубинный междисциплинарный
					подход, который кардинально отличает принципы работы отделения
					косметологии RAMICLINIC RESIDENCE от обычной клиники эстетической
					медицины.
				</p>
				<ContactButton />
			</>
		),
	},
	{
		id: 2,
		content: (
			<>
				<h3 className='text-base xl:text-2xl text-white uppercase font-normal max-w-[400px] xl:max-w-[580px]'>
					Современные возможности интеллектуальной косметологии:
				</h3>
				<p className='text-[11px] sm:text-xs xl:text-base/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[580px]'>
					Специалисты RAMICLINIC RESIDENCE назначают процедуры на основе данных
					генетического паспорта, лабораторных и инструментальных исследований с
					единственной целью – достижение максимально яркого и стойкого
					результата для каждого отдельного человека, обладающего уникальным
					набором генетических и физических характеристик, определенным
					гормональным статусом.
				</p>
			</>
		),
	},
	{
		id: 3,
		content: (
			<p className='text-sm xl:text-[21px]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[580px]'>
				Только такой глубинный подход позволяет избежать назначения ненужных
				процедур и составить наиболее точную программу омоложения, подготовки к
				пластической операции и реабилитации после нее.
			</p>
		),
	},
	{
		id: 4,
		content: (
			<p className='text-sm xl:text-[21px]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[580px]'>
				Устранение дефицитов в организме и гормональных нарушений – важные
				составляющие преображения, которые решают те же вопросы красоты и
				молодости, но изнутри. Таким глубоким пониманием связи внутренних
				процессов и внешних изменений обладает редкий на сегодняшний день в
				России антиэйдж-специалист.
			</p>
		),
	},
	{
		id: 5,
		content: (
			<p className='text-sm xl:text-[21px]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[580px]'>
				Наши гости отмечают, что вопросы их красоты и молодости еще нигде так
				пристально и всесторонне не рассматривались, как в Клинике-резиденции
				<strong className='ml-1'>RAMICLINIC RESIDENCE</strong>.
			</p>
		),
	},
	{
		id: 6,
		content: (
			<>
				<p className='text-sm xl:text-[21px]/[155%] text-white uppercase font-normal max-w-[400px] xl:max-w-[580px]'>
					Устранение дефицитов в организме и гормональных нарушений – важные
					составляющие преображения, которые решают те же вопросы красоты и
					молодости, но изнутри. Таким глубоким пониманием связи внутренних
					процессов и внешних изменений обладает редкий на сегодняшний день в
					России антиэйдж-специалист.
				</p>
				<ContactButtonSecond />
			</>
		),
	},
]
