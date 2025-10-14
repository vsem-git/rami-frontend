'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useRef } from 'react'
import { cardData } from '../../shared/data/doctor'
import type { ICardDoctorAge } from '../../shared/types/doctor'

gsap.registerPlugin(ScrollTrigger)

export const DoctorAge = () => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])

	const setCardRef = useCallback(
		(index: number) => (el: HTMLDivElement | null) => {
			cardRefs.current[index] = el
		},
		[]
	)

	useEffect(() => {
		if (window.innerWidth <= 768) {
			gsap.set(cardRefs.current, { x: 0, scale: 1, opacity: 1 })
			return
		}

		if (!containerRef.current || cardRefs.current.length === 0) return

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: '+=600%',
					scrub: 1.5,
					pin: true,
				},
			})
			const heading = containerRef.current?.querySelector('h2')

			cardRefs.current.forEach((card, i) => {
				if (!card) return
				if (i === 0) {
					gsap.set(card, { x: '0rem', scale: 1, opacity: 1 })
				} else if (i === 1) {
					gsap.set(card, { x: '60rem', scale: 0.7, opacity: 1 })
				} else {
					gsap.set(card, { x: '60rem', scale: 0.7, opacity: 0 })
				}
			})

			for (let i = 0; i < cardRefs.current.length - 1; i++) {
				const current = cardRefs.current[i]
				const next = cardRefs.current[i + 1]

				if (!current || !next) continue

				tl.to(
					current,
					{
						x: '-60rem',
						scale: 0.7,
						ease: 'power2.inOut',
						duration: 2,
					},
					i * 2
				)
					.to(
						next,
						{
							x: '0rem',
							scale: 1,
							ease: 'power2.inOut',
							duration: 2,
						},
						i * 2
					)
					.to(
						current,
						{
							opacity: 0,
							duration: 1,
						},
						i * 2 + 1.5
					)
					.to(
						cardRefs.current[i + 2],
						{
							opacity: 1,
							duration: 0.5,
						},
						i * 2 + 1.5
					)
			}

			if (heading) {
				tl.to(
					heading,
					{
						opacity: 0,
						duration: 1.5,
						ease: 'power2.out',
					},
					1.5
				)
			}

			return () => {
				tl.scrollTrigger?.kill()
				tl.kill()
			}
		}, containerRef.current)

		return () => ctx.revert()
	}, [])

	const Card = useCallback(
		({ data, index }: { data: ICardDoctorAge; index: number }) => (
			<div
				ref={setCardRef(index)}
				className={`relative 
				w-full flex flex-col items-center justify-center mb-20 md:mb-0
				md:absolute md:top-[55%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
			`}
			>
				<h1 className='absolute text-[135px] md:text-[180px] xl:text-[222px] 2xl:text-[350px] font-normal text-[#1D1D1D0D] uppercase left-1/2 top-[5%] md:top-[18%] -translate-x-1/2 -translate-y-1/2'>
					{data.backgroundYear}
				</h1>
				<div className='relative z-10 flex flex-col items-center w-full'>
					<span className='text-lg font-normal text-[#B59158] uppercase'>
						{data.description}
					</span>
					<h4 className='text-sm/[155%] md:text-[clamp(0.875rem,1.5vw,1rem)] xl:text-[clamp(1rem,1.8vw,1.125rem)] 2xl:text-[18px]/[155%] text-[#1D1D1D] font-normal uppercase mt-3 mb-6 text-center max-w-[400px] md:max-w-[500px] xl:max-w-[600px]'>
						{data.title}
					</h4>
					<div className='flex flex-col items-center'>
						<div className='border border-[#0000001A] p-2 rounded-full'>
							<div className='w-2 h-2 bg-black rounded-full' />
						</div>
						<div className='h-10 w-[1px] bg-[#0000001A]' />
					</div>
					<img
						src={data.image}
						alt={`card ${data.year}`}
						className={`object-cover ${data.imageClassName}`}
					/>
				</div>
			</div>
		),
		[setCardRef]
	)

	return (
		<div
			ref={containerRef}
			className='relative text-center overflow-hidden 
		h-auto md:h-[clamp(700px,90vh,900px)] lg:h-[clamp(900px,110vh,1200px)]
		pt-0 md:pt-[clamp(60px,17vh,150px)]'
		>
			<h2 className='text-xl md:text-[clamp(1.5rem,2.5vw,2rem)] xl:text-[clamp(1.75rem,3vw,2.25rem)] 2xl:text-[clamp(2rem,3.5vw,2.25rem)] font-normal text-[#1D1D1D] uppercase mb-[100px] md:mb-[130px] mt-0'>
				Путь в хирургии
			</h2>

			<div className='w-full flex flex-col items-center gap-10 -mt-12 md:block md:-mt-0'>
				{cardData.map((data, index) => (
					<Card key={data.year} data={data} index={index} />
				))}
			</div>
		</div>
	)
}
