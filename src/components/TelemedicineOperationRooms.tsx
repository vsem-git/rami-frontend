'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const TelemedicineOperationRooms = () => {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		if (window.innerWidth <= 769) return

		const miniImages = container.querySelectorAll('.delete_mini-image')

		miniImages.forEach(img => {
			gsap.to(img, {
				y: () => gsap.utils.random(-50, 80),
				ease: 'none',
				scrollTrigger: {
					trigger: img,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			})
		})

		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [])

	const Card = ({
		id,
		title,
		img,
		img2,
	}: {
		id: string
		title: string
		img: string
		img2: string
	}) => (
		<div className='relative w-full max-w-full sm:max-w-[360px] md:max-w-[480px] xl:max-w-full'>
			<h2
				className={`absolute text-[96px] xl:text-[160px] leading-[105%] text-[#B59158] uppercase  md:hidden block
					${id === '01' ? 'top-[-12%]' : 'top-[-12%]'}`}
			>
				{id}
			</h2>

			<img
				src={img}
				alt={title}
				className='w-full h-[360px] md:h-[480px] xl:h-[600px] 2xl:h-[800px] aspect-[1/1] object-cover'
			/>

			<img
				src={img2}
				alt={title}
				className={`absolute aspect-[1/1] object-cover delete_mini-image
    ${
			id === '01'
				? 'top-[-25%] xl:top-[-20%] 2xl:top-[-12%] right-[-25%] xl:right-[-22%]  2xl:right-[-36%] w-[180px] md:w-[240px] xl:w-[300px] 2xl:w-[450px] h-[240px] md:h-[320px] xl:h-[400px] 2xl:h-[600px]'
				: 'top-[40%] md:top-[-20%] xl:top-[-23%] left-[-35%] md:left-auto md:right-[-16%] xl:right-[-21%] w-[160px] md:w-[180px] xl:w-[300px] h-[213px] md:h-[240px] xl:h-[400px] -translate-y-1/2 md:translate-none'
		}
  `}
				style={{
					filter: 'grayscale(100%) brightness(1) contrast(1)',
					willChange: 'transform',
				}}
			/>

			<div className='flex items-center justify-between gap-6'>
				<h2
					className={`text-[80px] sm:text-[96px] xl:text-[160px] leading-[105%] text-[#B59158] uppercase  md:block hidden
					${
						id === '01'
							? 'mt-[-8rem] xl:mt-[-7rem] 2xl:mt-[-9rem]'
							: 'mt-[-7rem] xl:mt-[-5.5rem] 2xl:mt-[-7rem]'
					}`}
				>
					{id}
				</h2>
				<h3
					className={`text-[13px] md:text-sm xl:text-base 2xl:text-[21px] leading-[155%] text-[#1D1D1D] uppercase max-w-full md:max-w-[330px] xl:max-w-[350px] 2xl:max-w-[500px] mt-6 md:mt-8`}
				>
					{title}
				</h3>
			</div>
		</div>
	)

	return (
		<div
			ref={containerRef}
			className='relative w-full bg-white px-4 sm:px-6 lg:px-20 2xl:px-[120px] pt-[120px] 2xl:py-[220px] flex justify-between overflow-hidden'
		>
			<img src='/pattern1.svg' alt='' className='absolute right-0 top-0' />
			<img src='/pattern2.svg' alt='' className='absolute left-0 -top-32' />

			<div className='w-full flex flex-col '>
				<h2 className='text-[20px] md:text-[24px] xl:text-[36px] text-[#1D1D1D] leading-[125%] uppercase text-start sm:text-center mb-0 md:mb-12 xl:mb-24'>
					телемедицина
				</h2>

				<div className='flex flex-col xl:flex-row justify-start xl:justify-between mt-[7rem] sm:mt-[10rem] gap-20 xl:gap-0'>
					<div className='relative z-10 '>
						<Card
							id='01'
							title='Видеоинформационный центр для проведения эндоскопических операций и дистанционного контроля над лечебными процессами'
							img='/operation-rooms/card5.jpg'
							img2='/operation-rooms/card4.jpg'
						/>
					</div>
					<div className='relative z-10 flex justify-end xl:mt-[45rem] 2xl:mt-[65rem] mr-0 md:mr-[80px] xl:mr-[10rem]'>
						<Card
							id='02'
							title='Комплекс систем телемедицины для проведения консилиумов, конференций и трансляции операций в любую точку мира'
							img='/operation-rooms/card2.jpg'
							img2='/operation-rooms/card3.jpg'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
