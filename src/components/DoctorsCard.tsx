import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '../pages/Doctors/Doctors'
import type { Doctor } from '../shared/types/doctor'

interface DoctorCardProps {
	doctor: Doctor
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
	const navigate = useNavigate()

	const specialtiesText = doctor.specialties.join(', ')
	const isActive = isClicked

	const handleNavigate = () => {
		navigate(`/doctor/${doctor.id}`)
		onCardClick(index)
	}

	return (
		<div
			className='group relative aspect-[448/598.4] bg-cover bg-center cursor-pointer'
			style={{ backgroundImage: `url(${doctor.image})` }}
			onClick={handleNavigate}
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
				poster={doctor.image}
			>
				<source src={doctor.video.replace('.gif', '.webm')} type='video/webm' />
				<source src={doctor.video.replace('.gif', '.mp4')} type='video/mp4' />
			</video>

			<div
				className={`absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-1000 ${
					isActive ? 'opacity-100' : 'lg:group-hover:opacity-100'
				}`}
			/>

			<div
				className={`absolute inset-0 transition-all duration-1000 ${
					isActive ? 'opacity-100' : 'lg:opacity-0 lg:group-hover:opacity-100'
				}`}
			>
				<div className='relative h-full flex flex-col items-center justify-end text-center'>
					<button className='absolute top-2 right-2 p-4 bg-[#691C32]'>
						<PlusIcon className='text-white' />
					</button>

					<p className='text-white text-xs uppercase mb-2 px-4'>
						{specialtiesText}
					</p>

					<p className='uppercase text-sm text-white mb-6'>
						{doctor.lastName}
						<br />
						{doctor.firstName}
					</p>
				</div>
			</div>
		</div>
	)
}
