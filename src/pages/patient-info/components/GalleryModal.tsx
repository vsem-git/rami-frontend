import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { usePopup } from '../../../components/PopupContext'

export const GalleryModal = () => {
	const { isOpen, closePopup, getPopupData } = usePopup()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [shouldRender, setShouldRender] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const galleryData = getPopupData('licenseGallery')
	const images = galleryData?.images || []
	const initialIndex = galleryData?.initialIndex || 0

	useEffect(() => {
		if (isOpen('licenseGallery')) {
			setShouldRender(true)

			requestAnimationFrame(() => {
				document.body.style.overflow = 'hidden'

				const modalEl = modalRef.current
				const contentEl = contentRef.current

				if (modalEl) {
					gsap.set(modalEl, { opacity: 0, backdropFilter: 'blur(0px)' })
				}

				if (contentEl) {
					gsap.set(contentEl, { opacity: 0, scale: 0.9, y: 20 })
				}

				if (modalEl) {
					gsap.to(modalEl, {
						opacity: 1,
						backdropFilter: 'blur(5px)',
						duration: 0.4,
						ease: 'power2.out',
					})
				}

				if (contentEl) {
					gsap.to(contentEl, {
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 0.5,
						ease: 'back.out(1.4)',
						delay: 0.1,
					})
				}
			})
		} else if (shouldRender) {
			const modalEl = modalRef.current
			const contentEl = contentRef.current

			if (contentEl) {
				gsap.to(contentEl, {
					opacity: 0,
					scale: 0.9,
					y: 20,
					duration: 0.3,
					ease: 'power2.in',
				})
			}

			if (modalEl) {
				gsap.to(modalEl, {
					opacity: 0,
					backdropFilter: 'blur(0px)',
					duration: 0.25,
					ease: 'power2.in',
					delay: 0.1,
					onComplete: () => {
						setShouldRender(false)
						document.body.style.overflow = 'auto'
					},
				})
			}
		}
	}, [isOpen('licenseGallery'), shouldRender])

	useEffect(() => {
		if (isOpen('licenseGallery') && initialIndex !== undefined) {
			setCurrentIndex(initialIndex)
		}
	}, [isOpen('licenseGallery'), initialIndex])

	const goToPrevious = () => {
		setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const goToNext = () => {
		setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') handleClose()
		if (e.key === 'ArrowLeft') goToPrevious()
		if (e.key === 'ArrowRight') goToNext()
	}

	useEffect(() => {
		if (isOpen('licenseGallery')) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen('licenseGallery')])

	const handleClose = () => {
		const modalEl = modalRef.current
		const contentEl = contentRef.current

		if (contentEl) {
			gsap.to(contentEl, {
				opacity: 0,
				scale: 0.9,
				y: 20,
				duration: 0.3,
				ease: 'power2.in',
			})
		}

		if (modalEl) {
			gsap.to(modalEl, {
				opacity: 0,
				backdropFilter: 'blur(0px)',
				duration: 0.25,
				ease: 'power2.in',
				delay: 0.1,
				onComplete: () => {
					closePopup('licenseGallery')
					setShouldRender(false)
					document.body.style.overflow = 'auto'
				},
			})
		}
	}

	if (!shouldRender || !images.length) {
		return null
	}

	return (
		<div
			ref={modalRef}
			className='fixed inset-0 z-[999999] flex items-center justify-center bg-black/50'
			onClick={handleClose}
		>
			<button
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation()
					handleClose()
				}}
				className='absolute top-2 right-0 lg:right-2 flex items-center justify-center rounded-full cursor-pointer z-20 w-16 h-16 hover:scale-110 transition-transform duration-200'
				aria-label='Закрыть модальное окно'
			>
				<svg
					width='64'
					height='64'
					viewBox='0 0 48 48'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<rect
						x='0.5'
						y='0.5'
						width='47'
						height='47'
						rx='23.5'
						stroke='white'
						strokeOpacity='0'
					/>
					<path
						d='M30.75 17.25L24 24M17.25 30.75L24 24M24 24L17.25 17.25L30.75 30.75'
						stroke='white'
						strokeWidth='1.5'
					/>
				</svg>
			</button>

			<div
				ref={contentRef}
				className='absolute top-2 left-4 lg:left-6 text-white text-center mt-4 text-[18px] font-medium'
			>
				{currentIndex + 1} / {images.length}
			</div>

			<div
				className='relative max-w-6xl max-h-[90vh] w-full'
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			>
				<div className='relative'>
					<div className='relative overflow-hidden'>
						<img
							key={currentIndex} 
							src={images[currentIndex]}
							alt={`Лицензия ${currentIndex + 1}`}
							className='w-full h-auto max-h-[85vh] md:max-h-[80vh] lg:max-h-[90vh] object-contain mx-auto'
						/>
					</div>

					{images.length > 1 && (
						<>
							<button
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									goToPrevious()
								}}
								className='absolute left-1 md:left-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200 px-2.5 flex items-center justify-center md:w-auto bg-[#691C32]/90 md:bg-transparent'
							>
								<img
									src='/icon-r.svg'
									alt='Назад'
									className='w-6 	md:w-8 lg:w-12 rotate-180'
								/>
							</button>
							<button
								onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
									e.stopPropagation()
									goToNext()
								}}
								className='absolute right-1 md:right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200 px-2.5 flex items-center justify-center md:w-auto bg-[#691C32]/90 md:bg-transparent'
							>
								<img
									src='/icon-r.svg'
									alt='Вперёд'
									className='w-6 	md:w-8 lg:w-12'
								/>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}