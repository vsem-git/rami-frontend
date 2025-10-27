import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const InfoOperationRooms = () => {
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const image2Ref = useRef<HTMLImageElement | null>(null)
	const image3Ref = useRef<HTMLImageElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (window.innerWidth < 769) return

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top top',
					end: '+=400%',
					scrub: true,
					pin: true,
					anticipatePin: 1,
				},
			})

			tl.fromTo(
				image2Ref.current,
				{ xPercent: -100, opacity: 0 },
				{ xPercent: 0, opacity: 1, duration: 1 }
			)

			tl.fromTo(
				image3Ref.current,
				{ xPercent: -100, opacity: 0 },
				{ xPercent: 0, opacity: 1, duration: 1 },
				'>'
			)

			tl.fromTo(
				textRef.current,
				{ x: 100, opacity: 0 },
				{ x: 0, opacity: 1, duration: 1 },
				'>'
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className='relative w-full h-screen flex items-center overflow-hidden flex-col_image-stack mb-20 gap-4 md:gap-6 xl:gap-10'
		>
			<div className='relative w-[70%] xl:w-[65%] 2xl:w-[70%] h-size_image-stack overflow-hidden'>
				<div className='image-stack'>
					<img src='/operation-rooms/key-image.png' alt='' />
					<img src='/operation-rooms/key-image.png' alt='' ref={image2Ref} />
					<img src='/operation-rooms/key-image.png' alt='' ref={image3Ref} />
				</div>
			</div>

			<div
				ref={textRef}
				className='relative z-10 w-full sm:w-[427px] 2xl:w-[620px] flex flex-col  px-4 md:px-0 pr-0 md:pr-4 mb-16 md:mb-0'
			>
				<h2 className='text-[20px] 2xl:text-[28px] text-[#1D1D1D] leading-[130%] uppercase'>
					Быстрая и комфортная <br />
					реабилитация
				</h2>

				<div className='space-y-6'>
					<div className='mt-12 xl:mt-16'>
						<span className='text-xs 2xl:text-[18px] text-[#B59158] leading-[155%] uppercase'>
							01
						</span>
						<p className='text-sm 2xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase mt-3 2xl:mt-4'>
							Использование современных возможностей эстетической медицины,
							которая тесно связана с послеоперационной реабилитацией
						</p>
					</div>
					<div>
						<span className='text-xs 2xl:text-[18px] text-[#B59158] leading-[155%] uppercase'>
							02
						</span>
						<p className='text-sm 2xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase mt-3 2xl:mt-4'>
							Косметические кресла-трансформеры с плавным перемещением пациента
							в горизонтальное положение и автоматическими манипуляторами для
							мытья головы и обработки швов после операции
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
