import { useRef } from 'react'
import { usePopup } from './PopupContext'

export const ContactOpenBoxFooter = () => {
	const contactRef = useRef(null)
	const contactOpenRef = useRef(null)
	const contactContentRef = useRef(null)
	const { openPopup } = usePopup()

	return (
		<div
			ref={contactRef}
			className='w-full h-full flex justify-center items-center overflow-hidden'
		>
			<div
				className='group w-[560px] h-[315px] mx-4  z-0 bg-[#691C32]'
				ref={contactOpenRef}
			>
				<div className='w-full h-full flex justify-center items-center relative cursor-pointer'>
					<svg
						width='924'
						height='261'
						preserveAspectRatio='none'
						viewBox='0 0 924 261'
						className='absolute top-0 w-full h-1/2'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M0 0L462 260L924 0' stroke='white' strokeOpacity='0.3' />
					</svg>

					<div
						className='bg-white p-3 2xl:p-6 rounded-full group-hover:bg-[#691C32] group-hover:border group-hover:border-white transition-all z-10'
						onClick={() => openPopup('contact')}
					>
						<svg
							width='32'
							height='32'
							viewBox='0 0 32 32'
							className='h-[24px] w-[24px] 2xl:h-[32px] 2xl:w-[32px]'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								className='group-hover:stroke-white transition-all'
								d='M16 5V16M16 27V16M16 16H27H5'
								stroke='#691C32'
								strokeWidth='1.5'
							/>
						</svg>
					</div>

					<div
						className='absolute bottom-0 left-0 p-4 2xl:p-6 text-[11px] md:text-[13px] 2xl:text-[16px] text-white uppercase font-semibold cursor-pointer'
						onClick={() => openPopup('contact')}
					>
						<span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#ffffff] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
							Свяжитесь с нами
						</span>
					</div>
				</div>
			</div>

			<div
				className='absolute top-0 left-0 w-full h-full grid grid-cols-2 z-10 bg-rose-900 opacity-0 pointer-events-none'
				ref={contactContentRef}
			>
				<img src='/contact.webp' alt='contact' />
				<div className='flex justify-center items-center'>CONTACT</div>
			</div>
		</div>
	)
}
