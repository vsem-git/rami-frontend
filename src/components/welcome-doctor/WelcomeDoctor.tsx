import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { POPUP_NAMES } from '../../constants/popupNames'

import type { Doctor } from '../../shared/types/doctor'
import { usePopup } from '../PopupContext'
import { useDoctorAnimation } from './animations/useDoctorAnimation'

gsap.registerPlugin(ScrollToPlugin, ScrollSmoother)

export const WelcomeDoctor = ({ doctor }: { doctor: Doctor }) => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const backgroundRef = useRef<HTMLDivElement | null>(null)
	const defaultContentRef = useRef<HTMLDivElement | null>(null)
	const doctorContentRef = useRef<HTMLDivElement | null>(null)
	const { openPopup } = usePopup()

	useDoctorAnimation(
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef
	)

	const handleScrollToNext = () => {
		const nextSection = document.getElementById('next-section-doctor2')
		if (!nextSection) {
			console.log('Next section not found')
			return
		}

		const smoother = ScrollSmoother.get()
		if (smoother) {
			smoother.scrollTo(nextSection, true, 'top top')
		} else {
			nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	const handleOpenEducation = (
		e?: MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		e?.preventDefault()
		openPopup(POPUP_NAMES.DOCTORS_EDUCATION)
	}

	const handleOpenExperience = (
		e?: MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		e?.preventDefault()
		openPopup(POPUP_NAMES.DOCTORS_EXPERIENCE)
	}

	const isDesktop = window.innerWidth >= 768

	return (
		<section
			ref={sectionRef}
			className='relative h-auto md:h-screen overflow-hidden pv-0 md:pb-20'
			aria-label='Приветствие и информация о докторе'
		>
			<div
				aria-label='Фоновое изображение'
				className='w-full h-[380px] md:h-auto'
			>
				<div
					ref={backgroundRef}
					className={`relative w-full h-full md:absolute inset-0 bg-cover bg-center  flex items-end justify-center`}
					style={{
						backgroundPosition: '50% 8%',
						backgroundImage: isDesktop
							? `url(${doctor.welcome_block?.[0]?.bg})`
							: "url('/doctor-screen/bg-color.png')",
					}}
					role='img'
				>
					<div
						className='block md:hidden w-[299px] h-[299px] bg-cover bg-center '
						style={{
							backgroundPosition: '50% 10%',
							backgroundImage: `url(${doctor.welcome_block?.[0]?.bgMobile})`,
						}}
						aria-hidden='true'
					/>
				</div>
			</div>

			<div
				className='absolute inset-0 z-10 hidden md:block'
				style={{
					background:
						'linear-gradient(180deg, rgba(29, 29, 29, 0.3) 0%, rgba(29, 29, 29, 0.5) 100%)',
				}}
				aria-hidden='true'
			/>

			<button
				onClick={handleScrollToNext}
				className='absolute  bottom-10 right-10 w-16 h-16 hidden md:flex items-center justify-center rounded-full border border-[#FFFFFF1A] bg-transparent cursor-pointer transition-transform hover:scale-105 focus:outline-none z-50 '
				aria-label='Прокрутить вниз'
				style={{ zIndex: 100 }}
			>
				<img
					src='/icon-r.svg'
					alt='icon'
					className='w-10 h-10 rotate-90 pointer-events-none'
				/>
			</button>

			<div
				ref={defaultContentRef}
				className='relative z-20 min-h-auto md:min-h-screen flex flex-col justify-end p-6 xl:p-10 pb-0 md:pb-10 text-[#1D1D1D] md:text-white mt-4 sm:mt-6 md:mt-0'
			>
				<Link to={'/doctors'}>
					<button className='absolute top-[-128%] md:top-[15%] text-[11px] md:text-base text-white font-semibold flex items-center gap-2 uppercase cursor-pointer left-4'>
						<img src='/arrow (1).svg' alt='' className='w-4 h-4' /> Назад
					</button>
				</Link>

				<div className='flex items-end justify-between gap-6'>
					<div className='w-full'>
						{doctor.welcome_block?.[0]?.title}

						<div className='w-full flex items-center whitespace-nowrap'>
							<ul className='w-full flex flex-col items-start gap-1 xl:gap-0'>
								{doctor.specialties.map((item, index) => {
									const borderClasses =
										index === doctor.specialties.length - 1
											? 'border-y border-[#1D1D1D1A] md:border-none'
											: 'border-t border-[#1D1D1D1A] md:border-none'
									return (
										<li
											key={item}
											className={`w-full md:w-auto flex flex-row-reverse md:flex-row justify-between md:justify-start items-center text-sm/[155%] xl:text-[21px]/[155%] font-normal uppercase cursor-pointer py-2 md:py-0 ${borderClasses}`}
										>
											<div className='min-w-1.5 min-h-1.5 bg-[#1D1D1D26] md:bg-[#FFFFFF80] rounded-full mr-4' />
											{item}
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div
				ref={doctorContentRef}
				className='relative md:absolute inset-0 z-30 flex items-center justify-center p-6 xl:p-10 mt-10 md:mt-0'
			>
				<div className='w-full flex flex-col items-start md:items-end'>
					{doctor.welcome_block?.[0]?.description}
					<div className='w-full md:max-w-[616px] 2xl:max-w-[920px] flex justify-start gap-10 md:gap-20 text-[#1D1D1D] md:text-white font-semibold text-[11px] md:text-base leading-[155%] mt-6 md:mt-10'>
						<button
							className='flex items-center gap-1 md:gap-3 cursor-pointer'
							onClick={handleOpenExperience}
						>
							<span className='border-b border-[#1D1D1D26] md:border-[#FFFFFF26]'>
								Повышение квалификации
							</span>
							<img
								src='/plus-up.svg'
								alt=''
								className='w-4 md:w-6 h-4 md:h-6 filter-icon '
							/>
						</button>
						<button
							className='flex items-center gap-1 md:gap-3 cursor-pointer'
							onClick={handleOpenEducation}
						>
							<span className='border-b border-[#1D1D1D26] md:border-[#FFFFFF26]'>
								Образование
							</span>
							<img
								src='/plus-up.svg'
								alt=''
								className='w-4 md:w-6 h-4 md:h-6 filter-icon '
							/>
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
