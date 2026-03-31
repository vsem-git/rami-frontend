import { gsap } from 'gsap'
import { ScrollSmoother as ScrollSmootherClass } from 'gsap/ScrollSmoother'
import { useEffect, useRef } from 'react'
import { POPUP_NAMES } from '../constants/popupNames'
import type { Doctor, ExperienceItem, EducationItem } from '../shared/types/doctor'
import { CardModal } from './CardModal'
import { usePopup } from './PopupContext'
import close from '/plus.svg'

gsap.registerPlugin(ScrollSmootherClass)

export const DoctorCardModal = ({
	modalResults,
	modalProfessionalDev,
	modalEducation,
	onSelect,
}: {
	modalResults: Doctor['modal_result']
	modalProfessionalDev: ExperienceItem[]
	modalEducation: EducationItem[]
	onSelect: (item: any) => void
}) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const { isOpen, closePopup } = usePopup()

	const isModalOpen = isOpen(POPUP_NAMES.DOCTOR_CARD)

	const handleWheel = (e: WheelEvent) => {
		if (!contentRef.current) return

		const { scrollTop, scrollHeight, clientHeight } = contentRef.current
		const isAtTop = scrollTop === 0
		const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1

		if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
			e.preventDefault()
		}
	}

	useEffect(() => {
		if (!modalRef.current || !contentRef.current) return

		const contentElement = contentRef.current
		const smoother = ScrollSmootherClass.get()

		if (isModalOpen) {
			document.body.style.overflow = 'hidden'
			smoother?.paused(true)

			contentElement.addEventListener('wheel', handleWheel, {
				passive: false,
			})

			gsap.set(modalRef.current, { display: 'flex' })

			const tl = gsap.timeline()
			tl.to(modalRef.current, {
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out',
			})
			tl.fromTo(
				contentRef.current,
				{ y: 50, opacity: 0, scale: 0.9 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
				'-=0.2'
			)
		} else {
			document.body.style.overflow = ''
			smoother?.paused(false)

			contentElement.removeEventListener('wheel', handleWheel)

			const tl = gsap.timeline()
			tl.to(contentRef.current, {
				y: 50,
				opacity: 0,
				scale: 0.9,
				duration: 0.4,
				ease: 'power2.in',
			})
			tl.to(modalRef.current, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in',
			})
			tl.set(modalRef.current, { display: 'none' })
		}

		return () => {
			contentElement.removeEventListener('wheel', handleWheel)
			smoother?.paused(false)
		}
	}, [isModalOpen])

	const handleClose = () => {
		closePopup(POPUP_NAMES.DOCTOR_CARD)
	}

	if (!isModalOpen && !modalRef.current) {
		return null
	}

	const hasResults = modalResults && modalResults.length > 0
	const hasProfessionalDev = modalProfessionalDev && modalProfessionalDev.length > 0
	const hasEducation = modalEducation && modalEducation.length > 0

	return (
		<div
			ref={modalRef}
			className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/50 z-[9999] opacity-0'
			onClick={handleClose}
		>
			<div
				ref={contentRef}
				className='w-full h-full bg-white z-[999] p-6 md:p-10 overflow-y-auto'
				onClick={e => e.stopPropagation()}
			>
				<div className='w-full flex items-center justify-between mb-8'>
					<h2 className='text-[28px] text-[#1D1D1D] uppercase font-normal'>
						Информация о враче
					</h2>
					<button
						className='w-16 h-16 flex items-center justify-center border border-[#1D1D1D1A] rounded-full cursor-pointer hover:bg-gray-50 transition-colors'
						onClick={handleClose}
					>
						<img
							src={close}
							alt='close'
							className='w-7 h-7 rotate-45 transition-transform hover:rotate-90 grayscale contrast-200'
						/>
					</button>
				</div>

				{/* Результаты */}
				{hasResults && (
					<div className='mb-12'>
						<h3 className='text-xl text-[#1D1D1D] uppercase font-normal mb-6'>
							Результаты
						</h3>
						<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6'>
							{modalResults.map((item, index) => (
								<CardModal
									key={item.id}
									item={item}
									index={index}
									onSelect={() => onSelect(item)}
								/>
							))}
						</div>
					</div>
				)}

				{/* Опыт работы */}
				{hasProfessionalDev && (
					<div className='mb-12'>
						<h3 className='text-xl text-[#1D1D1D] uppercase font-normal mb-6'>
							Опыт работы
						</h3>
						<div className='space-y-4'>
							{modalProfessionalDev.map((item, index) => (
								<div
									key={index}
									className='bg-[#f8f7f6] p-5 rounded-lg border border-black/8'
								>
									{item.year && (
										<span className='inline-block text-[10px] font-semibold uppercase tracking-wider text-[#691C32] bg-[#691C32]/10 px-2 py-1 rounded mb-2'>
											{item.year}
										</span>
									)}
									<p className='text-[13px]/[155%] text-[#1D1D1D] font-normal uppercase'>
										{Array.isArray(item.description)
											? item.description.join(', ')
											: item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Образование */}
				{hasEducation && (
					<div>
						<h3 className='text-xl text-[#1D1D1D] uppercase font-normal mb-6'>
							Образование
						</h3>
						<div className='space-y-4'>
							{modalEducation.map((item, index) => (
								<div
									key={index}
									className='bg-[#f8f7f6] p-5 rounded-lg border border-black/8'
								>
									{'year' in item && item.year && (
										<span className='inline-block text-[10px] font-semibold uppercase tracking-wider text-[#691C32] bg-[#691C32]/10 px-2 py-1 rounded mb-2'>
											{item.year}
										</span>
									)}
									<p className='text-[13px]/[155%] text-[#1D1D1D] font-normal uppercase mb-3'>
										{item.description}
									</p>
									{'specializations' in item && item.specializations && item.specializations.length > 0 && (
										<div className='flex flex-wrap gap-2'>
											{item.specializations.map((spec, specIndex) => (
												<span
													key={specIndex}
													className='text-[9px] px-2 py-1 rounded border border-black/12 bg-white text-black/50'
												>
													{spec}
												</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
