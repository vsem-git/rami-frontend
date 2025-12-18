import { POPUP_NAMES } from '../constants/popupNames'
import { usePopup } from './PopupContext'

interface CardModalProps {
	item: {
		id: string | number
		images: string[]
		description?: string
	}
	index: number
	onSelect: (item: any) => void
}

export const CardModal = ({ item, index, onSelect }: CardModalProps) => {
	const { openPopup } = usePopup()

	const handleCardClick = () => {
		onSelect(item)
		openPopup(POPUP_NAMES.DOCTOR_CARD_ID)
	}

	return (
		<div
			className='relative w-full flex flex-col md:flex-row items-end cursor-pointer'
			onClick={handleCardClick}
		>
			<div className='flex w-full md:w-auto gap-2'>
				{item.images.slice(0, 2).map((img, i) => (
					<div
						key={i}
						className='relative w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4]'
					>
						<img src={img} alt='' className='w-full h-full object-cover' />
						<span className='absolute left-2 top-2 text-sm md:text-base font-normal text-white uppercase px-2 py-1'>
							{i === 0 ? 'до' : 'после'}
						</span>
					</div>
				))}
			</div>

			<div className='absolute left-2 bottom-2 flex items-center gap-2 text-sm md:text-base text-white font-semibold uppercase'>
				Работа {index + 1}
				<img
					src='/icon-r.svg'
					alt=''
					className='w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-500 ease-out'
				/>
			</div>
		</div>
	)
}
