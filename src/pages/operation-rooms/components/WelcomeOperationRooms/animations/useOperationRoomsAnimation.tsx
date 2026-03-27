import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useOperationRoomsAnimation = (
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	defaultContentRef: RefObject<HTMLDivElement | null>,
	doctorContentRef: RefObject<HTMLDivElement | null>,
	isMobile?: boolean,
	nextPhotoRef?: RefObject<HTMLDivElement | null>
) => {
	useEffect(() => {
		if (isMobile || window.innerWidth <= 768) return
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const sectionElement = sectionRef.current
			const backgroundElement = backgroundRef.current
			const defaultContentElement = defaultContentRef.current
			const doctorContentElement = doctorContentRef.current
			const nextPhotoElement = nextPhotoRef?.current

			if (
				!sectionElement ||
				!backgroundElement ||
				!defaultContentElement ||
				!doctorContentElement
			)
				return

			const title = defaultContentElement.querySelector('h1')
			const subtitle = defaultContentElement.querySelector('h3')

			gsap.set(doctorContentElement, { y: '90vh', opacity: 0 })
			gsap.set(title, { y: 0, opacity: 1 })
			gsap.set(subtitle, { y: 0, opacity: 1 })
			gsap.set(backgroundElement, {
				scaleX: 1,
				scaleY: 1,
				transformOrigin: 'left center',
			})
			if (nextPhotoElement) gsap.set(nextPhotoElement, { opacity: 0 })

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top top',
					end: '+=800%',
					scrub: 1,
					pin: true,
					markers: false,
				},
			})

			tl.to([title, subtitle], { y: '-100vh', opacity: 0, duration: 2 }, 0)
				.to(
					doctorContentElement,
					{ y: '0vh', opacity: 1, duration: 1.5, ease: 'power2.out' },
					2
				)
				.to(doctorContentElement, { opacity: 0, duration: 1.5 }, '>1')

				.to(
					backgroundElement,
					{
						width: '50%',
						duration: 2,
						ease: 'power2.inOut',
					},
					'>'
				)

			gsap.to(backgroundElement, {
				y: window.innerHeight,
				opacity: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionElement,
					start: 'top top',
					end: 'bottom top',
					scrub: 1,
				},
			})

			if (nextPhotoElement) {
				tl.to(
					nextPhotoElement,
					{ opacity: 0, duration: 1.5, ease: 'power1.inOut' },
					'>0.5'
				)
			}

			return () => {
				tl.kill()
				ScrollTrigger.getAll().forEach(t => t.kill())
			}
		}, sectionRef.current)

		return () => ctx.revert()
	}, [
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef,
		isMobile,
		nextPhotoRef,
	])
}
