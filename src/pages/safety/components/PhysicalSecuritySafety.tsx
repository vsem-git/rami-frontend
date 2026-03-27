import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const PhysicalSecuritySafety = () => {
	const sectionRef = useRef<HTMLDivElement>(null)
	const scrollAreaRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLHeadingElement>(null)
	const itemsRefs = useRef<(HTMLDivElement | null)[]>([])
	const descriptionsRefs = useRef<(HTMLParagraphElement | null)[]>([])
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768)
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	useEffect(() => {
		if (isMobile) return

		const is1280 = window.innerWidth <= 1280

		if (
			!sectionRef.current ||
			!scrollAreaRef.current ||
			!textRef.current ||
			!itemsRefs.current.length
		)
			return

		// Создаем pin
		ScrollTrigger.create({
			trigger: sectionRef.current,
			start: 'top top',
			end: '+=600%',
			pin: true,
			scrub: 1,
			anticipatePin: 1,
		})

		// Основная временная шкала
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: 'top top',
				end: '+=600%',
				scrub: 1,
			},
		})

		// Начальные состояния
		itemsRefs.current.forEach((item, i) => {
			if (!item) return
			const h2 = item.querySelector('h2')
			const h1 = item.querySelector('h1')
			const desc = descriptionsRefs.current[i]

			if (desc)
				gsap.set(desc, {
					maxHeight: 0,
					opacity: 0,
					overflow: 'hidden',
				})
			if (h2) gsap.set(h2, { fontSize: is1280 ? '12px' : '18px' })
			if (h1) gsap.set(h1, { fontSize: '24px' })
			gsap.set(item, { opacity: 0.7 })
		})

		gsap.set([scrollAreaRef.current, textRef.current], {
			autoAlpha: 0,
			y: 30,
		})

		// Анимация появления контейнера и текста
		tl.to([scrollAreaRef.current, textRef.current], {
			autoAlpha: 1,
			y: 0,
			duration: 6,
			ease: 'power2.out',
		})

		// Анимация для каждого элемента
		itemsRefs.current.forEach((item, i) => {
			if (!item) return
			const h4 = item.querySelector('h4')
			const h3 = item.querySelector('h3')
			const h1 = item.querySelector('h1')
			const desc = descriptionsRefs.current[i]

			const numberBig = is1280 ? '72px' : '120px'

			tl.to(item, { opacity: 1, duration: 5 }, '+=0.7')
				.to(h4, { opacity: 0, duration: 5 }, '<')
				.to(h3, { opacity: 1, duration: 5 }, '<')
				.to(h1, { fontSize: numberBig, duration: 5 }, '<')
				.to(desc, { maxHeight: 50, opacity: 1, duration: 5 }, '<')
				.to(desc, { maxHeight: 0, opacity: 0, duration: 5 }, '+=1.2')
				.to(h4, { opacity: 1, duration: 5 }, '<')
				.to(h3, { opacity: 0, duration: 5 }, '<')
				.to(h1, { fontSize: '24px', duration: 5 }, '<')
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [isMobile])

	if (isMobile) {
		return (
			<div
				className='flex medical-wrap  px-4 bg-[#691C32] text-white min-h-screen gap-8 pt-16'
				style={{
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<img
					src='/safety-screen/bg5.webp'
					alt='Security'
					className='object-cover medical-image-ph '
				/>

				<div className='flex flex-col gap-4 w-full'>
					<h2 className='text-xl  uppercase mb-2'>ФИЗИЧЕСКАЯ БЕЗОПАСНОСТЬ</h2>

					{[
						'Организация охраны на объектах',
						'Круглосуточное видеонаблюдение',
						'Контроль доступа: электронные замки и биометрические системы',
						'Защита периметра и закрытой парковки',
						'Непересекающиеся маршруты пациентов внутри клиники',
						'Отдельный вход для сохранения анонимности',
					].map((title, i) => (
						<div key={i} className='border-t border-[#FFFFFF33] pt-8 pb-6'>
							<div className='flex flex-col gap-2'>
								<div className='flex items-center justify-between '>
									<h3 className='text-[15px] uppercase max-w-[288px]'>
										{title}
									</h3>
									<span className='text-[#FFFFFF4D] text-[32px] sm:text-[44px]'>
										{`0${i + 1}`}
									</span>
								</div>
								<p className='text-[11px] text-[#FFFFFFBF] uppercase leading-snug max-w-[288px]'>
									Только авторизованные пользователи могут получать доступ к
									информации
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div
			ref={window.innerWidth >= 768 ? sectionRef : undefined}
			className='relative w-full h-screen p-4 overflow-hidden'
			style={{
				backgroundImage:
					'linear-gradient(180deg, rgba(29, 29, 29, 0.8) 0%, rgba(29, 29, 29, 0.4) 50%, rgba(29, 29, 29, 0.8) 100%), url("/safety-screen/bg5.webp")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div
				ref={window.innerWidth >= 768 ? scrollAreaRef : undefined}
				className='w-full max-w-[480px] xl:max-w-[752px] px-4 md:px-8 lg:px-16 py-5 h-full bg-[#FFFFFF1A] backdrop-blur-[80px] overflow-y-auto'
				style={{ overscrollBehavior: 'contain' }}
			>
				<div className='h-full flex flex-col justify-center relative'>
					{[
						{
							title: 'Организация охраны на объектах',
							number: '01',
							text: 'Только авторизованные пользователи могут получать доступ к информации',
						},
						{
							title: 'Круглосуточное видеонаблюдение',
							number: '02',
							text: 'Только авторизованные пользователи могут получать доступ к информации',
						},
						{
							title:
								'Контроль доступа: электронные замки и биометрические системы',
							number: '03',
							text: 'Только авторизованные пользователи могут получать доступ к информации',
						},
						{
							title: 'Защита периметра и закрытой парковки',
							number: '04',
							text: 'Только авторизованные пользователи могут получать доступ к информации',
						},
						{
							title: 'Непересекающиеся маршруты пациентов внутри клиники',
							number: '05',
							text: 'Только авторизованные пользователи могут получать доступ к информации',
						},
						{
							title: 'Отдельный вход для сохранения анонимности',
							number: '06',
							text: 'Только авторизованные пользователи могут получать доступ к информации',
						},
					].map((item, i) => (
						<div
							key={i}
							ref={el => {
								window.innerWidth >= 768
									? (itemsRefs.current[i] = el)
									: undefined
							}}
							className='border-t border-[#FFFFFF1A] py-4 cursor-pointer overflow-visible relative'
						>
							<div className='flex justify-between'>
								<div className='flex flex-col gap-6 relative max-w-[75%]'>
									<h2 className='text-white uppercase max-w-[90%] opacity-0'>
										{item.title}
									</h2>
									<h3 className='text-white absolute top-0 left-0 opacity-0 text-[16px] 2xl:text-[24px] uppercase'>
										{item.title}
									</h3>
									<h4 className='text-white absolute top-0 left-0 text-[12px] 2xl:text-[18px] uppercase max-w-[90%]'>
										{item.title}
									</h4>
									<p
										ref={el => {
											window.innerWidth >= 768
												? (descriptionsRefs.current[i] = el)
												: undefined
										}}
										className='text-[#FFFFFFBF] text-xs xl:text-base/[155%] relative -bottom-6 uppercase max-w-[444px]'
										style={{ overflow: 'hidden' }}
									>
										{item.text}
									</p>
								</div>
								<h1 className='text-[#FFFFFF80] uppercase'>{item.number}</h1>
							</div>
						</div>
					))}
				</div>
			</div>

			<h2
				ref={window.innerWidth >= 768 ? textRef : undefined}
				className='absolute bottom-10 right-10 text-2xl md:text-[24px] lg:text-4xl/[125%] text-white uppercase text-right opacity-0'
			>
				ФИЗИЧЕСКАЯ <br />
				БЕЗОПАСНОСТЬ
			</h2>
		</div>
	)
}
