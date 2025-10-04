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

		if (window.innerWidth <= 768) {
			gsap.set(cards, { opacity: 1, y: 0 })
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			return
		}

		gsap.set(cards, { opacity: 0, y: 50 })

		const durationPerCard = 0.5
		const totalDuration = durationPerCard * cards.length + 1

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: `+=${totalDuration * window.innerHeight}`,
				scrub: true,
				pin: true,
				anticipatePin: 1,
				markers: false,
			},
		})

		cards.forEach((card, i) => {
			tl.to(
				card,
				{
					opacity: 1,
					y: 0,
					duration: durationPerCard,
					ease: 'power3.out',
				},
				i * durationPerCard
			)
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
		}
	}, [sectionRef, cardRefs])
}
