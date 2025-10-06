'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const leftColumnImages = [
	'/doctor-screen/gallery/photo2.webp',
	'/doctor-screen/gallery/photo4.webp',
	'/doctor-screen/gallery/photo3.webp',
]

const centerColumnImages = [
	'/doctor-screen/gallery/photo1.webp',
	'/doctor-screen/gallery/photo7.webp',
]

const rightColumnImages = [
	'/doctor-screen/card2.webp',
	'/doctor-screen/gallery/photo6.webp',
	'/doctor-screen/gallery/photo5.webp',
]

const allImages = [
	...leftColumnImages,
	...centerColumnImages,
	...rightColumnImages,
]

export const DoctorGallery: React.FC = () => {
	const centerRef = useRef<HTMLDivElement | null>(null)
	const scrollingTextRef = useRef<HTMLDivElement | null>(null)
	const carouselRef = useRef<HTMLDivElement | null>(null)

	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
	const [isMobile, setIsMobile] = useState(false)

	const calculateYValue = useCallback((width: number) => {
		if (width >= 1280) return 620
		if (width >= 1024) return 420
		if (width >= 768) return 325
		return 345
	}, [])

	useEffect(() => {
		const updateWindowSize = () => {
			const width = window.innerWidth
			setWindowSize({ width, height: window.innerHeight })
			setIsMobile(width < 768)
		}

		updateWindowSize()
		window.addEventListener('resize', updateWindowSize)
		return () => window.removeEventListener('resize', updateWindowSize)
	}, [])

	useEffect(() => {
		if (!centerRef.current || windowSize.width === 0 || isMobile) return

		const yValue = calculateYValue(windowSize.width)

		const ctx = gsap.context(() => {
			gsap.fromTo(
				centerRef.current!,
				{ y: 0 },
				{
					y: yValue,
					ease: 'power1.out',
					scrollTrigger: {
						trigger: centerRef.current,
						start: 'top 0%',
						end: 'bottom 20%',
						scrub: 1.5,
					},
				}
			)
		}, centerRef)

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			ctx.revert()
		}
	}, [windowSize.width, isMobile, calculateYValue])

	useEffect(() => {
		if (!carouselRef.current || !isMobile) return

		const ctx = gsap.context(() => {
			const carousel = carouselRef.current
			if (!carousel) return

			const totalWidth = carousel.scrollWidth / 2

			gsap.to(carousel, {
				x: -totalWidth,
				duration: 20,
				ease: 'linear',
				repeat: -1,
				modifiers: {
					x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
				},
			})
		}, carouselRef)

		return () => ctx.revert()
	}, [isMobile])

	useEffect(() => {
		if (!scrollingTextRef.current) return

		const ctx = gsap.context(() => {
			const width = scrollingTextRef.current!.scrollWidth / 2

			gsap.to(scrollingTextRef.current!, {
				x: -width,
				duration: 15,
				ease: 'linear',
				repeat: -1,
			})
		}, scrollingTextRef)

		return () => ctx.revert()
	}, [])

	const renderImages = useCallback((images: string[]) => {
		return images.map((src, i) => (
			<img
				key={i}
				src={src}
				alt={`gallery image ${i + 1}`}
				className='w-full h-[309px] lg:h-[405px] xl:h-[602px] object-cover'
				loading='lazy'
				decoding='async'
			/>
		))
	}, [])

	const renderCarouselItems = useCallback(() => {
		const duplicatedImages = [...allImages, ...allImages]

		return duplicatedImages.map((src, i) => (
			<div key={i} className='flex-shrink-0 w-[240px] mx-2'>
				<img
					src={src}
					alt={`carousel image ${i + 1}`}
					className='w-full h-[240px] object-cover'
					loading='lazy'
					decoding='async'
				/>
			</div>
		))
	}, [])

	return (
		<div className='w-full px-0 md:px-6 pb-40'>
			<div className='overflow-hidden whitespace-nowrap mb-16 xl:mb-20'>
				<div
					ref={scrollingTextRef}
					className='inline-block'
					style={{ display: 'inline-flex' }}
					aria-label='Scrolling heading'
				>
					<h1 className='text-[44px]/[125%] md:text-[72px]/[125%] xl:text-[120px]/[105%] font-normal text-[#1D1D1D] uppercase mr-10 xl:mr-20'>
						Красота как стиль жизни
					</h1>
					<h1 className='text-[44px]/[125%] md:text-[72px]/[125%] xl:text-[120px]/[105%] font-normal text-[#1D1D1D] uppercase mr-10 xl:mr-20'>
						Красота как стиль жизни
					</h1>
				</div>
			</div>

			{!isMobile && (
				<div className='hidden md:flex justify-center gap-4'>
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
			)}

			{isMobile && (
				<div className='md:hidden overflow-hidden'>
					<div
						ref={carouselRef}
						className='flex'
						style={{ width: 'max-content' }}
					>
						{renderCarouselItems()}
					</div>
				</div>
			)}
		</div>
	)
}
