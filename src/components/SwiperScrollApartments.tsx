import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useRef } from 'react'

export const cardData = [
  '/apartments-screen/swiper/card1.png',
  '/apartments-screen/swiper/card2.png',
  '/apartments-screen/swiper/card1.png',
]

gsap.registerPlugin(ScrollTrigger)

export const SwiperScrollApartments = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const vectorRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndexRef = useRef(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el
    },
    []
  )

  const setVectorRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      vectorRefs.current[index] = el
    },
    []
  )

  // Просто обновляем карточки, не трогаем скролл
  const updateCards = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(cardRefs.current.length - 1, index))
    activeIndexRef.current = clampedIndex

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const xOffset = (i - clampedIndex) * 70
      gsap.to(card, {
        x: `${xOffset}rem`,
        scale: i === clampedIndex ? 1 : 0.95,
        opacity: i === clampedIndex ? 1 : 0.5,
        duration: 0.6,
        ease: 'power2.inOut',
      })
    })

    vectorRefs.current.forEach((vec, i) => {
      if (!vec) return
      gsap.to(vec, {
        opacity: i === clampedIndex ? 1 : 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
    })
  }

  const goToCard = (index: number) => {
    const total = cardRefs.current.length
    const clampedIndex = Math.max(0, Math.min(total - 1, index))
    if (!scrollTriggerRef.current) return

    // Обновляем прогресс ScrollTrigger без трогания окна
    scrollTriggerRef.current.scroll(
      scrollTriggerRef.current.start +
        (clampedIndex / (total - 1)) * (scrollTriggerRef.current.end - scrollTriggerRef.current.start)
    )

    updateCards(clampedIndex)
  }

  const handlePrev = () => goToCard(activeIndexRef.current - 1)
  const handleNext = () => goToCard(activeIndexRef.current + 1)

  useEffect(() => {
    if (!containerRef.current) return
    if (window.innerWidth <= 768) {
      cardRefs.current.forEach(card => gsap.set(card, { x: 0, scale: 1, opacity: 1 }))
      vectorRefs.current.forEach(vec => gsap.set(vec, { opacity: 1 }))
      return
    }

    updateCards(0)

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 0.8,
        pin: true,
        onUpdate: self => {
          const total = cardRefs.current.length
          const newIndex = Math.floor(self.progress * total)
          if (newIndex !== activeIndexRef.current) updateCards(newIndex)
        },
      })
    }, containerRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className='relative w-full h-screen overflow-hidden bg-[#1D1D1D]'>
      <img src='/pattern1.svg' alt='' className='absolute right-0 top-0' />
      <img src='/pattern2.svg' alt='' className='absolute left-0 -top-32' />

      {/* Кнопки */}
      <button
        onClick={handlePrev}
        className='absolute top-1/2 left-10 -translate-y-1/2 w-[120px] h-[120px] flex items-center justify-center bg-[#FFFFFF1A] border border-[#FFFFFF1A] backdrop-blur-[50px] rounded-full z-20 cursor-pointer'
      >
        <img src='/icon-r.svg' alt='arrow' className='w-10 h-10 rotate-180' />
      </button>
      <button
        onClick={handleNext}
        className='absolute top-1/2 right-10 -translate-y-1/2 w-[120px] h-[120px] flex items-center justify-center bg-[#FFFFFF1A] border border-[#FFFFFF1A] backdrop-blur-[50px] rounded-full z-20 cursor-pointer'
      >
        <img src='/icon-r.svg' alt='arrow' className='w-10 h-10' />
      </button>

      <div className='w-full flex flex-col items-center gap-10 -mt-12 md:block md:-mt-0'>
        {cardData.map((data, index) => (
          <div
            key={index}
            ref={setCardRef(index)}
            className='relative w-full flex flex-col items-center justify-center mb-20 md:mb-0 md:absolute md:top-[55%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2'
          >
            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
              <div
                ref={setVectorRef(index)}
                className='absolute inset-0 z-0'
                style={{ opacity: index === activeIndexRef.current ? 1 : 0 }}
              >
                {/* Векторы */}
                {index === 0 && (
                  <>
                    <img src='/apartments-screen/swiper/vect.png' alt='' className='absolute left-[22%] w-[268px] h-[268px]' />
                    <img src='/apartments-screen/swiper/vect2.png' alt='' className='absolute left-[66%] top-[-25rem] w-[190px] h-[190px] rotate-[65deg]' />
                    <img src='/apartments-screen/swiper/vect3.png' alt='' className='absolute right-[140px] bottom-[-10rem] w-[160px] h-[160px]' />
                  </>
                )}
                {index === 1 && (
                  <>
                    <img src='/apartments-screen/swiper/vect3.png' alt='' className='absolute left-[66%] top-[-25rem] w-[190px] h-[190px]' />
                    <img src='/apartments-screen/swiper/vect2.png' alt='' className='absolute right-[140px] bottom-[12rem] w-[160px] h-[160px]' />
                    <img src='/apartments-screen/swiper/vect3.png' alt='' className='absolute left-[24%] w-[160px] h-[160px]' />
                  </>
                )}
                {index === 2 && (
                  <>
                    <img src='/apartments-screen/swiper/vect3.png' alt='' className='absolute left-[66%] top-[-25rem] w-[190px] h-[190px]' />
                    <img src='/apartments-screen/swiper/vect3.png' alt='' className='absolute left-[24%] w-[160px] h-[160px]' />
                  </>
                )}
              </div>

              <img
                src={data}
                alt=''
                className='relative z-10 w-[800px] h-[640px] object-cover'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
