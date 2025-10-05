'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface CardData {
	year: string
	title: string
	description: string
	image: string
	backgroundYear: string
	imageClassName?: string
}

const cardData: CardData[] = [
	{
		year: '1995',
		title: 'Университет',
		description: '1995',
		image: '/doctor-screen/age/card1.jpg',
		backgroundYear: '1995',
		imageClassName:
			'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
	},
	{
		year: '1997',
		title: '6 курс университета. Субординатура.',
		description: '1997',
		image: '/doctor-screen/age/card4.jpg',
		backgroundYear: '1997',
		imageClassName:
			'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
	},
	{
		year: '2006',
		title:
			'Альма-Матер. Мурманская областная больница. Отделение микрохирургии',
		description: '2006',
		image: '/doctor-screen/age/card5.jpg',
		backgroundYear: '2006',
		imageClassName:
			'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
	},
	{
		year: '1998 -2008',
		title: 'Опыт работы в ургентной и плановой микрохирургии',
		description: '1998 -2008',
		image: '/doctor-screen/age/card2.jpg',
		backgroundYear: '2008',
		imageClassName:
			'w-[323px] md:w-[450px] xl:w-[593px] h-[216px] md:h-[280px] xl:h-[396px]',
	},
	{
		year: '2016',
		title: 'Работа в клинике рами',
		description: '2016',
		image: '/doctor-screen/age/card3.png',
		backgroundYear: '2016',
		imageClassName:
			'w-[323px] md:w-[380px] xl:w-[449px] h-[216px] md:h-[250px] xl:h-[300px]',
	},
]

export const DoctorAge = () => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])

	const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
		cardRefs.current[index] = el
	}

	useEffect(() => {
		if (window.innerWidth <= 768) {
			gsap.set(cardRefs.current, { x: 0, scale: 1, opacity: 1 })
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			return
		}

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

			gsap.set(cardRefs.current[0], {
				x: '0rem',
				scale: 1,
				opacity: 1,
			})
			gsap.set(cardRefs.current[1], {
				x: '60rem',
				scale: 0.7,
				opacity: 1,
			})
			gsap.set(cardRefs.current.slice(2), {
				x: '60rem',
				scale: 0.7,
				opacity: 0,
			})

			tl.to(cardRefs.current[0], {
				x: '-60rem',
				scale: 0.7,
				ease: 'power2.inOut',
				duration: 2,
			})
				.to(
					cardRefs.current[1],
					{
						x: '0rem',
						scale: 1,
						ease: 'power2.inOut',
						duration: 2,
					},
					0
				)
				.to(cardRefs.current[0], { opacity: 0, duration: 1 }, 1.5)
				.to(
					cardRefs.current[2],
					{
						opacity: 1,
						duration: 0.5,
					},
					1.5
				)

			tl.to(
				cardRefs.current[1],
				{
					x: '-60rem',
					scale: 0.7,
					duration: 2,
				},
				2
			)
				.to(
					cardRefs.current[2],
					{
						x: '0rem',
						scale: 1,
						duration: 2,
					},
					2
				)
				.to(cardRefs.current[1], { opacity: 0, duration: 1 }, 3.5)
				.to(
					cardRefs.current[3],
					{
						opacity: 1,
						duration: 0.5,
					},
					3.5
				)

			tl.to(
				cardRefs.current[2],
				{
					x: '-60rem',
					scale: 0.7,
					duration: 2,
				},
				4
			)
				.to(
					cardRefs.current[3],
					{
						x: '0rem',
						scale: 1,
						duration: 2,
					},
					4
				)
				.to(cardRefs.current[2], { opacity: 0, duration: 1 }, 5.5)
				.to(
					cardRefs.current[4],
					{
						opacity: 1,
						duration: 0.5,
					},
					5.5
				)

			tl.to(
				cardRefs.current[3],
				{
					x: '-60rem',
					scale: 0.7,
					duration: 2,
				},
				6
			)
				.to(
					cardRefs.current[4],
					{
						x: '0rem',
						scale: 1,
						duration: 2,
					},
					6
				)
				.to(cardRefs.current[3], { opacity: 0, duration: 1 }, 7.5)
		})

		return () => ctx.revert()
	}, [])

	const Card = ({ data, index }: { data: CardData; index: number }) => (
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
	)

	return (
		<div
			ref={containerRef}
			className='relative h-auto md:h-screen text-center overflow-hidden'
		>
			<h2 className='text-xl md:text-[clamp(1.5rem,2.5vw,2rem)] xl:text-[clamp(1.75rem,3vw,2.25rem)] 2xl:text-[clamp(2rem,3.5vw,2.25rem)] font-normal text-[#1D1D1D] uppercase mb-[100px] md:mb-[130px] mt-0 md:mt-10'>
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