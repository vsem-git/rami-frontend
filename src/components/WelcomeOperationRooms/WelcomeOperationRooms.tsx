import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef } from 'react'
import { OperationRooms } from '../../shared/data/operation-rooms'
import { useOperationRoomsAnimation } from './animations/useOperationRoomsAnimation'

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother)

export const WelcomeOperationRooms: React.FC = () => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const backgroundRef = useRef<HTMLDivElement | null>(null)
	const defaultContentRef = useRef<HTMLDivElement | null>(null)
	const doctorContentRef = useRef<HTMLDivElement | null>(null)

	useOperationRoomsAnimation(
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef
	)

	const handleScrollToNext = () => {
		const nextSection = document.getElementById('telemedicine-section')
		if (!nextSection) return

		const smoother = ScrollSmoother.get()
		if (smoother) {
			smoother.scrollTo(nextSection, true, 'power2.out')
		} else {
			nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<section
			ref={sectionRef}
			className='relative h-auto md:h-screen overflow-hidden '
			aria-label='Приветствие — умные операционные'
		>
			<div
				aria-label='Фоновое изображение'
				className='w-full h-[640px] md:h-auto '
			>
				<div
					ref={backgroundRef}
					className='relative w-full h-full md:absolute inset-0 bg-cover bg-center flex items-end justify-center'
					style={{
						backgroundPosition: '50% 8%',
						backgroundImage:
							"linear-gradient(180deg, rgba(29, 29, 29, 0.7) 0%, rgba(29, 29, 29, 0.3) 50%, rgba(29, 29, 29, 0.7) 100%), url('/operation-rooms/bg1.webp')",
						filter: 'grayscale(100%) brightness(1.2) contrast(1.05)',
					}}
					role='img'
				>
					<div className='w-full md:hidden text-white p-4 md:p-0 flex items-end justify-between flex-wrap'>
						<div className=''>
							<h3 className='text-[15px] md:text-base leading-[130%] uppercase tracking-widest mb-2 font-light'>
								MEDICAL VISUAL SYSTEMS
							</h3>
							<h1 className='text-[24px]/[125%] sm:text-[44px]/[125%] xl:text-[72px]/[125%] 2xl:text-[88px]/[125%] font-normal uppercase'>
								УМНЫЕ ОПЕРАЦИОННЫЕ
							</h1>
						</div>

						<button
							onClick={handleScrollToNext}
							className='w-10 md:w-16 h-10 md:h-16 flex items-center justify-center rounded-full border border-[#FFFFFF1A] bg-transparent cursor-pointer transition-transform hover:scale-105 focus:outline-none z-50 relative'
							aria-label='Прокрутить вниз к телемедицине'
						>
							<img
								src='/icon-r.svg'
								alt='icon'
								className='md:w-10 md:h-10 rotate-90 pointer-events-none'
							/>
						</button>
					</div>
				</div>
			</div>

			<div
				ref={defaultContentRef}
				className='relative z-20 min-h-auto md:min-h-screen flex flex-col justify-end text-white px-5 gap-6 pb-10'
			>
				<div className='flex items-center justify-between flex-wrap gap-6'>
					<div className='md:block hidden'>
						<h3 className='text-base leading-[130%] uppercase tracking-widest'>
							MEDICAL VISUAL SYSTEMS
						</h3>
						<h1 className='text-[24px]/[125%] sm:text-[44px]/[125%] xl:text-[72px]/[125%] 2xl:text-[88px]/[125%] font-normal uppercase'>
							УМНЫЕ ОПЕРАЦИОННЫЕ
						</h1>
					</div>

					<button
						onClick={handleScrollToNext}
						className='w-10 md:w-16 h-10 md:h-16 flex items-center justify-center rounded-full border border-[#FFFFFF1A] bg-transparent cursor-pointer transition-transform hover:scale-105 focus:outline-none z-50 relative'
						aria-label='Прокрутить вниз к телемедицине'
					>
						<img
							src='/icon-r.svg'
							alt='icon'
							className='md:w-10 md:h-10 rotate-90 pointer-events-none'
						/>
					</button>
				</div>
			</div>

			<div
				ref={doctorContentRef}
				className='relative md:absolute inset-0 z-30 flex items-center justify-center p-4 md:p-6 xl:p-10'
			>
				<div className='w-full flex justify-start md:justify-end'>
					{OperationRooms[0].content}
				</div>
			</div>
		</section>
	)
}
