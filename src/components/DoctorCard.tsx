import { forwardRef } from 'react'

interface DoctorCardProps {
	imageUrl: string
	buttonText?: string
	className?: string
}

export const DoctorCard = forwardRef<HTMLDivElement, DoctorCardProps>(
	({ imageUrl, buttonText = 'Результаты', className }, ref) => {
		return (
			<div
				ref={ref}
				className={`w-full h-[608px] bg-no-repeat bg-cover cursor-pointer relative group overflow-hidden ${className}`}
				style={{ backgroundImage: `url(${imageUrl})` }}
			>
				<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end p-6'>
					<button className='flex items-center gap-3 text-base text-white font-semibold uppercase cursor-pointer bg-transparent border-none transform transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:scale-105 group-hover:gap-4'>
						{buttonText}
						<img
							src='/icon-r.svg'
							alt=''
							className='transform transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:scale-110'
						/>
					</button>
				</div>

				<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
			</div>
		)
	}
)
