import { POPUP_NAMES } from '../constants/popupNames'
import ModalPanel from './ModalPanel'

const ExperiencePanel = () => {
	const content = (
		<>
			<div className='flex flex-col border-t border-[#FFFFFF80] pt-6 md:pt-8 xl:pt-16'>
				<div className='flex flex-col gap-2 xl:gap-3 mb-8 xl:mb-16'>
					<h4 className='text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase'>
						1988 — 2008
					</h4>
					<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[470px] xl:max-w-[640px]'>
						ОПЫТ РАБОТЫ В УРГЕНТНОЙ И ПЛАНОВОЙ МИКРОХИРУРГИИ ПОСЛУЖИЛ ТОЙ
						ОСНОВОЙ ДЛЯ РАЗВИТИЯ МАНУАЛЬНЫХ НАВЫКОВ И КОНЦЕПТУАЛЬНОЙ ФИЛОСОФИИ,
						КОТОРЫЕ ПОЗВОЛИЛИ В ДАЛЬНЕЙШЕМ БЫТЬ ВСЕГДА НА ШАГ ВПЕРЕДИ В
						ЭСТЕТИЧЕСКОЙ ХИРУРГИИ
					</p>
				</div>

				<div className='flex flex-col gap-2 xl:gap-3 border-t border-[#FFFFFF80] py-8 xl:py-16 '>
					<h4 className='text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase'>
						С 2007
					</h4>
					<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[342px] md:max-w-[640px]'>
						РАБОТА В ВЕДУЩИХ ЧАСТНЫХ КЛИНИКАХ САНКТ-ПЕТЕРБУРГА
					</p>
				</div>

				<div className='flex flex-col gap-2 xl:gap-3 border-t border-[#FFFFFF80] py-8 xl:py-16'>
					<h4 className='text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase'>
						С 2016
					</h4>
					<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[640px]'>
						РАБОТА В КЛИНИКЕ РАМИ
					</p>
				</div>
			</div>

			<div className='flex flex-col border-t border-[#FFFFFF80] py-6 md:py-8 xl:py-16 '>
				<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase mb-6 max-w-full sm:max-w-[342px] md:max-w-full'>
					В СВОЕЙ ПРАКТИКЕ ИСПОЛЬЗУЕТ ИСКЛЮЧИТЕЛЬНО САМЫЕ СОВРЕМЕННЫЕ ТЕХНОЛОГИИ
					ПРОВЕДЕНИЯ ОПЕРАЦИЙ, ЭФФЕКТИВНОСТЬ КОТОРЫХ ПРОВЕРЕНА ВРЕМЕНЕМ И
					ОПЫТОМ, А ТАКЖЕ В ХОДЕ МНОГОЧИСЛЕННЫХ СТАЖИРОВОК В РАЗЛИЧНЫХ КЛИНИКАХ
					МИРА.
				</p>

				<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase mb-6 max-w-full sm:max-w-[342px] md:max-w-full'>
					ВЫСОКАЯ КВАЛИФИКАЦИЯ ХИРУРГА И ЧУТКОЕ ПОНИМАНИЕ ЭСТЕТИКИ ЛИЦА
					ПОЗВОЛЯЮТ ОБЕСПЕЧИТЬ ПАЦИЕНТУ БЕЗОПАСНОЙ, МАКСИМАЛЬНО ЕСТЕСТВЕННЫЙ И
					ГАРМОНИЧНЫЙ РЕЗУЛЬТАТ.
				</p>

				<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-full sm:max-w-[342px] md:max-w-full'>
					ЧУТКОЕ И БЕРЕЖНОЕ СОПРОВОЖДЕНИЕ ПАЦИЕНТА НА ВСЕХ ЭТАПАХ ЛЕЧЕНИЯ И
					ДЛИТЕЛЬНОЕ ВРЕМЯ ПОСЛЕ ОПЕРАЦИИ ГАРАНТИРУЮТ ТОТ БЕСПРЕЦЕДЕНТНЫЙ
					УРОВЕНЬ ДОВЕРИЯ МЕЖДУ ПАЦИЕНТОМ И ВРАЧОМ, КОТОРЫЙ ПОМОГАЕТ БЕЗ СТРАХА
					И СОМНЕНИЯ ИДТИ НА ОПЕРАЦИЮ, А ПОТОМ БЫСТРО И С МАКСИМАЛЬНЫМ КОМФОРТОМ
					ВОССТАНАВЛИВАТЬСЯ ПОСЛЕ НЕЕ.
				</p>
			</div>
		</>
	)

	return (
		<ModalPanel
			popupName={POPUP_NAMES.DOCTORS_EXPERIENCE}
			title='Опыт работы'
			content={content}
		/>
	)
}

export default ExperiencePanel
