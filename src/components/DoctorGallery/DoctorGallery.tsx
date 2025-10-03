'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const leftColumnImages = [
	'/doctor-screen/gallery/photo2.jpg',
	'/doctor-screen/gallery/photo4.jpg',
	'/doctor-screen/gallery/photo3.jpg',
]

const centerColumnImages = [
	'/doctor-screen/gallery/photo1.jpg',
	'/doctor-screen/gallery/photo7.jpg',
]

const rightColumnImages = [
	'/doctor-screen/card2.jpg',
	'/doctor-screen/gallery/photo6.jpg',
	'/doctor-screen/gallery/photo5.jpg',
]

export const DoctorGallery = () => {
	const centerRef = useRef<HTMLDivElement>(null)
	const scrollingTextRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!centerRef.current) return

		gsap.fromTo(
			centerRef.current,
			{ y: 0 },
			{
				y: 620,
				ease: 'power1.out',
				scrollTrigger: {
					trigger: centerRef.current,
					start: 'top 0%',
					end: 'bottom 20%',
					scrub: 1.5,
				},
			}
		)
	}, [])

	useEffect(() => {
		if (!scrollingTextRef.current) return

		const ctx = gsap.context(() => {
			const width = scrollingTextRef.current!.scrollWidth / 2

			gsap.to(scrollingTextRef.current, {
				x: -width, 
				duration: 15,
				ease: 'linear',
				repeat: -1,
			})
		}, scrollingTextRef)

		return () => ctx.revert()
	}, [])

	const renderImages = (images: string[]) =>
		images.map((src, i) => (
			<img
				key={i}
				src={src}
				alt={`gallery-${i}`}
				className='w-full h-[602px] object-cover'
			/>
		))

	return (
		<div className='w-full px-6 pb-40'>
			<div className='overflow-hidden whitespace-nowrap mb-20'>
				<div
					ref={scrollingTextRef}
					className='inline-block'
					style={{ display: 'inline-flex' }}
				>
					<h1 className='text-[120px]/[105%] font-normal text-[#1D1D1D] uppercase mr-20'>
						Красота как стиль жизни
					</h1>
					<h1 className='text-[120px]/[105%] font-normal text-[#1D1D1D] uppercase mr-20'>
						Красота как стиль жизни
					</h1>
				</div>
			</div>

			<div className='flex justify-center gap-4'>
				<div className='flex flex-col space-y-4 flex-1'>
					{renderImages(leftColumnImages)}
				</div>

				<div className='flex-1'>
					<div
						ref={centerRef}
						className='flex flex-col justify-center space-y-4'
					>
						{renderImages(centerColumnImages)}
					</div>
				</div>

				<div className='flex flex-col space-y-4 flex-1'>
					{renderImages(rightColumnImages)}
				</div>
			</div>
		</div>
	)
}
