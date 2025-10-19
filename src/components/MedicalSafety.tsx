'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const MedicalSafety = () => {
	const wrapperRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const wrapper = wrapperRef.current
		const image = imageRef.current
		if (!wrapper || !image) return

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

	const bgImages = [
		'/safety-screen/bg2.png',
		'/safety-screen/bg3.png',
		'/safety-screen/bg4.png',
	]

	return (
		<div
			ref={wrapperRef}
			className='relative flex w-full bg-[#691C32] overflow-hidden'
		>
			<div
				ref={imageRef}
				className='sticky top-0 left-0 w-[860px] h-screen flex-shrink-0 overflow-hidden'
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

			<div className='flex flex-col w-full max-w-[750px] mx-auto mt-[160px] mr-[100px] space-y-[300px] text-white'>
				{[
					{
						title: 'Безопасность пациентов:',
						number: '01',
						items: [
							'Бактериологическая и инфекционная безопасность',
							'VIP сопровождение пациентов',
							'Безопасность хирургических вмешательств',
							'Мониторинг функций пациента при помощи ИИ',
							'Круглосуточный контроль состояния',
						],
					},
					{
						title: 'Безопасность медперсонала:',
						number: '02',
						items: [
							'Полная защита от инфекций и бактериологических угроз',
							'Использование средств индивидуальной защиты',
							'Эргономика и предотвращение травм',
						],
					},
					{
						title: 'Безопасность среды:',
						number: '03',
						items: [
							'Бесперебойная работа систем энергоснабжения и вентиляции',
							'Предотвращение техногенных аварий',
						],
					},
				].map((block, idx) => (
					<section className='safety-block' key={idx}>
						<div className='w-full h-[1px] bg-[#FFFFFF33] mb-16' />
						<div className='flex items-center justify-between mb-6'>
							<h3 className='text-2xl/[130%] uppercase'>{block.title}</h3>
							<h1 className='text-[120px]/[105%] text-[#FFFFFF4D] uppercase'>
								{block.number}
							</h1>
						</div>
						<ul className='flex flex-col gap-3 max-w-[610px] text-lg/[155%] uppercase'>
							{block.items.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	)
}
