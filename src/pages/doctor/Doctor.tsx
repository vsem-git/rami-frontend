import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { DoctorAge } from '../../components/DoctorAge/DoctorAge'
import { DoctorCardsSection } from '../../components/DoctorCardsSection/DoctorCardsSection'
import { DoctorGallery } from '../../components/DoctorGallery/DoctorGallery'
import WelcomeDoctor from '../../components/welcome-doctor/WelcomeDoctor'
import mes from '../../shared/icons/mes.svg'

gsap.registerPlugin(ScrollTrigger)

export const Doctor = () => {
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!sectionRef.current) return

		gsap.fromTo(
			sectionRef.current,
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				duration: 4,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 80%',
					toggleActions: 'play none none none',
				},
			}
		)
	}, [])

	return (
		<>
			<WelcomeDoctor />
			<DoctorCardsSection />
			<section
				ref={sectionRef}
				className='w-full h-screen flex items-center justify-center px-10'
			>
				<div className='flex items-start gap-10'>
					<img src={mes} alt='mes' className='-mt-7' />
					<div className='space-y-6 max-w-[800px]'>
						<p className='text-[21px]/[155%] text-[#1D1D1D] font-normal uppercase'>
							Красота и жизнь нераздельно сплетены друг с другом, и хирург –
							лишь одна из нитей той непостижимой ткани, где сплелись солнечный
							свет, звездная пыль и неведомое чудо. Та радость и гордость,
							которые появляются в душе пациенток после пластической операции,
							достойны того, чтобы пройти этот путь. Их улыбки становятся ярче,
							глаза излучают особенный свет, а уверенность в себе транслируется
							всему окружению. Красота – это не просто слово. Это обещание
							счастья! Это сила, способная изменить мир к лучшему.
						</p>
						<button className='text-base font-semibold uppercase text-[#1D1D1D] cursor-pointer'>
							ЧИТАТЬ СТАТЬЮ ПОЛНОСТЬЮ
						</button>
					</div>
				</div>
			</section>
			<DoctorGallery />
			<DoctorAge />

			<div className='w-full h-screen px-10'>
				<video
					autoPlay
					muted
					playsInline
					className='w-full h-full object-cover'
				>
					<source src='/serb-short.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>
		</>
	)
}
