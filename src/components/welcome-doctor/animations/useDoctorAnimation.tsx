import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useDoctorAnimation = (
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	defaultContentRef: RefObject<HTMLDivElement | null>,
	doctorContentRef: RefObject<HTMLDivElement | null>,
	isMobile?: boolean
) => {
	useEffect(() => {
		if (isMobile || window.innerWidth <= 768) {
			return
		}

		const sectionElement = sectionRef.current
		const backgroundElement = backgroundRef.current
		const defaultContentElement = defaultContentRef.current
		const doctorContentElement = doctorContentRef.current

		if (
			!sectionElement ||
			!backgroundElement ||
			!defaultContentElement ||
			!doctorContentElement
		)
			return

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top top',
				end: '+=800%',
				scrub: 1.5,
				pin: true,
				markers: false,
			},
		})

		gsap.set(doctorContentElement, {
			y: '100vh',
			opacity: 0,
		})

		tl.to(
			defaultContentElement,
			{
				y: '-100vh',
				duration: 6,
				ease: 'power2.inOut',
			},
			0
		)

		tl.to(
			backgroundElement,
			{
				backgroundPosition: '50% 50%',
				duration: 8,
				ease: 'power2.inOut',
			},
			1
		)

		tl.to(
			doctorContentElement,
			{
				y: '0vh',
				opacity: 1,
				duration: 4,
				ease: 'power2.out',
			},
			3
		)

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [sectionRef, backgroundRef, defaultContentRef, doctorContentRef, isMobile])
}
