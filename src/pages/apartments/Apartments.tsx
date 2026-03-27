import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { SwiperScrollApartments } from '../../components/SwiperScrollApartments'
import { TelemedicineApartments } from './components/TelemedicineApartments'
import { WelcomeApartments } from './components/WelcomeApartments/WelcomeApartments'

export const Apartments = () => {
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!sectionRef.current) return

		gsap.fromTo(
			sectionRef.current,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 4,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					toggleActions: 'play none none none',
				},
			}
		)
	}, [])

	return (
		<>
			<WelcomeApartments />
			<TelemedicineApartments />
			<SwiperScrollApartments />
		</>
	)
}
