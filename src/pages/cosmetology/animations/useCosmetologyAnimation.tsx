import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useCosmetologyAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>,
	contentRef1: RefObject<HTMLDivElement | null>,
	contentRef2: RefObject<HTMLDivElement | null>,
	contentRef3: RefObject<HTMLDivElement | null>,
	contentRef4: RefObject<HTMLDivElement | null>,
	contentRef5: RefObject<HTMLDivElement | null>,
	contentRef6: RefObject<HTMLDivElement | null>,
	isMobile?: boolean // Добавляем параметр isMobile
) => {
	useEffect(() => {
		// Если мобильное устройство - полностью отключаем анимации
		if (isMobile || window.innerWidth <= 768) {
			return // Просто выходим из хука, ничего не анимируем
		}

		const textElement = textRef.current
		const sectionElement = sectionRef.current
		const backgroundElement = backgroundRef.current
		const contentElements = [
			contentRef1.current,
			contentRef2.current,
			contentRef3.current,
			contentRef4.current,
			contentRef5.current,
			contentRef6.current,
		]

		if (
			!textElement ||
			!sectionElement ||
			!backgroundElement ||
			contentElements.some(el => !el)
		)
			return

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top top',
				end: '+=1000%',
				scrub: 2,
				pin: true,
				markers: false,
			},
		})

		gsap.set(textElement, {
			x: '180vw',
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

		tl.fromTo(
			backgroundElement,
			{ scale: 1, x: '0vw', y: '0vh' },
			{
				scale: 1.3,
				x: '-10vw',
				y: '10vh',
				ease: 'power2.inOut',
				duration: 27,
			},
			1.5
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
	}, [
		textRef,
		sectionRef,
		backgroundRef,
		contentRef1,
		contentRef2,
		contentRef3,
		contentRef4,
		contentRef5,
		contentRef6,
		isMobile,
	])
}
