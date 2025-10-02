import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useAntiageAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	leftTextRef: RefObject<HTMLHeadingElement | null>,
	...contentRefs: RefObject<HTMLDivElement | null>[]
) => {
	useEffect(() => {
		const textElement = textRef.current
		const sectionElement = sectionRef.current
		const backgroundElement = backgroundRef.current
		const leftTextElement = leftTextRef.current
		const contentElements = contentRefs.map(ref => ref.current)

		if (
			!textElement ||
			!sectionElement ||
			!backgroundElement ||
			!leftTextElement ||
			contentElements.some(el => !el)
		)
			return

		const isMobile = window.innerWidth <= 768

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top top',
				end: isMobile ? '+=300%' : '+=1000%',
				scrub: 2,
				pin: true,
				markers: false,
			},
		})

		if (isMobile) {
			tl.fromTo(
				backgroundElement,
				{ scale: 1, opacity: 1 },
				{ scale: 1.2, opacity: 0, duration: 3, ease: 'power2.out' },
				0
			)

			tl.to(
				textElement,
				{ opacity: 0, y: -100, duration: 2, ease: 'power2.inOut' },
				0.5
			)
			return () => {
				tl.kill()
				ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			}
		}

		gsap.set(textElement, {
			x: '180vw',
		})

		gsap.set(leftTextElement, {
			x: '-100%',
		})

		gsap.set(backgroundElement, {
			scale: 1,
			x: 0,
			y: 0,
		})

		contentElements.forEach(element => {
			if (element) {
				gsap.set(element, {
					opacity: 0,
					scale: 0.4,
					filter: 'blur(30px)',
					y: 0,
				})
			}
		})

		tl.to(
			textElement,
			{
				x: '-1vw',
				duration: 9,
				ease: 'power2.inOut',
			},
			0
		)

		tl.to(
			textElement,
			{
				y: '-140vw',
				duration: 4,
				ease: 'power2.inOut',
			},
			10.5
		)

		const blockAppearDuration = 2
		const blockStayDuration = 2
		const blockDisappearDuration = 1.5

		contentElements.forEach((element, index) => {
			if (!element) return

			const startTime =
				3 +
				index *
					(blockAppearDuration + blockStayDuration + blockDisappearDuration)

			tl.to(
				element,
				{
					opacity: 1,
					scale: 1,
					filter: 'blur(0px)',
					duration: blockAppearDuration,
					ease: 'power2.out',
				},
				startTime
			)

			if (index === 0) {
				tl.to(
					backgroundElement,
					{
						scale: 1.7,
						x: '-25%',
						y: '8vh',
						duration: 4,
						ease: 'power2.out',
					},
					startTime + blockAppearDuration
				)

				tl.to(
					backgroundElement,
					{
						y: '-40vh',
						duration: 35,
						ease: 'power1.inOut',
					},
					startTime + blockAppearDuration + 4
				)

				tl.to(
					leftTextElement,
					{
						x: '7%',
						duration: 40,
						ease: 'power2.out',
					},
					startTime + blockAppearDuration
				)
			}

			tl.to(
				element,
				{
					opacity: 1,
					duration: blockStayDuration,
					ease: 'none',
				},
				startTime + blockAppearDuration
			)

			if (index < contentElements.length - 1) {
				tl.to(
					element,
					{
						opacity: 0,
						duration: blockDisappearDuration,
						ease: 'power2.inOut',
					},
					startTime + blockAppearDuration + blockStayDuration
				)
			}
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [textRef, sectionRef, backgroundRef, leftTextRef, ...contentRefs])
}
