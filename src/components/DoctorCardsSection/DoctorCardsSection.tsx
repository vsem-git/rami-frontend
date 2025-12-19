import { useRef, type MouseEvent } from 'react'
import { POPUP_NAMES } from '../../constants/popupNames'
import type { Doctor } from '../../shared/types/doctor'
import { DoctorCard } from '../DoctorCard'
import { usePopup } from '../PopupContext'
import { useCardsAnimation } from './animation/useCardsAnimation'

export const DoctorCardsSection = ({ doctor }: { doctor: Doctor }) => {
	const cardsSectionRef = useRef<HTMLElement | null>(null)
	const card1Ref = useRef<HTMLDivElement | null>(null)
	const card2Ref = useRef<HTMLDivElement | null>(null)
	const card3Ref = useRef<HTMLDivElement | null>(null)
	const { openPopup } = usePopup()

	const cardsRefs = [card1Ref, card2Ref, card3Ref]

	useCardsAnimation(cardsSectionRef, cardsRefs)

	const handleOpenResults = (
		e?: MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		e?.preventDefault()
		openPopup(POPUP_NAMES.UNIVERSAL_MODAL, {
			type: 'results',
			title: 'Результаты',
			items: doctor.modal_result || [],
		})
	}

	const handleOpenEducation = (
		e?: MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		e?.preventDefault()
		openPopup(POPUP_NAMES.UNIVERSAL_MODAL, {
			type: 'education',
			title: 'Обучение у Брайана Мендельсона',
			items: doctor.modalCardEducation || [],
		})
	}

	const handleOpenSurgeryPath = (
		e?: MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		e?.preventDefault()
		openPopup(POPUP_NAMES.UNIVERSAL_MODAL, {
			type: 'surgeryPath',
			title: 'Путь в хирургии',
			items: doctor.modalCardPath || [],
		})
	}

	if (!doctor.cards || doctor.cards.length < 3) {
		return null
	}

	return (
		<section
			ref={cardsSectionRef}
			className='w-full h-auto min-h-[400px] lg:min-h-screen flex justify-center items-center px-4 md:px-10'
			aria-label='Раздел карточек доктора'
		>
			<div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-2'>
				<DoctorCard
					ref={card1Ref}
					imageUrl={doctor.cards[0]}
					className='bg-[70%_0rem] md:bg-[70%_2rem]'
					buttonText='Результаты'
					onClick={handleOpenResults}
				/>
				<DoctorCard
					ref={card2Ref}
					imageUrl={doctor.cards[1]}
					buttonText='Обучение у Брайана Мендельсона и любимая'
					onClick={handleOpenEducation}
				/>
				<DoctorCard
					ref={card3Ref}
					imageUrl={doctor.cards[2]}
					buttonText='Путь в хирургии'
					onClick={handleOpenSurgeryPath}
				/>
			</div>
		</section>
	)
}
