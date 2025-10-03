import { forwardRef } from 'react'

interface DoctorCardProps {
	imageUrl: string
	buttonText?: string
	className?: string
}

const DoctorCard = forwardRef<HTMLDivElement, DoctorCardProps>(
	({ imageUrl, buttonText = 'Результаты', className }, ref) => {
		return (
			<div
				ref={ref}
				className={`w-full h-[608px] bg-no-repeat bg-cover cursor-pointer relative group ${className}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end p-6'>
					<button className='text-base text-white font-semibold uppercase cursor-pointer bg-transparent border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
						{buttonText}
					</button>
				</div>
			</div>
		)
	}
)

DoctorCard.displayName = 'DoctorCard'

export default DoctorCard
