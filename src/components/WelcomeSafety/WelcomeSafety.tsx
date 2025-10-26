import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef } from 'react'
import { SAFETY } from '../../shared/data/safety'
import { useDoctorAnimation } from './animations/useSafetyAnimation'

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother)

export const WelcomeSafety: React.FC = () => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const backgroundRef = useRef<HTMLDivElement | null>(null)
	const defaultContentRef = useRef<HTMLDivElement | null>(null)
	const doctorContentRef = useRef<HTMLDivElement | null>(null)

	useDoctorAnimation(
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef
	)

	const handleScrollToNext = () => {
		const nextSection = document.getElementById('medical-safety-section')
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
			className='relative h-auto md:h-screen overflow-hidden bg-[#691C32]'
			aria-label='Приветствие и информация о докторе'
		>
			<div
				aria-label='Фоновое изображение'
				className='w-full h-[640px] md:h-auto'
			>
				<div
					ref={backgroundRef}
					className="relative w-full h-full md:absolute inset-0 bg-cover bg-center bg-[url('/safety-screen/bg.webp')] flex items-end justify-center px-4 md:px-0"
					style={{
						backgroundPosition: '50% 8%',
						backgroundImage:
							window.innerWidth <= 768
								? "url('/safety-screen/bg.webp')"
								: "url('/safety-screen/bg.webp')",
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
					}}
					role='img'
				>
					<div className='w-full relative z-20 min-h-auto md:min-h-screen md:hidden flex flex-col justify-end text-white mb-3'>
						<div className='flex items-center justify-between flex-wrap gap-6'>
							<h1 className='text-[32px]/[125%] sm:text-[44px]/[125%] xl:text-7xl/[125%] 2xl:text-[120px]/[125%] font-normal uppercase'>
								Безопасность
							</h1>
							<button
								onClick={handleScrollToNext}
								className='w-10 md:w-16 h-10 md:h-16 flex items-center justify-center rounded-full border border-[#FFFFFF1A] bg-transparent cursor-pointer transition-transform hover:scale-105 focus:outline-none z-50 relative'
								aria-label='Прокрутить вниз к медицинской безопасности'
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
			</div>

			<div
				className='absolute inset-0 z-10 hidden md:block pointer-events-none'
				style={{
					background:
						'linear-gradient(180deg, rgba(29,29,29,0) 0%, rgba(29,29,29,0.5) 50%, rgba(29,29,29,0.5) 100%)',
				}}
				aria-hidden='true'
			/>

			<div
				ref={defaultContentRef}
				className='relative z-40 min-h-auto md:min-h-screen hidden md:flex flex-col justify-end text-[#1D1D1D] md:text-white px-5'
			>
				<div className='flex items-center justify-between gap-6'>
					<h1 className='text-[32px]/[125%] sm:text-[44px]/[125%] xl:text-7xl/[125%] 2xl:text-[120px]/[125%] font-normal uppercase'>
						Безопасность
					</h1>

					<button
						onClick={handleScrollToNext}
						className='w-16 h-16 flex items-center justify-center rounded-full border border-[#FFFFFF1A] bg-transparent cursor-pointer transition-transform hover:scale-105 focus:outline-none z-50 relative'
						aria-label='Прокрутить вниз к медицинской безопасности'
					>
						<img
							src='/icon-r.svg'
							alt='icon'
							className='w-10 h-10 rotate-90 pointer-events-none'
						/>
					</button>
				</div>
			</div>

			<div
				ref={doctorContentRef}
				className='relative md:absolute inset-0 z-30 flex items-center justify-center p-4 md:p-6 xl:p-10 my-20 md:my-0 pointer-events-none md:pointer-events-auto'
			>
				<div className='w-full flex justify-start md:justify-end'>
					{SAFETY[0].content}
				</div>
			</div>
		</section>
	)
}
