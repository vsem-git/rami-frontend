import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { POPUP_NAMES } from '../constants/popupNames'
import { usePopup } from './PopupContext'
import close from '/plus.svg'

export const DoctorResultEffect = () => {
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const scrollbarRef = useRef<HTMLDivElement>(null)
	const thumbRef = useRef<HTMLDivElement>(null)
	const { isOpen, closePopup, openPopup } = usePopup()

	const isModalOpen = isOpen(POPUP_NAMES.DOCTOR_CARD_ID)

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

	const handleScroll = () => {
		updateScrollbar()
	}

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
			document.body.style.overflow = 'hidden'

			contentElement.addEventListener('scroll', handleScroll)
			contentElement.addEventListener('wheel', handleWheel, {
				passive: false,
			})

			setTimeout(updateScrollbar, 100)

			gsap.set(modalRef.current, { display: 'flex' })

			const tl = gsap.timeline()

			tl.to(modalRef.current, {
				opacity: 1,
				duration: 0.4,
				ease: 'power2.out',
			})

			tl.fromTo(
				contentRef.current,
				{
					y: 50,
					opacity: 0,
					scale: 0.9,
				},
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.6,
					ease: 'back.out(1.7)',
				},
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
			const tl = gsap.timeline()

			tl.to(contentRef.current, {
				y: 50,
				opacity: 0,
				scale: 0.9,
				duration: 0.4,
				ease: 'power2.in',
			})

			tl.to(
				scrollbarRef.current,
				{
					opacity: 0,
					x: 20,
					duration: 0.2,
				},
				'-=0.3'
			)

			tl.to(modalRef.current, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in',
			})

			tl.set(modalRef.current, { display: 'none' })

			tl.call(() => {
				document.documentElement.style.overflow = ''
				document.body.style.overflow = ''
			})

			contentElement.removeEventListener('scroll', handleScroll)
			contentElement.removeEventListener('wheel', handleWheel)
		}

		return () => {
			document.documentElement.style.overflow = ''
			document.body.style.overflow = ''
			contentElement.removeEventListener('scroll', handleScroll)
			contentElement.removeEventListener('wheel', handleWheel)
		}
	}, [isModalOpen])

	const handleClose = () => {
		closePopup(POPUP_NAMES.DOCTOR_CARD_ID)
	}

	const handleBack = () => {
		closePopup(POPUP_NAMES.DOCTOR_CARD_ID)
		openPopup(POPUP_NAMES.DOCTOR_CARD)
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
			<div className='relative w-full h-full  mx-auto flex'>
				<div
					ref={contentRef}
					className='w-full h-full bg-white z-[999] overflow-y-auto relative'
					onClick={e => e.stopPropagation()}
				>
					<div className='w-full flex items-start md:items-center justify-between px-6 md:px-10 pt-6 md:pt-10 '>
						<div>
							<button
								className='flex items-center gap-2 text-[#1D1D1D80] text-base font-semibold uppercase cursor-pointer mb-3'
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
							<h2 className='text-[16px] md:text-2xl xl:text-[28px] text-[#1D1D1D] uppercase font-normal'>
								Омоложение лица
							</h2>

							<p className='text-xs text-[#1D1D1D] font-normal leading-[155%] max-w-[480px] uppercase block md:hidden mt-3'>
								Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
								vulputate libero et velit interdum, ac aliquet odio mattis.
							</p>

							<div className='w-full flex justify-start flex-col sm:flex-row gap-2 sm:gap-10 xl:gap-20 text-[#1D1D1D] font-semibold text-[11px] xl:text-base leading-[155%] md:hidden mt-4 '>
								<button className='flex items-center gap-2 md:gap-3 cursor-pointer uppercase'>
									<span className='border-b border-[#1D1D1D26]'>
										Видео о работе
									</span>
									<img
										src='/play.svg'
										alt=''
										className='w-4 xl:w-6 h-3 xl:h-6 filter-icon'
									/>
								</button>
								<button className='flex items-center gap-2 xl:gap-3 cursor-pointer uppercase'>
									<span className='border-b border-[#1D1D1D26]'>
										Комментарий врача
									</span>
									<img
										src='/voice.svg'
										alt=''
										className='w-4 xl:w-6 h-4 xl:h-6 filter-icon'
									/>
								</button>
							</div>
						</div>

						<div className='w-auto md:w-1/2 flex items-center justify-end md:justify-between '>
							<p className='text-xs xl:text-base text-[#1D1D1D] font-normal leading-[155%] max-w-[300px] lg:max-w-[480px] uppercase md:block hidden'>
								Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
								vulputate libero et velit interdum, ac aliquet odio mattis.
							</p>
							<button
								className='w-10 md:w-12 xl:w-16 h-10 md:h-12 xl:h-16 flex items-center justify-center border border-[#1D1D1D1A] rounded-full cursor-pointer hover:bg-gray-50 transition-colors'
								onClick={handleClose}
							>
								<img
									src={close}
									alt='close'
									className='w-7 h-7 rotate-45 transition-transform hover:rotate-90 grayscale contrast-200'
								/>
							</button>
						</div>
					</div>

					<div className='w-full mt-5 sm:mt-10'>
						<div className='w-full flex flex-col sm:flex-row items-center'>
							<div className='w-full relative'>
								<img
									src='./doctor-screen/image-1.1 1.webp'
									alt=''
									className='w-full h-auto grayscale'
								/>
								<span className='absolute left-3 sm:left-6 top-3 md:top-6 text-[18px] md:text-2xl xl:text-[28px] font-normal text-white uppercase'>
									до
								</span>

								<div className='absolute bottom-5 xl:bottom-10 left-5 xl:left-10 w-full justify-start flex-col md:flex-row gap-2 md:gap-10 xl:gap-20 text-white font-semibold text-[11px] xl:text-base leading-[155%] md:flex hidden'>
									<button className='flex items-center gap-2 md:gap-3 cursor-pointer uppercase'>
										<span className='border-b border-[#FFFFFF26]'>
											Видео о работе
										</span>
										<img
											src='/play.svg'
											alt=''
											className='w-4 xl:w-6 h-3 xl:h-5'
										/>
									</button>
									<button className='flex items-center gap-2 xl:gap-3 cursor-pointer uppercase'>
										<span className='border-b border-[#FFFFFF26]'>
											Комментарий врача
										</span>
										<img
											src='/voice.svg'
											alt=''
											className='w-4 xl:w-6 h-4 xl:h-6'
										/>
									</button>
								</div>

								<button className='absolute bottom-6 right-1 w-10 md:w-12 xl:w-16 h-10 md:h-12 xl:h-16 border border-[#FFFFFF1A] rounded-full items-center justify-center cursor-pointer md:flex hidden'>
									<img
										src='/icon-r.svg'
										alt=''
										className='w-10 h-10 rotate-180'
									/>
								</button>

								<div className='absolute bottom-4 right-2 gap-4 md:hidden sm:flex hidden'>
									<span className='w-1.5 h-1.5 bg-white cursor-pointer rounded-full'></span>
									<span className='w-1.5 h-1.5 bg-[#FFFFFF4D] cursor-pointer rounded-full'></span>
								</div>
							</div>
							<div className='w-full relative'>
								<img
									src='./doctor-screen/image-1.webp'
									alt=''
									className='w-full h-auto'
								/>

								<button className='absolute bottom-6 left-1 w-10 md:w-12 xl:w-16 h-10 md:h-12 xl:h-16 border border-[#FFFFFF1A] rounded-full items-center justify-center cursor-pointer md:flex hidden'>
									<img src='/icon-r.svg' alt='' className='w-10 h-10' />
								</button>

								<div className='absolute bottom-4 sm:left-1 left-1/2 transform -translate-x-1/2 sm:translate-none flex gap-4 md:hidden'>
									<span className='w-1.5 h-1.5 bg-white sm:bg-[#FFFFFF4D] cursor-pointer rounded-full'></span>
									<span className='w-1.5 h-1.5 bg-[#FFFFFF4D] cursor-pointer rounded-full'></span>
									<span className='w-1.5 h-1.5 bg-[#FFFFFF4D] cursor-pointer rounded-full sm:hidden block'></span>
									<span className='w-1.5 h-1.5 bg-[#FFFFFF4D] cursor-pointer rounded-full sm:hidden block'></span>
								</div>

								<span className='absolute left-3 sm:left-6 top-3 md:top-6 text-[18px] md:text-2xl xl:text-[28px] font-normal text-white uppercase'>
									после
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
