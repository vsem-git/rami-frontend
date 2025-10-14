import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useCardsAnimation = (
  sectionRef: RefObject<HTMLElement | null>,
  cardRefs: Array<RefObject<HTMLDivElement | null>>
) => {
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const cards = cardRefs.map(ref => ref.current).filter(Boolean) as HTMLElement[]

      if (!section || cards.length === 0) return

      gsap.set(cards, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotationX: 10
      })

      if (window.innerWidth <= 768) {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.5,
          stagger: 0.2
        })
        return
      }

      const durationPerCard = 0.5
      const totalDuration = durationPerCard * cards.length + 1

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          end: `+=${totalDuration * window.innerHeight}`,
          scrub: true,
          pin: section, 
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false
        }
      })

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: durationPerCard,
            ease: 'power3.out'
          },
          i * durationPerCard
        )
      })

    }, sectionRef.current)

    return () => ctx.revert()
  }, [sectionRef, cardRefs])
}
