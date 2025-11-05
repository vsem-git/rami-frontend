import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useEffect, useRef } from 'react'
import { POPUP_NAMES } from '../constants/popupNames'
import { CardModal } from './CardModal'
import { usePopup } from './PopupContext'
import close from '/plus.svg'

export const DoctorCardModal = () => {
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const scrollbarRef = useRef<HTMLDivElement>(null)
	const thumbRef = useRef<HTMLDivElement>(null)
	const { isOpen, closePopup } = usePopup()

	const isModalOpen = isOpen(POPUP_NAMES.DOCTOR_CARD)

	// Функция для обновления кастомного скроллбара
	const updateScrollbar = () => {
		if (!contentRef.current || !thumbRef.current) return

		const { scrollTop, scrollHeight, clientHeight } = contentRef.current
		const trackHeight = clientHeight - 40 // Отступы сверху и снизу
		const thumbHeight = Math.max(
			(clientHeight / scrollHeight) * trackHeight,
			40
		)
		const thumbPosition =
			(scrollTop / (scrollHeight - clientHeight)) *
				(trackHeight - thumbHeight) +
			20

		gsap.to(thumbRef.current, {
			height: thumbHeight,
			y: thumbPosition,
			duration: 0.1,
			ease: 'power2.out',
		})
	}

	// Обработчик скролла
	const handleScroll = () => {
		updateScrollbar()
	}

	// Обработчик колеса мыши
	const handleWheel = (e: WheelEvent) => {
		if (!contentRef.current) return

		const smoother = ScrollSmoother.get()

		if (isModalOpen) {
			smoother?.paused(true)
			document.body.style.overflow = 'hidden'

			// Прокрутка контента модального окна
			e.preventDefault()
			contentRef.current.scrollTop += e.deltaY
		}
	}

	// Обработчик клика по треку скроллбара
	const handleTrackClick = (e: React.MouseEvent) => {
		if (!contentRef.current || !scrollbarRef.current) return

		const trackRect = scrollbarRef.current.getBoundingClientRect()
		const clickY = e.clientY - trackRect.top - 20 // Минус отступ
		const trackHeight = trackRect.height - 40
		const clickPercentage = clickY / trackHeight

		const { scrollHeight, clientHeight } = contentRef.current
		const maxScroll = scrollHeight - clientHeight
		const newScrollTop = clickPercentage * maxScroll

		contentRef.current.scrollTo({
			top: newScrollTop,
			behavior: 'smooth',
		})
	}

	// Drag для скроллбара
	const handleThumbDrag = (e: React.MouseEvent) => {
		e.preventDefault()
		if (!contentRef.current || !scrollbarRef.current || !thumbRef.current)
			return

		const startY = e.clientY
		const startScrollTop = contentRef.current.scrollTop
		const { scrollHeight, clientHeight } = contentRef.current
		const maxScroll = scrollHeight - clientHeight
		const trackHeight = scrollbarRef.current.clientHeight - 40

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const deltaY = moveEvent.clientY - startY
			const scrollPercentage = deltaY / trackHeight
			const newScrollTop = startScrollTop + scrollPercentage * maxScroll

			contentRef.current!.scrollTop = Math.max(
				0,
				Math.min(maxScroll, newScrollTop)
			)
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	useEffect(() => {
		if (!modalRef.current || !contentRef.current) return

		const smoother = (window as any).ScrollSmoother?.get()

		if (isModalOpen) {
			smoother?.paused(true)

			// Разрешаем скролл на body для мобильных устройств
			document.body.style.overflow = 'auto'
			// Добавляем скролл для контента модалки
			contentRef.current.style.overflowY = 'auto'
			contentRef.current.style.maxHeight = '100vh'

			// Добавляем обработчики
			contentRef.current.addEventListener('scroll', handleScroll)
			contentRef.current.addEventListener('wheel', handleWheel, {
				passive: false,
			})

			// Инициализируем скроллбар после появления контента
			setTimeout(updateScrollbar, 100)

			gsap.set(modalRef.current, { display: 'flex' })
			const tl = gsap.timeline()

			tl.to(modalRef.current, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in',
			})

			tl.fromTo(
				contentRef.current,
				{ y: 50, opacity: 0, scale: 0.9 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
				'-=0.2'
			)

			// Анимация появления скроллбара
			tl.fromTo(
				scrollbarRef.current,
				{ opacity: 0, x: 20 },
				{ opacity: 1, x: 0, duration: 0.3 },
				'-=0.2'
			)
		} else {
			// Восстанавливаем нормальное состояние
			document.body.style.overflow = ''
			if (contentRef.current) {
				contentRef.current.style.overflowY = ''
				contentRef.current.style.maxHeight = ''
			}

			// Убираем обработчики
			contentRef.current?.removeEventListener('scroll', handleScroll)
			contentRef.current?.removeEventListener('wheel', handleWheel)

			smoother?.paused(false)

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
			contentRef.current?.removeEventListener('scroll', handleScroll)
			contentRef.current?.removeEventListener('wheel', handleWheel)
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
			<div className='relative w-full h-full max-w-7xl mx-auto flex'>
				{/* Основной контент */}
				<div
					ref={contentRef}
					className='w-full h-full bg-white z-[999] p-6 md:p-10 overflow-y-auto relative'
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

					<div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 mt-10'>
						<CardModal />
						<CardModal />
						<CardModal />
						<CardModal />
					</div>

					<div className='h-10 md:h-20'></div>
				</div>

				{/* Кастомный скроллбар */}
				<div
					ref={scrollbarRef}
					className='absolute right-4 top-10 bottom-10 w-2 bg-gray-200 rounded-full opacity-0 cursor-pointer z-[1000]'
					onClick={handleTrackClick}
				>
					<div
						ref={thumbRef}
						className='absolute w-full bg-gray-600 rounded-full cursor-grab active:cursor-grabbing transition-colors hover:bg-gray-800'
						onMouseDown={handleThumbDrag}
						style={{ top: '20px', height: '40px' }}
					/>
				</div>
			</div>
		</div>
	)
}
