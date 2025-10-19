'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const InfoSafety = () => {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const stickyRef = useRef<HTMLDivElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const wrapper = wrapperRef.current
		const sticky = stickyRef.current
		if (!wrapper || !sticky) return

		const blocks = gsap.utils.toArray<HTMLElement>('.safety-block')

		const pinTrigger = ScrollTrigger.create({
			trigger: wrapper,
			start: 'top top',
			endTrigger: blocks[blocks.length - 1],
			end: 'bottom bottom', 
			pin: sticky,
			pinSpacing: true,
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

	const blocks = [
		{
			title: 'Конфиденциальность',
			number: '01',
			description:
				'Только авторизованные пользователи могут получать доступ к информации',
		},
		{
			title: 'Защита данных',
			number: '02',
			description: 'В том числе от несанкционированного внешнего доступа',
		},
		{
			title: 'Целостность',
			number: '03',
			description:
				'Информация о пациентах и методах эстетического преображения — корректная, точная, полная и защищенная от непреднамеренного или умышленного изменения',
		},
		{
			title: 'Доступность',
			number: '04',
			description:
				'Уполномоченные пользователи (врачи, медицинский персонал, надзорные органы) имеют возможность получить доступ к информации в любое время',
		},
	]

	return (
		<div
			ref={wrapperRef}
			className='relative flex w-full bg-[#691C32] overflow-hidden'
		>
			<div
				ref={stickyRef}
				className='sticky top-0 left-0 w-[860px] h-screen flex-shrink-0 flex items-start justify-center mt-[160px] px-10'
			>
				<div>
					<h3 className='text-4xl text-white leading-[125%] uppercase mb-10 max-w-[640px]'>
						ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ
					</h3>
					<p className='text-lg text-[#FFFFFFBF] leading-[155%] uppercase max-w-[540px]'>
						Сбалансированный комплекс мер и процессов, предназначенных для
						защиты информации от несанкционированного доступа, искажения,
						уничтожения или раскрытия. Обеспечивает соответствие требованиям
						законов о защите персональных данных РФ и других нормативных актов.
					</p>
				</div>
			</div>

			<div className='flex flex-col w-full max-w-[750px] mx-auto mt-[160px] mr-[100px] space-y-[64px] text-white'>
				{blocks.map((block, index) => (
					<section
						key={index}
						className='safety-block border-t border-[#FFFFFF33] pt-16'
					>
						<div className='flex items-center justify-between'>
							<div className='flex flex-col gap-6 max-w-[554px]'>
								<h3 className='text-2xl/[130%] uppercase'>{block.title}</h3>
								<p className='text-lg text-white uppercase leading-[155%]'>
									{block.description}
								</p>
							</div>
							<h1
								className={`text-[120px]/[105%] uppercase transition-opacity duration-500 ${
									activeIndex === index
										? 'text-[#FFFFFF4D] opacity-100'
										: 'opacity-30'
								}`}
							>
								{block.number}
							</h1>
						</div>
					</section>
				))}
			</div>
		</div>
	)
}
