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
	specialBackgroundRef: RefObject<HTMLHeadingElement | null>,
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
		const specialBackgroundElement = specialBackgroundRef.current

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
		const isTablet = window.innerWidth <= 1024
		const isTabletX = window.innerWidth <= 1440

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

		gsap.set(textElement, { x: '0%', y: '0%', opacity: 1 })

		tl.to(
			textElement,
			{
				x: '-1vw',
				duration: 5,
				ease: 'sine.inOut',
			},
			0
		)

		gsap.set(leftTextElement, { x: '-100%', opacity: 0 })
		gsap.set(backgroundElement, { scale: 1, x: 0, y: 0 })
		gsap.set(geneticPassportElement, { opacity: 0, x: -80 })
		gsap.set(hormonesElement, { opacity: 0, scale: 0.5, filter: 'blur(10px)' })
		gsap.set(regenerativeMedicineElement, { opacity: 0, x: -80 })
		gsap.set(cellularRejuvenationElement, { opacity: 0, x: -80 })

		gsap.set(specialBackgroundElement, { scale: 1, x: 0 })

		tl.to(
			specialBackgroundElement,
			{
				x: '-30%',
				scale: 1.5,
				duration: 25,
				ease: 'power2.inOut',
			},
			0
		)

		contentElements.forEach(element => {
			if (element) {
				gsap.set(element, {
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

		let backgroundDownStartTime = 0

		const backgroundScale = isTablet ? 1.1 : 1.5

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

			if (index === 2) {
				tl.to(
					geneticPassportElement,
					{
						opacity: 1,
						x: 0,
						duration: 3,
						ease: 'power3.out',
					},
					startTime + blockAppearDuration * 0.8
				)
			}

			if (index === 3) {
				tl.to(
					hormonesElement,
					{
						opacity: 1,
						scale: 1,
						filter: 'blur(0px)',
						duration: 3.2,
						ease: 'expo.out',
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
						y: 0,
						duration: 3,
						ease: 'power3.out',
					},
					startTime
				)

				// tl.to(
				// 	regenerativeMedicineElement,
				// 	{
				// 		x: '6vw',
				// 		y: 'vw',
				// 		duration: 8,
				// 		ease: 'sine.inOut',
				// 	},
				// 	startTime + 3
				// )
			}

			if (index === 5) {
				tl.to(
					cellularRejuvenationElement,
					{
						opacity: 1,
						x: 0,
						duration: 3,
						ease: 'power3.out',
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
						scale: backgroundScale,
						x: isTablet ? '-15%' : '-25%',
						y: '25vh',
						duration: 6,
						ease: 'power3.inOut',
					},
					startTime + blockAppearDuration
				)

				tl.to(
					leftTextElement,
					{
						x: '7%',
						opacity: 1,
						duration: 16,
						ease: 'sine.inOut',
					},
					startTime + blockAppearDuration * 0.7
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
						scale: 0.95,
						filter: 'blur(10px)',
						duration: blockDisappearDuration,
						ease: 'power3.inOut',
					},
					startTime + blockAppearDuration + blockStayDuration * 0.9
				)
			}

			if (index === 3) {
				const backgroundMoveStart =
					startTime +
					blockAppearDuration +
					blockStayDuration +
					blockDisappearDuration * 0.9

				tl.to(
					backgroundElement,
					{
						y: isTabletX
							? '-5vh'
							: isTablet
							? '-30vh'
							: isMobile
							? '-4vh'
							: '-30vh',
						duration: 10,
						ease: 'sine.inOut',
					},
					backgroundMoveStart
				)
			}
		})

		if (backgroundDownStartTime > 0) {
			tl.to(
				backgroundElement,
				{
					y: '7vh',
					scale: 1.1,
					x: isTablet ? '-10%' : '-25%',
					duration: 10,
					ease: 'sine.inOut',
				},
				backgroundDownStartTime
			)
		}

		const slowRiseStartTime = 45

		tl.to(
			[
				cellularRejuvenationElement,
				geneticPassportElement,
				hormonesElement,
				regenerativeMedicineElement,
			],
			{
				y: '-5vh',
				duration: 80,
				ease: 'sine.inOut',
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
