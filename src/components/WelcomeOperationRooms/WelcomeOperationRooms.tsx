import { useRef } from 'react'
import { OperationRooms } from '../../shared/data/operation-rooms'
import { useOperationRoomsAnimation } from './animations/useOperationRoomsAnimation'

export const WelcomeOperationRooms: React.FC = () => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const backgroundRef = useRef<HTMLDivElement | null>(null)
	const defaultContentRef = useRef<HTMLDivElement | null>(null)
	const doctorContentRef = useRef<HTMLDivElement | null>(null)

	useOperationRoomsAnimation(
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef
	)

	return (
		<section
			ref={sectionRef}
			className='relative h-auto md:h-screen overflow-hidden'
			aria-label='Приветствие и информация о докторе'
		>
			<div
				aria-label='Фоновое изображение'
				className='w-full h-[370px] md:h-auto'
			>
				<div
					ref={backgroundRef}
					className='relative w-full h-full md:absolute inset-0 bg-cover bg-center flex items-end justify-center'
					style={{
						backgroundPosition: '50% 8%',
						backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0.7) 0%, rgba(29, 29, 29, 0.3) 50%, rgba(29, 29, 29, 0.7) 100%), url('/operation-rooms/bg1.png')`,
						filter: 'grayscale(100%) brightness(1.2) contrast(1.05)',
					}}
					role='img'
				></div>
			</div>

			<div
				ref={defaultContentRef}
				className='relative z-20 min-h-auto md:min-h-screen flex flex-col justify-end text-white px-5 gap-4'
			>
				<h3 className='text-base leading-[130%] uppercase'>
					MEDICAL VISUAL SYSTEMS
				</h3>
				<h1 className='text-[24px]/[125%] sm:text-[44px]/[125%] xl:text-[72px]/[125%] 2xl:text-[88px]/[125%] font-normal uppercase'>
					УМНЫЕ ОПЕРАЦИОННЫЕ
				</h1>
			</div>

			<div
				ref={doctorContentRef}
				className='relative md:absolute inset-0 z-30 flex items-center justify-center p-6 xl:p-10 mt-10 md:mt-0'
			>
				<div className='w-full flex justify-start md:justify-end'>
					{OperationRooms[0].content}
				</div>
			</div>
		</section>
	)
}
