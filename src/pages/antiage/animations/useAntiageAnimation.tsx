import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useAntiageAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	leftTextRef: RefObject<HTMLHeadingElement | null>,
	geneticPassportRef: RefObject<HTMLHeadingElement | null>,
	hormonesRef: RefObject<HTMLHeadingElement | null>,
	regenerativeMedicineRef: RefObject<HTMLHeadingElement | null>,
	cellularRejuvenationRef: RefObject<HTMLHeadingElement | null>,
	...contentRefs: RefObject<HTMLDivElement | null>[]
) => {
	useEffect(() => {
		const textElement = textRef.current
		const sectionElement = sectionRef.current
		const backgroundElement = backgroundRef.current
		const leftTextElement = leftTextRef.current
		const geneticPassportElement = geneticPassportRef.current
		const hormonesElement = hormonesRef.current
		const regenerativeMedicineElement = regenerativeMedicineRef.current
		const cellularRejuvenationElement = cellularRejuvenationRef.current
		const contentElements = contentRefs.map(ref => ref.current)

		if (
			!textElement ||
			!sectionElement ||
			!backgroundElement ||
			!leftTextElement ||
			!geneticPassportElement ||
			!hormonesElement ||
			!regenerativeMedicineElement ||
			!cellularRejuvenationElement ||
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

		gsap.set(geneticPassportElement, {
			opacity: 0,
			x: -80,
		})

		gsap.set(hormonesElement, {
			opacity: 0,
			scale: 0.5,
			filter: 'blur(10px)',
		})

		gsap.set(regenerativeMedicineElement, {
			opacity: 0,
			x: -80,
		})

		gsap.set(cellularRejuvenationElement, {
			opacity: 0,
			x: -80,
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

		let backgroundDownStartTime = 0

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

			if (index === 2) {
				tl.to(
					geneticPassportElement,
					{
						opacity: 1,
						x: 0,
						duration: 2,
						ease: 'power2.out',
					},
					startTime + blockAppearDuration
				)
			}

			if (index === 3) {
				tl.to(
					hormonesElement,
					{
						opacity: 1,
						scale: 1,
						filter: 'blur(0px)',
						duration: 2.5,
						ease: 'back.out(1.7)',
					},
					startTime
				)
			}

			if (index === 4) {
				tl.to(
					regenerativeMedicineElement,
					{
						opacity: 1,
						x: 0,
						duration: 2,
						ease: 'power2.out',
					},
					startTime
				)
			}

			if (index === 6) {
				tl.to(
					cellularRejuvenationElement,
					{
						opacity: 1,
						x: 0,
						duration: 2,
						ease: 'power2.out',
					},
					startTime
				)

				backgroundDownStartTime =
					startTime + blockAppearDuration + blockStayDuration
			}

			if (index === 0) {
				tl.to(
					backgroundElement,
					{
						scale: 1.7,
						x: '-25%',
						y: '15vh',
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

		if (backgroundDownStartTime > 0) {
			tl.to(
				backgroundElement,
				{
					y: '0vh',
					scale: 1,
					x: '-25%',

					duration: 8,
					ease: 'power2.inOut',
				},
				backgroundDownStartTime
			)
		}

		const slowRiseStartTime = 40

		tl.to(
			[
				cellularRejuvenationElement,
				geneticPassportElement,
				hormonesElement,
				regenerativeMedicineElement,
			],
			{
				y: '-6vh',
				duration: 60,
				ease: 'power1.inOut',
			},
			slowRiseStartTime
		)

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [
		textRef,
		sectionRef,
		backgroundRef,
		leftTextRef,
		geneticPassportRef,
		hormonesRef,
		regenerativeMedicineRef,
		cellularRejuvenationRef,
		...contentRefs,
	])
}
