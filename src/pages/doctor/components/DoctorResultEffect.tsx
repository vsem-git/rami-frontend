import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { POPUP_NAMES } from '../../../constants/popupNames'
import type { ModalResultItem } from '../../../shared/types/doctor'
import { usePopup } from '../../../components/PopupContext'
import close from '/plus.svg'

interface DoctorResultEffectProps {
	selectedItem: ModalResultItem
}

export const DoctorResultEffect = ({
	selectedItem,
}: DoctorResultEffectProps) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const thumbRef = useRef<HTMLDivElement>(null)
	const { isOpen, closePopup, openPopup } = usePopup()
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPlayingVideo, setIsPlayingVideo] = useState(false)
	const [isPlayingAudio, setIsPlayingAudio] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)

	const isModalOpen = isOpen(POPUP_NAMES.DOCTOR_CARD_ID)

	// Создаём массив изображений из before/after
	const images = selectedItem ? [selectedItem.before, selectedItem.after].filter(Boolean) as string[] : []

	const updateScrollbar = () => {
		if (!contentRef.current || !thumbRef.current) return
		const { scrollTop, scrollHeight, clientHeight } = contentRef.current
		const trackHeight = clientHeight - 40
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

	const handleScroll = () => updateScrollbar()

	const handleWheel = (e: WheelEvent) => {
		if (!contentRef.current) return
		const { scrollTop, scrollHeight, clientHeight } = contentRef.current
		const isAtTop = scrollTop === 0
		const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) < 1
		if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
			e.preventDefault()
		} else {
			e.preventDefault()
			contentRef.current.scrollTop += e.deltaY
		}
	}

	useEffect(() => {
		if (!modalRef.current || !contentRef.current) return
		const contentElement = contentRef.current
		if (isModalOpen) {
			document.documentElement.style.overflow = 'hidden'
			gsap.set(modalRef.current, { display: 'flex' })
			const tl = gsap.timeline()
			tl.to(modalRef.current, {
				opacity: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
			tl.fromTo(
				contentRef.current,
				{ y: 50, opacity: 0, scale: 0.95 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
				'-=0.2'
			)
			contentElement.addEventListener('scroll', handleScroll)
			contentElement.addEventListener('wheel', handleWheel, {
				passive: false,
			})
		} else {
			document.documentElement.style.overflow = ''
			contentElement.removeEventListener('scroll', handleScroll)
			contentElement.removeEventListener('wheel', handleWheel)
			const tl = gsap.timeline()
			tl.to(contentRef.current, {
				y: 50,
				opacity: 0,
				scale: 0.95,
				duration: 0.3,
				ease: 'power2.in',
			})
			tl.to(
				modalRef.current,
				{
					opacity: 0,
					duration: 0.2,
					ease: 'power2.in',
				},
				'-=0.1'
			)
			tl.set(modalRef.current, { display: 'none' })
		}
		return () => {
			if (contentRef.current) {
				contentRef.current.removeEventListener('scroll', handleScroll)
				contentRef.current.removeEventListener('wheel', handleWheel)
			}
		}
	}, [isModalOpen])

	const handleBack = () => {
		closePopup(POPUP_NAMES.DOCTOR_CARD_ID)
		openPopup(POPUP_NAMES.DOCTOR_CARD)
	}

	const handleClose = () => {
		closePopup(POPUP_NAMES.DOCTOR_CARD_ID)
	}

	if (!isModalOpen || !selectedItem || images.length === 0) return null

	const currentImage = images[currentIndex]
	const isBefore = currentIndex === 0
	const hasVideo = !!selectedItem.video
	const hasAudio = !!selectedItem.commentAudio

	const nextImage = () =>
		setCurrentIndex(prev =>
			prev + 1 < images.length ? prev + 1 : prev
		)
	const prevImage = () =>
		setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : 0))

	const handleOpenVideo = () => {
		if (selectedItem.video) {
			setIsPlayingVideo(true)
		}
	}

	const handleCloseVideo = () => {
		setIsPlayingVideo(false)
	}

	const handlePlayAudio = () => {
		if (selectedItem.commentAudio && audioRef.current) {
			if (isPlayingAudio) {
				audioRef.current.pause()
				setIsPlayingAudio(false)
			} else {
				audioRef.current.play()
				setIsPlayingAudio(true)
			}
		}
	}

	const handleAudioEnded = () => {
		setIsPlayingAudio(false)
	}

	return (
		<div
			ref={modalRef}
			className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/80 z-[9999] opacity-0'
			onClick={handleClose}
		>
			<div
				ref={contentRef}
				className='w-full max-w-5xl h-full max-h-[90vh] bg-white z-[999] overflow-y-auto relative rounded-lg shadow-2xl'
				onClick={e => e.stopPropagation()}
			>
				{/* Hidden audio element */}
				{selectedItem.commentAudio && (
					<audio
						ref={audioRef}
						src={selectedItem.commentAudio}
						onEnded={handleAudioEnded}
						onPause={() => setIsPlayingAudio(false)}
					/>
				)}

				{/* Header */}
				<div className='sticky top-0 z-10 bg-white border-b border-black/8 px-6 md:px-10 py-4 md:py-6 flex items-center justify-between'>
					<button
						className='flex items-center gap-2 text-[#1D1D1D80] text-sm md:text-base font-semibold uppercase cursor-pointer hover:text-[#1D1D1D] transition-colors'
						onClick={handleBack}
					>
						<img
							src='/arrow (1).svg'
							alt=''
							className='w-4 h-4'
							style={{
								filter:
									'invert(155%) sepia(69%) saturate(1012%) hue-rotate(207deg) brightness(140%) contrast(89%) opacity(0.5)',
							}}
						/>
						Назад
					</button>

					<button
						className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-[#1D1D1D1A] rounded-full cursor-pointer hover:bg-gray-50 transition-colors'
						onClick={handleClose}
					>
						<img
							src={close}
							alt='close'
							className='w-5 h-5 md:w-6 md:h-6 rotate-45 transition-transform hover:rotate-90 grayscale contrast-200'
						/>
					</button>
				</div>

				{/* Content */}
				<div className='px-6 md:px-10 py-6 md:py-8'>
					{selectedItem.description && (
						<h2 className='text-sm md:text-lg lg:text-xl text-[#1D1D1D] uppercase font-normal mb-6 md:mb-8 leading-relaxed'>
							{selectedItem.description}
						</h2>
					)}

					{/* Image with navigation */}
					<div className='relative w-full aspect-[4/5] md:aspect-[3/2] lg:aspect-[2/1] bg-black/5 rounded-lg overflow-hidden'>
						<img
							src={currentImage}
							alt={isBefore ? 'до' : 'после'}
							className='w-full h-full object-cover'
						/>
						<span className='absolute left-4 top-4 text-base md:text-xl lg:text-2xl font-normal text-white uppercase bg-black/40 px-3 py-1.5 rounded'>
							{isBefore ? 'до' : 'после'}
						</span>

						{/* Navigation arrows */}
						{images.length > 1 && (
							<>
								<button
									onClick={prevImage}
									disabled={currentIndex === 0}
									className={`absolute left-4 top-1/2 -translate-y-1/2
										w-10 h-10 md:w-12 md:h-12
										flex items-center justify-center
										border border-white/30 rounded-full
										cursor-pointer transition-all duration-300
										hover:bg-white/20 hover:border-white
										disabled:opacity-30 disabled:cursor-not-allowed
										bg-black/20 backdrop-blur-sm`}
								>
									<img
										src='/icon-r.svg'
										alt=''
										className='w-5 h-5 md:w-6 md:h-6 rotate-180 transition-transform'
									/>
								</button>

								<button
									onClick={nextImage}
									disabled={currentIndex === images.length - 1}
									className={`absolute right-4 top-1/2 -translate-y-1/2
										w-10 h-10 md:w-12 md:h-12
										flex items-center justify-center
										border border-white/30 rounded-full
										cursor-pointer transition-all duration-300
										hover:bg-white/20 hover:border-white
										disabled:opacity-30 disabled:cursor-not-allowed
										bg-black/20 backdrop-blur-sm`}
								>
									<img
										src='/icon-r.svg'
										alt=''
										className='w-5 h-5 md:w-6 md:h-6 transition-transform'
									/>
								</button>
							</>
						)}

						{/* Dots indicator */}
						{images.length > 1 && (
							<div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
								{images.map((_, i) => (
									<span
										key={i}
										className={`w-2 h-2 rounded-full transition-colors ${
											i === currentIndex ? 'bg-white' : 'bg-white/40'
										}`}
									/>
								))}
							</div>
						)}
					</div>

					{/* Кнопки видео и аудио */}
					{(hasVideo || hasAudio) && (
						<div className='flex justify-center gap-4 mt-6 pt-6 border-t border-black/8'>
							{hasVideo && (
								<button
									onClick={handleOpenVideo}
									className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm uppercase font-semibold transition-colors ${
										isPlayingVideo
											? 'bg-red-600 text-white'
											: 'bg-[#1D1D1D] text-white hover:bg-[#1D1D1D80]'
									}`}
								>
									<img
										src={isPlayingVideo ? '/pause.svg' : '/play.svg'}
										alt=''
										className='w-4 h-4'
									/>
									{isPlayingVideo ? 'Закрыть видео' : 'Видео о работе'}
								</button>
							)}
							{hasAudio && (
								<button
									onClick={handlePlayAudio}
									className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm uppercase font-semibold transition-colors ${
										isPlayingAudio
											? 'bg-red-600 text-white'
											: 'bg-[#1D1D1D] text-white hover:bg-[#1D1D1D80]'
									}`}
								>
									<img
										src={isPlayingAudio ? '/pause.svg' : '/voice.svg'}
										alt=''
										className='w-4 h-4'
									/>
									{isPlayingAudio ? 'Пауза' : 'Комментарий врача'}
								</button>
							)}
						</div>
					)}

					{/* Video modal overlay */}
					{isPlayingVideo && selectedItem.video && (
						<div
							className='fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center'
							onClick={handleCloseVideo}
						>
							<div className='relative w-full max-w-5xl max-h-[90vh] p-4'>
								<button
									onClick={handleCloseVideo}
									className='absolute -top-12 right-0 w-10 h-10 flex items-center justify-center border border-white/30 rounded-full cursor-pointer hover:bg-white/10 transition-colors'
								>
									<img
										src={close}
										alt='close'
										className='w-5 h-5 rotate-45 transition-transform hover:rotate-90'
									/>
								</button>
								<video
									src={selectedItem.video}
									className='w-full h-full max-h-[80vh] object-contain'
									controls
									autoPlay
								/>
							</div>
						</div>
					)}

					{/* Info text */}
					<p className='text-xs md:text-sm text-[#1D1D1D80] uppercase mt-4 text-center'>
						{currentIndex === 0 ? 'Фото до операции' : 'Фото после операции'}
					</p>
				</div>
			</div>
		</div>
	)
}
