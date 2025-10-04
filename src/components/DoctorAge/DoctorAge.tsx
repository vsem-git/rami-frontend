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
}

const cardData: CardData[] = [
	{
		year: '1995',
		title: 'Университет',
		description: '1995',
		image: '/doctor-screen/age/card1.jpg',
		backgroundYear: '1995',
	},
	{
		year: '1997',
		title: '6 курс университета. Субординатура.',
		description: '1997',
		image: '/doctor-screen/age/card4.jpg',
		backgroundYear: '1997',
	},
	{
		year: '2006',
		title:
			'Альма-Матер. Мурманская областная больница. Отделение микрохирургии',
		description: '2006',
		image: '/doctor-screen/age/card5.jpg',
		backgroundYear: '2006',
	},
	{
		year: '1998 -2008',
		title: 'Опыт работы в ургентной и плановой микрохирургии',
		description: '1998 -2008',
		image: '/doctor-screen/age/card2.jpg',
		backgroundYear: '2008',
	},
	{
		year: '2016',
		title: 'Работа в клинике рами',
		description: '2016',
		image: '/doctor-screen/age/card3.png',
		backgroundYear: '2016',
	},
]

export const DoctorAge = () => {
	const containerRef = useRef(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])

	const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
		cardRefs.current[index] = el
	}

	useEffect(() => {
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

			tl.to(
				cardRefs.current[0],
				{
					x: '-60rem',
					scale: 0.7,
					ease: 'power2.inOut',
					duration: 2,
				},
				0
			)

			tl.to(
				cardRefs.current[1],
				{
					x: '-60rem',
					scale: 1,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				0
			)

			tl.to(
				cardRefs.current[2],
				{
					x: '0rem',
					scale: 0.7,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				0
			)

			tl.to(
				cardRefs.current[0],
				{
					opacity: 0,
					ease: 'power2.inOut',
					duration: 1,
				},
				1.5
			)

			tl.to(
				cardRefs.current[1],
				{
					x: '-120rem',
					scale: 0.7,
					ease: 'power2.inOut',
					duration: 2,
				},
				2
			)

			tl.to(
				cardRefs.current[2],
				{
					x: '-58rem',
					scale: 1,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				2
			)

			tl.to(
				cardRefs.current[3],
				{
					x: '0rem',
					scale: 0.7,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				2
			)

			tl.to(
				cardRefs.current[1],
				{
					opacity: 0,
					ease: 'power2.inOut',
					duration: 1,
				},
				3.5
			)

			tl.to(
				cardRefs.current[2],
				{
					x: '-120rem',
					scale: 0.7,
					ease: 'power2.inOut',
					duration: 2,
				},
				4
			)

			tl.to(
				cardRefs.current[3],
				{
					x: '-58rem',
					scale: 1,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				4
			)

			tl.to(
				cardRefs.current[4],
				{
					x: '0rem',
					scale: 0.7,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				4
			)

			tl.to(
				cardRefs.current[2],
				{
					opacity: 0,
					ease: 'power2.inOut',
					duration: 1,
				},
				5.5
			)

			tl.to(
				cardRefs.current[3],
				{
					x: '-120rem',
					scale: 0.7,
					ease: 'power2.inOut',
					duration: 2,
				},
				6
			)

			tl.to(
				cardRefs.current[4],
				{
					x: '-70rem',
					scale: 1,
					opacity: 1,
					ease: 'power2.inOut',
					duration: 2,
				},
				6
			)

			tl.to(
				cardRefs.current[3],
				{
					opacity: 0,
					ease: 'power2.inOut',
					duration: 1,
				},
				7.5
			)
		})

		return () => ctx.revert()
	}, [])

	const Card = ({ data, index }: { data: CardData; index: number }) => (
		<div
			ref={setCardRef(index)}
			className={`absolute top-[55%] -translate-x-1/2 -translate-y-1/2 ${
				index === 0 ? 'left-1/2' : '-right-[30rem] scale-[.7] opacity-0'
			}`}
		>
			<h1 className='absolute text-[350px] font-normal text-[#1D1D1D0D] uppercase left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2'>
				{data.backgroundYear}
			</h1>
			<div className='relative z-10 flex flex-col items-center'>
				<span className='text-lg font-normal text-[#B59158] uppercase'>
					{data.description}
				</span>
				<h4 className='text-[21px] text-[#1D1D1D] font-normal uppercase mt-3 mb-6 text-center max-w-[500px]'>
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
					className='w-[317px] h-[396px] object-cover'
				/>
			</div>
		</div>
	)

	return (
		<div
			ref={containerRef}
			className='relative h-screen text-center overflow-hidden'
		>
			<h2 className='text-[36px] font-normal text-[#1D1D1D] uppercase mb-[130px] mt-20'>
				Путь в хирургии
			</h2>

			{cardData.map((data, index) => (
				<Card key={data.year} data={data} index={index} />
			))}
		</div>
	)
}
