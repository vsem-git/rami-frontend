'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { bgImages, blocksData } from '../shared/data/safety'

gsap.registerPlugin(ScrollTrigger)

export const MedicalSafety = () => {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const wrapper = wrapperRef.current
		const image = imageRef.current
		if (!wrapper || !image) return

		const isMobile = window.innerWidth <= 768

		if (isMobile) {
			setActiveIndex(0)
			return
		}

		const blocks = gsap.utils.toArray<HTMLElement>('.safety-block')

		ScrollTrigger.create({
			trigger: wrapper,
			start: 'top top',
			endTrigger: blocks[2],
			end: 'center center',
			pin: image,
			pinSpacing: true,
			id: 'image-pin',
			invalidateOnRefresh: true,
		})

		ScrollTrigger.create({
			trigger: blocks[2],
			start: 'top center',
			end: 'bottom center',
			onEnter: () => {},
			invalidateOnRefresh: true,
		})

		blocks.forEach((block, i) => {
			ScrollTrigger.create({
				trigger: block,
				start: 'center center',
				end: 'bottom center',
				onEnter: () => setActiveIndex(i),
				onEnterBack: () => setActiveIndex(i),
			})
		})

		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [])

	return (
		<div
			ref={wrapperRef}
			className='relative w-full bg-[#691C32] overflow-hidden px-4 md:px-0'
		>
			<h2 className='w-full text-xl leading-[125%] text-white uppercase mb-10 block md:hidden'>
				Медицинская безопасность
			</h2>

			<div className='hidden md:flex md:flex-row w-full'>
				<div
					ref={imageRef}
					className='sticky top-0 left-0 w-[45%] sxl:w-[700px] 2xl:w-[860px] h-screen flex-shrink-0 overflow-hidden margin-medical_safety'
				>
					<div className='relative w-full h-full'>
						{bgImages.map((src, index) => (
							<div
								key={index}
								className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out ${
									activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
								}`}
								style={{
									backgroundImage: `url(${src})`,
								}}
							>
								<div className='absolute inset-0 bg-gradient-to-b from-[rgba(29,29,29,0.5)] to-[rgba(29,29,29,0)]' />
							</div>
						))}
					</div>
				</div>

				<div className='flex flex-col w-full max-w-[750px] mx-auto mt-[160px]  space-y-[300px] text-white px-4'>
					{blocksData.map((block, idx) => (
						<section className='safety-block' key={idx}>
							<div className='w-full h-[1px] bg-[#FFFFFF33] mb-16' />
							<div className='flex items-center justify-between mb-6'>
								<h3 className='text-base sxl:text-2xl leading-[130%] uppercase'>
									{block.title}
								</h3>
								<h1 className='text-[32px]/[125%] sm:text-[44px]/[125%] lg:text-7xl/[125%] sxl:text-[120px]/[125%] text-[#FFFFFF4D] uppercase'>
									{block.number}
								</h1>
							</div>
							<ul className='flex flex-col gap-3 max-w-[610px] text-xs sxl:text-lg/[155%] uppercase'>
								{block.items.map((item, i) => (
									<li key={i} className='flex items-center gap-2'>
										<div className=' min-w-1.5 h-1.5 rounded-full bg-[#FFFFFF80]' />
										{item}
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			</div>

			<div className='flex flex-col md:hidden space-y-8'>
				{blocksData.map((block, idx) => (
					<div key={idx} className='flex flex-col space-y-6'>
						<div className='w-full h-[1px] bg-[#FFFFFF33]' />

						<div className='flex flex-wrap space-x-4'>
							<div className='w-full flex sm:hidden items-center justify-between mb-4'>
								<h3 className='text-[18px] leading-[130%] uppercase text-white'>
									{block.title}
								</h3>
								<h1 className='text-[32px]/[125%] sm:text-[44px]/[125%] text-[#FFFFFF4D] uppercase flex-shrink-0'>
									{block.number}
								</h1>
							</div>
							<div className='flex-shrink-0 medical-image relative overflow-hidden'>
								<div
									className='w-full h-full bg-cover bg-center'
									style={{
										backgroundImage: `url(${bgImages[idx]})`,
									}}
								>
									<div className='absolute inset-0 bg-gradient-to-b from-[rgba(29,29,29,0.5)] to-[rgba(29,29,29,0)]' />
								</div>
							</div>

							<div className='flex-1 text-white'>
								<div className='hidden sm:flex items-center justify-between mb-4'>
									<h3 className='text-[18px] leading-[130%] uppercase flex-1 text-white'>
										{block.title}
									</h3>
									<h1 className='text-[32px]/[125%] sm:text-[44px]/[125%] text-[#FFFFFF4D] uppercase flex-shrink-0'>
										{block.number}
									</h1>
								</div>
								<ul className='flex flex-col gap-2 text-xs uppercase mt-6 sm:mt-0'>
									{block.items.map((item, i) => (
										<li key={i} className='flex items-center gap-2'>
											<div className=' min-w-1.5 h-1.5 rounded-full bg-[#FFFFFF80]' />
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
