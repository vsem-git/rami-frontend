import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { InfoSafety } from '../../components/InfoSafety'
import { MedicalSafety } from '../../components/MedicalSafety'
import { PhysicalSecuritySafety } from '../../components/PhysicalSecuritySafety'
import { WelcomeSafety } from '../../components/WelcomeSafety/WelcomeSafety'

gsap.registerPlugin(ScrollTrigger)

export const Safety = () => {
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
			<WelcomeSafety />
			<MedicalSafety />
			<InfoSafety />
			<PhysicalSecuritySafety />
		</>
	)
}
