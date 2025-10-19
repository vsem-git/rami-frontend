import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useGettingReadyAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	shadowRef: RefObject<HTMLDivElement | null>,
	...contentRefs: RefObject<HTMLDivElement | null>[]
) => {
	useEffect(() => {
		const textElement = textRef.current
		const sectionElement = sectionRef.current
		const backgroundElement = backgroundRef.current
		const contentElements = contentRefs.map(ref => ref.current)
		const shadowElement = shadowRef.current

		if (
			!textElement ||
			!sectionElement ||
			!backgroundElement ||
			contentElements.some(el => !el)
		)
			return

		const isMobile = window.innerWidth <= 768
		const isTablet = window.innerWidth <= 1000

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top top',
				end: isMobile ? '+=300%' : '+=1000%',
				scrub: 2,
				pin: !isMobile,
				markers: false,
			},
		})

		if (isMobile) {
			tl.fromTo(
				backgroundElement,
				{ scale: 1, opacity: 1 },
				{ scale: 1.2, opacity: 0, duration: 4, ease: 'power3.inOut' },
				0
			)
			tl.to(
				textElement,
				{ opacity: 0, y: -80, duration: 3, ease: 'power3.inOut' },
				0.8
			)
			return () => {
				tl.kill()
				ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			}
		}

		gsap.set(backgroundElement, { scale: 1, y: '0vh', x: '-25%' })
		gsap.set(textElement, { x: '0%', y: '0%', opacity: 1 })
		gsap.set(shadowElement, { opacity: 0, y: '0vh', x: '0%', scale: 1 })

		contentElements.forEach(el => {
			if (el) {
				gsap.set(el, {
					opacity: 0,
					scale: 0.7,
					filter: 'blur(25px)',
					y: 0,
				})
			}
		})

		const blockAppearDuration = 3.5
		const blockStayDuration = 2.5
		const blockDisappearDuration = 2.5

		const backgroundScale = isTablet ? 1.4 : 1.5

		contentElements.forEach((element, index) => {
			if (!element) return

			const startTime =
				3 +
				index *
					(blockAppearDuration +
						blockStayDuration +
						blockDisappearDuration * 0.9)

			tl.to(
				element,
				{
					opacity: 1,
					scale: 1,
					filter: 'blur(0px)',
					duration: blockAppearDuration,
					ease: 'power3.out',
				},
				startTime
			)

			if (index === 1) {
				tl.to(
					textElement,
					{
						opacity: 0,
						duration: 3,
						ease: 'power3.inOut',
					},
					startTime + blockAppearDuration * 0.7
				)
			}

			if (index === 0) {
				tl.to(
					backgroundElement,
					{
						scale: backgroundScale,
						y: '25vh',
						duration: 15,
						ease: 'power3.inOut',
					},
					startTime
				)

				tl.to(
					shadowElement,
					{
						y: '0vh',
						opacity: 1,
						scale: 1,
						duration: 15,
						ease: 'power3.inOut',
					},
					startTime
				)
			}

			if (index === 2) {
				tl.to(
					backgroundElement,
					{
						y: '-30vh',
						duration: 20,
						ease: 'power2.out',
					},
					startTime
				)

				tl.to(
					shadowElement,
					{
						y: '-50vh',
						duration: 15,
						ease: 'power2.out',
					},
					startTime
				)
			}

			if (index === 7) {
				tl.to(
					backgroundElement,
					{
						y: '-32vh',
						duration: 8,
						ease: 'power3.inOut',
					},
					startTime
				)
				tl.to(
					shadowElement,
					{
						y: '-52vh',
						duration: 15,
						ease: 'power3.inOut',
					},
					startTime
				)
			}
			if (index === 8) {
				tl.to(
					backgroundElement,
					{
						y: '-32vh',
						duration: 5,
						ease: 'none',
					},
					startTime
				)
				tl.to(
					shadowElement,
					{
						y: '-52vh',
						duration: 15,
						ease: 'power3.inOut',
					},
					startTime
				)
			}

			if (index === 9) {
				tl.to(
					backgroundElement,
					{
						y: '0vh',
						scale: 1,
						duration: 10,
						ease: 'power3.inOut',
					},
					startTime
				)
				tl.to(shadowElement, {
					y: '0vh',
					scale: 1,
					opacity: 0,
					duration: 8,
					ease: 'power2.inOut',
				})
			}

			if (index < contentElements.length - 1) {
				tl.to(
					element,
					{
						opacity: 0,
						scale: 0.95,
						filter: 'blur(10px)',
						duration: blockDisappearDuration,
						ease: 'power3.inOut',
					},
					startTime + blockAppearDuration + blockStayDuration * 0.9
				)
			}
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [textRef, sectionRef, backgroundRef, shadowRef, ...contentRefs])
}
