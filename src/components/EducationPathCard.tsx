import { useState } from 'react'
import type {
	ModalCardEducationItem,
	ModalCardPathItem,
} from '../shared/types/doctor'

type ModalCardItem = ModalCardEducationItem | ModalCardPathItem

interface EducationPathCardProps {
	item: ModalCardItem
	index: number
	type: 'education' | 'surgeryPath'
}

export const EducationPathCard = ({
	item,
	index,
	type,
}: EducationPathCardProps) => {
	const [activeImage, setActiveImage] = useState<number>(0)

	const images: string[] = Array.isArray(item.images)
		? item.images
		: [item.images]
	const isEducation = type === 'education'

	const handleImageChange = (direction: 'prev' | 'next'): void => {
		setActiveImage(prev => {
			if (direction === 'next') {
				return prev === images.length - 1 ? 0 : prev + 1
			} else {
				return prev === 0 ? images.length - 1 : prev - 1
			}
		})
	}

	return (
		<div className='bg-white  mb-0 md:mb-5'>
			<div className='relative h-[100%] min-h-auto sm:min-h-[500px] 2xl:min-h-[700px] w-full '>
				<img
					src={images[activeImage]}
					alt={isEducation ? `Обучение ${index + 1}` : `Хирургия ${index + 1}`}
					className='w-full h-full object-cover'
				/>

				{images.length > 1 && (
					<>
						<button
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation()
								handleImageChange('next')
							}}
							className='absolute top-1/2 -translate-y-1/2 left-1
	w-10 md:w-12 xl:w-16 h-10 md:h-12 xl:h-16
	border border-[#FFFFFF1A] rounded-full
	items-center justify-center cursor-pointer md:flex hidden
	bg-black/0 hover:bg-black/30
	hover:border-[#FFFFFF80]
	transition-all duration-300'
						>
							<img
								src='/icon-r.svg'
								alt='Следующее изображение'
								className='w-10 h-10 rotate-180 transition-transform duration-300 hover:scale-110'
							/>
						</button>

						<button
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation()
								handleImageChange('prev')
							}}
							className='absolute top-1/2 -translate-y-1/2 right-1
	w-10 md:w-12 xl:w-16 h-10 md:h-12 xl:h-16
	border border-[#FFFFFF1A] rounded-full
	items-center justify-center cursor-pointer md:flex hidden
	bg-black/0 hover:bg-black/30
	hover:border-[#FFFFFF80]
	transition-all duration-300'
						>
							<img
								src='/icon-r.svg'
								alt='Предыдущее изображение'
								className='w-10 h-10 transition-transform duration-300 hover:scale-110'
							/>
						</button>

						<div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1'>
							{images.map((_: string, idx: number) => (
								<div
									key={idx}
									className={`w-2 h-2 rounded-full ${
										idx === activeImage ? 'bg-white' : 'bg-white/50'
									}`}
								/>
							))}
						</div>
					</>
				)}
			</div>

			<div className='p-4'>
				{item.year && (
					<h3 className='text-lg font-semibold text-gray-800 mb-2'>
						{item.year}
					</h3>
				)}

				{item.description && (
					<div className='space-y-2'>
						{Array.isArray(item.description) ? (
							item.description.map((desc: string | string[], i: number) => {
								if (Array.isArray(desc)) {
									return (
										<ul key={i} className='list-disc pl-5 space-y-1'>
											{desc.map((d: string, j: number) => (
												<li key={j} className='text-sm text-gray-600'>
													{d}
												</li>
											))}
										</ul>
									)
								} else {
									return (
										<p key={i} className='text-sm text-gray-600'>
											{desc}
										</p>
									)
								}
							})
						) : (
							<p className='text-sm text-gray-600'>{item.description}</p>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
