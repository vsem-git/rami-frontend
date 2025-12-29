import { gsap } from 'gsap'
import { ScrollSmoother as ScrollSmootherClass } from 'gsap/ScrollSmoother'
import { useEffect, useRef } from 'react'
import { POPUP_NAMES } from '../constants/popupNames'
import { CardModal } from './CardModal'
import { EducationPathCard } from './EducationPathCard'
import { usePopup } from './PopupContext'
import close from '/plus.svg'

gsap.registerPlugin(ScrollSmootherClass)

export const UniversalModal = ({
	onSelect,
}: {
	onSelect: (item: any) => void
}) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const { isOpen, closePopup, getPopupData } = usePopup()

	const isModalOpen = isOpen(POPUP_NAMES.UNIVERSAL_MODAL)
	const modalData = getPopupData(POPUP_NAMES.UNIVERSAL_MODAL)

	const modalType = modalData?.type || 'results'

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

		if (isModalOpen && modalData) {
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
	}, [isModalOpen, modalData])

	const handleClose = () => {
		closePopup(POPUP_NAMES.UNIVERSAL_MODAL)
	}

	if (!isModalOpen) {
		return null
	}

	if (!modalData) {
		return null
	}

	const gridClasses =
		modalType === 'results'
			? 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6'
			: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'

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
					<h2 className='text-[24px] md:text-[28px] text-[#1D1D1D] uppercase font-normal'>
						{modalData.title || 'Информация'}
					</h2>
					<button
						className='min-w-16 h-16 flex items-center justify-center border border-[#1D1D1D1A] rounded-full cursor-pointer hover:bg-gray-50 transition-colors'
						onClick={handleClose}
					>
						<img
							src={close}
							alt='close'
							className='w-7 h-7 rotate-45 transition-transform hover:rotate-90 grayscale contrast-200'
						/>
					</button>
				</div>

				<div className={`w-full ${gridClasses} mt-10`}>
					{modalData.items?.length > 0 ? (
						modalData.items.map((item: any, index: number) => {
							if (modalType === 'results') {
								return (
									<CardModal
										key={item.id}
										item={item}
										index={index}
										onSelect={() => onSelect(item)}
									/>
								)
							} else {
								return (
									<EducationPathCard
										key={item.id}
										item={item}
										index={index}
										type={modalType as 'education' | 'surgeryPath'}
									/>
								)
							}
						})
					) : (
						<div className='col-span-full text-center py-10'>
							<p className='text-gray-500'>Нет данных для отображения</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
