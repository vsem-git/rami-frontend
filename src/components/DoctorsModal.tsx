import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { POPUP_NAMES } from '../constants/popupNames'
import { usePopup } from './PopupContext'
import close from '/plus.svg'

const SPECIALTIES_DATA = [
	{
		id: 1,
		image: '/doctors-screen/card3.png',
		title: 'Анестезиологи',
	},
	{
		id: 2,
		image: '/doctors-screen/card2.png',
		title: 'Терапевты',
	},
	{
		id: 3,
		image: '/doctors-screen/card1.png',
		title: 'Хирурги',
	},
]

export const DoctorsModal = () => {
	const modalRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const { isOpen, closePopup } = usePopup()

	const isModalOpen = isOpen(POPUP_NAMES.DOCTORS)

	useEffect(() => {
		if (!modalRef.current || !contentRef.current) return

		if (isModalOpen) {
			document.body.style.overflow = 'hidden'

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
		} else {
			document.body.style.overflow = ''

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
	}, [isModalOpen])

	const handleClose = () => {
		closePopup(POPUP_NAMES.DOCTORS)
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
					<h2 className='text-lg md:text-xl xl:text-[28px] text-[#1D1D1D] uppercase font-normal'>
						Другие направления
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

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 xl:gap-4 mt-10'>
					{SPECIALTIES_DATA.map(specialty => (
						<div
							key={specialty.id}
							className='relative w-full h-auto max-h-auto 2xl:max-h-[603px] aspect-[603/603] flex justify-start items-end bg-cover bg-no-repeat p-6'
							style={{ backgroundImage: `url("${specialty.image}")` }}
						>
							<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent' />
							<button className='relative flex items-center gap-2 text-white text-xs xl:text-base font-semibold leading-[155%] uppercase cursor-pointer z-10'>
								{specialty.title}
								<img
									src='/arrow (1).svg'
									alt=''
									className='rotate-180 -mt-1 opacity-50'
								/>
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
