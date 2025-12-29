import { gsap } from 'gsap'
import { ScrollSmoother as ScrollSmootherClass } from 'gsap/ScrollSmoother'
import { useEffect, useRef } from 'react'
import { POPUP_NAMES } from '../constants/popupNames'
import type { Doctor } from '../shared/types/doctor'
import { CardModal } from './CardModal'
import { usePopup } from './PopupContext'
import close from '/plus.svg'

gsap.registerPlugin(ScrollSmootherClass)

export const DoctorCardModal = ({
	modalResults,
	onSelect,
}: {
	modalResults: Doctor['modal_result']
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
				<div className='w-full flex items-center justify-between'>
					<h2 className='text-[28px] text-[#1D1D1D] uppercase font-normal'>
						Результаты
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

				<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mt-10 '>
					{modalResults?.map((item, index) => (
						<CardModal
							key={item.id}
							item={item}
							index={index}
							onSelect={() => onSelect(item)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
