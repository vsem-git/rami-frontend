import { useRef } from 'react'
import { POPUP_NAMES } from '../../constants/popupNames'
import { DoctorCard } from '../DoctorCard'
import { usePopup } from '../PopupContext'
import { useCardsAnimation } from './animation/useCardsAnimation'

export const DoctorCardsSection = () => {
	const cardsSectionRef = useRef<HTMLElement>(null)
	const card1Ref = useRef<HTMLDivElement>(null)
	const card2Ref = useRef<HTMLDivElement>(null)
	const card3Ref = useRef<HTMLDivElement>(null)
	const { openPopup } = usePopup()

	const cardsRefs = [card1Ref, card2Ref, card3Ref]

	useCardsAnimation(cardsSectionRef, cardsRefs)
	const handleOpenModal = (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault()
		}
		openPopup(POPUP_NAMES.DOCTOR_CARD)
	}

	return (
		<section
			ref={cardsSectionRef}
			className='w-full h-auto min-h-[400px] lg:min-h-screen flex justify-center items-center px-4 md:px-10'
		>
			<div className='w-full grid grid-cols-1 md:grid-cols-3 gap-2'>
				<DoctorCard
					ref={card1Ref}
					imageUrl='/doctor-screen/card1.jpg'
					className='bg-[70%_0%]'
					buttonText='Результаты'
					onClick={handleOpenModal}
				/>
				<DoctorCard
					ref={card2Ref}
					imageUrl='/doctor-screen/card2.jpg'
					buttonText='Красота как стиль жизни'
					onClick={handleOpenModal}
				/>
				<DoctorCard
					ref={card3Ref}
					imageUrl='/doctor-screen/card3.jpg'
					buttonText='Путь в хирургии'
					onClick={handleOpenModal}
				/>
			</div>
		</section>
	)
}
