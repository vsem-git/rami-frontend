import { POPUP_NAMES } from '../constants/popupNames'
import { usePopup } from './PopupContext'

export const CardModal = () => {
	const { openPopup } = usePopup()

	const handleCardClick = () => {
		openPopup(POPUP_NAMES.DOCTOR_CARD_ID)
	}

	return (
		<div
			className='relative w-full flex items-end cursor-pointer'
			onClick={handleCardClick}
		>
			<div className='flex items-center'>
				<div className='relative'>
					<img src='./doctor-screen/image-1.1 1.webp' alt='' />
					<span className='absolute left-6 top-6 text-base font-normal text-white uppercase'>
						до
					</span>
				</div>
				<div className='relative'>
					<img src='./doctor-screen/image-1.webp' alt='' />
					<span className='absolute left-6 top-6 text-base font-normal text-white uppercase'>
						после
					</span>
				</div>
			</div>

			<div className='absolute left-6 bottom-4 flex items-center gap-3 text-base text-white font-semibold uppercase'>
				Работа 1
				<img
					src='/icon-r.svg'
					alt=''
					className='transform transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:scale-110'
				/>
			</div>
		</div>
	)
}
