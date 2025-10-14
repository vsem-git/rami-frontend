import { useRef } from 'react'
import { DOCTOR } from '../../shared/data/doctor'
import { useDoctorAnimation } from './animations/useDoctorAnimation'

export const WelcomeDoctor: React.FC = () => {
	const sectionRef = useRef<HTMLElement | null>(null)
	const backgroundRef = useRef<HTMLDivElement | null>(null)
	const defaultContentRef = useRef<HTMLDivElement | null>(null)
	const doctorContentRef = useRef<HTMLDivElement | null>(null)

	useDoctorAnimation(
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
					className="relative w-full h-full md:absolute inset-0 bg-cover bg-center bg-[url('/doctor-screen/bg1.webp')] md:bg-[url('/doctor-screen/bg.webp')] flex items-end justify-center"
					style={{ backgroundPosition: '50% 8%' }}
					role='img'
				>
					<div
						className="block md:hidden w-[299px] h-[299px] bg-cover bg-center bg-[url('/doctor-screen/serb1.webp')]"
						style={{ backgroundPosition: '50% 10%' }}
						aria-hidden='true'
					/>
				</div>
			</div>

			<div
				className='absolute inset-0 z-10 hidden md:block'
				style={{
					background:
						'linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.5) 50%, rgba(29, 29, 29, 0.5) 100%)',
				}}
				aria-hidden='true'
			/>

			<div
				ref={defaultContentRef}
				className='relative z-20 min-h-auto md:min-h-screen flex flex-col justify-end p-6 xl:p-10 border-b border-[#FFFFFF4D] pb-10 text-[#1D1D1D] md:text-white mt-12 md:mt-0'
			>
				<h1 className='text-3xl md:text-5xl xl:text-7xl 2xl:text-8xl/[125%] font-normal uppercase mb-6 xl:mb-10'>
					Серб Ирина
					<br />
					Анатольевна
				</h1>
				<div className='flex items-center whitespace-nowrap'>
					<ul className='w-full flex flex-col items-start gap-1 xl:gap-0'>
						{[
							'Главный врач RAMICLINIC RESIDENCE',
							'пластический хирург',
							'врач высшей категории',
						].map((item, index) => {
							const borderClasses =
								index === 2
									? 'border-y border-[#1D1D1D1A] md:border-none'
									: 'border-t border-[#1D1D1D1A] md:border-none'
							return (
								<li
									key={item}
									className={`w-full md:w-auto flex items-center text-sm/[155%] xl:text-[21px]/[155%] font-normal uppercase cursor-pointer py-2 md:py-0 ${borderClasses}`}
								>
									<div className='w-1.5 h-1.5 bg-[#FFFFFF80] rounded-full mr-4 hidden md:block' />
									{item}
								</li>
							)
						})}
					</ul>
				</div>
			</div>

			<div
				ref={doctorContentRef}
				className='relative md:absolute inset-0 z-30 flex items-center justify-center p-6 xl:p-10'
			>
				<div className='w-full flex justify-start md:justify-end'>
					{DOCTOR[0].content}
				</div>
			</div>
		</section>
	)
}
