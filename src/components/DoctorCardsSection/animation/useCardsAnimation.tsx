import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useCardsAnimation = (
	sectionRef: RefObject<HTMLElement | null>,
	cardRefs: Array<RefObject<HTMLDivElement | null>>
) => {
	useEffect(() => {
		const section = sectionRef.current
		const cards = cardRefs
			.map(ref => ref.current)
			.filter(Boolean) as HTMLElement[]

		if (!section || cards.length === 0) return

		// Изначально скрываем и сдвигаем карточки вниз
		gsap.set(cards, { opacity: 0, y: 50 })

		// Высчитываем общую длительность анимации — допустим, по 0.5с на карточку + небольшой запас
		const durationPerCard = 0.5
		const totalDuration = durationPerCard * cards.length + 1

		// Таймлайн с pinned scroll
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: `+=${totalDuration * window.innerHeight}`, // умножаем длительность на высоту экрана для скролла
				scrub: true,
				pin: true,
				anticipatePin: 1,
				markers: false,
			},
		})

		// Анимируем появление карточек по очереди
		cards.forEach((card, i) => {
			tl.to(
				card,
				{
					opacity: 1,
					y: 0,
					duration: durationPerCard,
					ease: 'power3.out',
				},
				i * durationPerCard // сдвиг по времени для последовательного появления
			)
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [sectionRef, cardRefs])
}
