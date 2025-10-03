import { useRef } from 'react'
import { DOCTOR } from '../../shared/data/doctor'
import { useDoctorAnimation } from './animations/useDoctorAnimation'

const WelcomeDoctor = () => {
	const sectionRef = useRef<HTMLElement>(null)
	const backgroundRef = useRef<HTMLDivElement>(null)
	const defaultContentRef = useRef<HTMLDivElement>(null)
	const doctorContentRef = useRef<HTMLDivElement>(null)

	useDoctorAnimation(
		sectionRef,
		backgroundRef,
		defaultContentRef,
		doctorContentRef
	)
	return (
		<section ref={sectionRef} className='relative h-screen overflow-hidden'>
			<div
				ref={backgroundRef}
				className='absolute inset-0 bg-cover bg-center'
				style={{
					backgroundImage: 'url(/doctor-screen/bg.jpg)',
					backgroundPosition: '50% 10%',
				}}
			/>

			<div
				className='absolute inset-0 z-10'
				style={{
					background:
						'linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.5) 50%, rgba(29, 29, 29, 0.5) 100%)',
				}}
			/>

			<div
				ref={defaultContentRef}
				className='relative z-20 min-h-screen flex flex-col justify-end p-10 border-b border-[#FFFFFF4D] pb-10 text-white'
			>
				<h1 className='text-[88px]/[114%] font-normal uppercase mb-10'>
					Серб Ирина
					<br />
					Анатольевна
				</h1>
				<div className='flex items-center'>
					<h3 className='text-[21px]/[155%] font-normal uppercase'>
						Главный врач RAMICLINIC RESIDENCE
					</h3>

					<div className='w-1.5 h-1.5 bg-white rounded-full mx-16' />
					<ul className='flex items-center'>
						<li className='flex items-center text-[21px]/[155%] font-normal uppercase cursor-pointer'>
							пластический хирург
							<div className='w-1.5 h-1.5 bg-white rounded-full mx-16' />
						</li>
						<li className='flex items-center text-[21px]/[155%] font-normal uppercase cursor-pointer'>
							врач высшей категории
						</li>
					</ul>
				</div>
			</div>

			<div
				ref={doctorContentRef}
				className='absolute inset-0 z-30 flex items-center justify-center p-10'
			>
				<div className='w-full flex justify-end'>{DOCTOR[0].content}</div>
			</div>
		</section>
	)
}

export default WelcomeDoctor
