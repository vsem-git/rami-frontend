import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useOperationRoomsAnimation = (
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	defaultContentRef: RefObject<HTMLDivElement | null>,
	doctorContentRef: RefObject<HTMLDivElement | null>,
	isMobile?: boolean
) => {
	useEffect(() => {
		if (isMobile || window.innerWidth <= 768) return
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
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

			const title = defaultContentElement.querySelector('h1')
			const subtitle = defaultContentElement.querySelector('h3') // Добавляем выбор h3

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top top',
					end: '+=450%',
					scrub: 1,
					pin: true,
					markers: false,
				},
			})

			gsap.set(doctorContentElement, { y: '90vh', opacity: 0 })
			gsap.set(title, { y: 0, opacity: 1 })
			gsap.set(subtitle, { y: 0, opacity: 1 })

			tl.to(
				[title, subtitle],
				{ y: '-100vh', opacity: 0, duration: 2, ease: 'power2.inOut' },
				0
			)
				.to(
					backgroundElement,
					{ backgroundPosition: '50% 50%', duration: 3, ease: 'power2.inOut' },
					1
				)
				.to(
					doctorContentElement,
					{ y: '0vh', opacity: 1, duration: 1.5, ease: 'power2.out' },
					3
				)

			return () => {
				tl.kill()
				ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			}
		}, sectionRef.current)

		return () => ctx.revert()
	}, [sectionRef, backgroundRef, defaultContentRef, doctorContentRef, isMobile])
}
