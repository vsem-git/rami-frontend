import { PlusIcon, type DoctorType } from '../pages/Doctors/Doctors'

interface DoctorCardProps {
	doctor: DoctorType
	index: number
	isClicked: boolean
	onCardClick: (index: number) => void
}

export const DoctorsCard: React.FC<DoctorCardProps> = ({
	doctor,
	index,
	isClicked,
	onCardClick,
}) => {
	const [image, video, specialties, lastName, firstName] = doctor
	const isActive = isClicked
	

	const specialtiesText = specialties.join(', ')

	return (
		<div
			className='group relative aspect-[448/598.4] bg-cover bg-center cursor-pointer'
			style={{ backgroundImage: `url(${image})` }}
			onClick={() => onCardClick(index)}
		>
			<video
				className={`absolute inset-0 w-full h-full object-cover saturate-0 opacity-0 transition-all duration-1000 ${
					isActive ? 'opacity-100' : 'lg:group-hover:opacity-100'
				}`}
				playsInline
				muted
				loop
				autoPlay
				preload='metadata'
				poster={image}
			>
				<source src={video.replace('.gif', '.webm')} type='video/webm' />
				<source src={video.replace('.gif', '.mp4')} type='video/mp4' />
			</video>

			<div
				className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent md:opacity-100 lg:opacity-0 transition-all duration-1000 ${
					isActive ? '!opacity-100' : 'lg:group-hover:opacity-100'
				}`}
			/>

			<div
				className={`absolute inset-0 w-full h-full md:opacity-100 lg:opacity-0 transition-all duration-1000 ${
					isActive ? '!opacity-100' : 'lg:group-hover:opacity-100'
				}`}
			>
				<div className='relative h-full w-full flex flex-col items-center text-center justify-end'>
					<button className='absolute top-0 right-0 m-1 sm:m-2 p-4 md:p-5 2xl:p-8 bg-[#691C32] cursor-pointer'>
						<PlusIcon className='text-white' />
					</button>
					<p className='text-white text-[11px] md:text-xs 2xl:text-lg mb-2 2xl:mb-3 px-4 uppercase'>
						{specialtiesText}
					</p>
					<p
						className={`uppercase text-[13px] md:text-sm 2xl:text-[21px] leading-[120%] mb-4 md:mb-6 2xl:mb-10 text-white md:translate-y-0 md:opacity-100 lg:translate-y-full lg:opacity-0 transition-all duration-1000 ${
							isActive
								? '!translate-y-0 !opacity-100'
								: 'lg:group-hover:translate-y-0 lg:group-hover:opacity-100'
						}`}
					>
						<span>{lastName}</span>
						<br />
						<span>{firstName}</span>
					</p>
				</div>
			</div>
		</div>
	)
}
