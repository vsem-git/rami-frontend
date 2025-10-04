import { useRef } from 'react'
import { DoctorCard } from '../DoctorCard'
import { useCardsAnimation } from './animation/useCardsAnimation'

export const DoctorCardsSection = () => {
	const cardsSectionRef = useRef<HTMLElement>(null)
	const card1Ref = useRef<HTMLDivElement>(null)
	const card2Ref = useRef<HTMLDivElement>(null)
	const card3Ref = useRef<HTMLDivElement>(null)

	const cardsRefs = [card1Ref, card2Ref, card3Ref]

	useCardsAnimation(cardsSectionRef, cardsRefs)

	return (
		<section
			ref={cardsSectionRef}
			className='w-full h-screen flex justify-center items-center px-10'
		>
			<div className='w-full grid grid-cols-3 gap-2'>
				<DoctorCard
					ref={card1Ref}
					imageUrl='/doctor-screen/card1.jpg'
					className='bg-[70%_0%]'
					buttonText='Результаты'
				/>
				<DoctorCard
					ref={card2Ref}
					imageUrl='/doctor-screen/card2.jpg'
					buttonText='Красота как стиль жизни'
				/>
				<DoctorCard
					ref={card3Ref}
					imageUrl='/doctor-screen/card3.jpg'
					buttonText='Путь в хирургии'
				/>
			</div>
		</section>
	)
}
