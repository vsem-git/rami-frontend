'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Doctor } from '../../shared/types/doctor'

gsap.registerPlugin(ScrollTrigger)

export const DoctorGallery = ({ doctor }: { doctor: Doctor }) => {
	const leftColumnImages = doctor.gallery?.[0]?.leftColumnImages || []
	const centerColumnImages = doctor.gallery?.[1]?.centerColumnImages || []
	const rightColumnImages = doctor.gallery?.[2]?.rightColumnImages || []

	const allImages = [
		...leftColumnImages,
		...centerColumnImages,
		...rightColumnImages,
	]

	const centerRef = useRef<HTMLDivElement | null>(null)
	const scrollingTextRef = useRef<HTMLDivElement | null>(null)
	const carouselRef = useRef<HTMLDivElement | null>(null)

	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
	const [isMobile, setIsMobile] = useState(false)

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

		if (leftColumnImages.length === 2 && rightColumnImages.length === 2) return

		const imgHeight = 300
		const spacing = 16
		const yValue = centerColumnImages.length * (imgHeight + spacing)

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
						end: `+=${yValue}`,
						scrub: 1.5,
					},
				}
			)
		}, centerRef)

		return () => {
			ScrollTrigger.getAll().forEach(trigger => trigger.kill())
			ctx.revert()
		}
	}, [
		windowSize.width,
		isMobile,
		centerColumnImages.length,
		leftColumnImages.length,
		rightColumnImages.length,
	])

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
	}, [allImages])

	return (
		<div className='w-full  pb-40'>
			<div className='overflow-hidden whitespace-nowrap mb-10 md:mb-16 xl:mb-20'>
				<div
					ref={scrollingTextRef}
					className='inline-block'
					style={{ display: 'inline-flex' }}
					aria-label='Scrolling heading'
				>
					<h1 className='text-[44px]/[125%] md:text-[72px]/[125%] xl:text-[120px]/[105%] font-normal text-[#1D1D1D] uppercase mr-10 xl:mr-20'>
						{doctor.titleGallery}
					</h1>
					<h1 className='text-[44px]/[125%] md:text-[72px]/[125%] xl:text-[120px]/[105%] font-normal text-[#1D1D1D] uppercase mr-10 xl:mr-20'>
						{doctor.titleGallery}
					</h1>
				</div>
			</div>

			<div className='px-0 md:px-6'>
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
		</div>
	)
}
