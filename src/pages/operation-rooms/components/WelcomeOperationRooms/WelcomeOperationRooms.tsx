'use client'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef } from 'react'
import { OperationRooms } from '../../../../shared/data/operation-rooms'
import { useOperationRoomsAnimation } from './animations/useOperationRoomsAnimation'

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother)

export const WelcomeOperationRooms: React.FC<{ nextPhotoRef: any }> = ({
	nextPhotoRef,
}) => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const backgroundRef = useRef<HTMLDivElement | null>(null)
	const defaultContentRef = useRef<HTMLDivElement | null>(null)
	const doctorContentRef = useRef<HTMLDivElement | null>(null)

	useOperationRoomsAnimation(
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef,
		false,
		nextPhotoRef
	)

	const handleScrollToNext = () => {
		const nextSection = document.getElementById('safety-section')
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
				id='welcome-operation'
			ref={sectionRef}
			className='relative h-auto md:h-screen w-full'
			aria-label='Приветствие — умные операционные'
		>
			<div
				ref={backgroundRef}
				className='relative w-full h-[720px] sm:h-[640px] md:h-full md:absolute inset-0 bg-cover bg-center flex items-end justify-start'
				style={{
					backgroundPosition: '50% 8%',
					backgroundImage:
						"linear-gradient(180deg, rgba(29,29,29,0.7) 0%, rgba(29,29,29,0.3) 50%, rgba(29,29,29,0.7) 100%), url('/operation-rooms/bg1.webp')",
					filter: 'grayscale(100%) brightness(1.2) contrast(1.05)',
				}}
			>
				<div
					ref={defaultContentRef}
					className='w-full relative z-20 flex justify-between items-end flex-wrap text-white px-5 pb-10 md:hidden'
				>
					<div>
						<h3 className='text-[15px] md:text-base leading-[130%] uppercase tracking-widest mb-2 font-light'
                            data-content-hint="operation-rooms.welcome.subtitle">
							MEDICAL VISUAL SYSTEMS
						</h3>
						<h1 className='text-[24px]/[125%] sm:text-[44px]/[125%] xl:text-[72px]/[125%] 2xl:text-[88px]/[125%] font-normal uppercase'
                            data-content-hint="operation-rooms.welcome.title">
							УМНЫЕ ОПЕРАЦИОННЫЕ
						</h1>
					</div>
					<button
						onClick={handleScrollToNext}
						className='w-10 md:w-16 h-10 md:h-16 flex items-center justify-center rounded-full border border-[#FFFFFF1A] bg-transparent cursor-pointer transition-transform hover:scale-105 focus:outline-none z-50 relative mt-4 md:mt-0'
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
				ref={defaultContentRef}
				className='relative z-20 hidden md:flex justify-between items-end text-white px-5 pb-10 min-h-[640px] md:min-h-screen'
			>
				<div>
					<h3 className='text-[15px] md:text-base leading-[130%] uppercase tracking-widest mb-2 font-light' data-content-hint="operation-rooms.welcome.subtitle">
						MEDICAL VISUAL SYSTEMS
					</h3>
					<h1 className='text-[24px]/[125%] sm:text-[44px]/[125%] xl:text-[72px]/[125%] 2xl:text-[88px]/[125%] font-normal uppercase' data-content-hint="operation-rooms.welcome.title">
						УМНЫЕ ОПЕРАЦИОННЫЕ
					</h1>
				</div>

				<button
					onClick={handleScrollToNext}
					className='w-16 h-16 flex items-center justify-center rounded-full border border-[#FFFFFF1A]'
				>
					<img src='/icon-r.svg' alt='' className='rotate-90 w-10 h-10' />
				</button>
			</div>

			<div
				ref={doctorContentRef}
				className='relative z-30 flex items-center justify-center md:absolute md:inset-0 p-4 md:p-10 md:flex md:items-center md:justify-center mb-16 md:mb-0 mt-24 md:mt-0'
			>
				<div className='w-full flex justify-end'>
					{OperationRooms[0].content}
				</div>
			</div>
		</section>
	)
}
