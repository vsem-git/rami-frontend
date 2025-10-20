import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const PhysicalSecuritySafety = () => {
	const sectionRef = useRef<HTMLDivElement>(null)
	const scrollAreaRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLHeadingElement>(null)
	const itemsRefs = useRef<(HTMLDivElement | null)[]>([])
	const descriptionsRefs = useRef<(HTMLParagraphElement | null)[]>([])

	useEffect(() => {
		if (
			!sectionRef.current ||
			!scrollAreaRef.current ||
			!textRef.current ||
			!itemsRefs.current.length
		)
			return

		ScrollTrigger.create({
			trigger: sectionRef.current,
			start: 'top top',
			end: '+=600%',
			pin: true,
			scrub: 1,
			anticipatePin: 1,
		})

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: 'top top',
				end: '+=600%',
				scrub: true,
			},
		})

		itemsRefs.current.forEach((item, i) => {
			if (!item) return
			const h2 = item.querySelector('h2')
			const h1 = item.querySelector('h1')
			const desc = descriptionsRefs.current[i]

			if (desc) {
				gsap.set(desc, {
					maxHeight: 0,
					opacity: 0,
					overflow: 'hidden',
				})
			}

			if (h2) gsap.set(h2, { fontSize: '18px' })
			if (h1) gsap.set(h1, { fontSize: '24px' })
			gsap.set(item, { overflow: 'visible', opacity: 0.7 })
		})

		gsap.set([scrollAreaRef.current, textRef.current], {
			autoAlpha: 0,
			y: 30,
			willChange: 'transform, opacity',
		})

		tl.to([scrollAreaRef.current, textRef.current], {
			autoAlpha: 1,
			y: 0,
			duration: 6,
			ease: 'power2.out',
			willChange: 'transform, opacity',
		})

		itemsRefs.current.forEach((item, i) => {
			if (!item) return
			const h2 = item.querySelector('h2')
			const h1 = item.querySelector('h1')
			const desc = descriptionsRefs.current[i]

			tl.to(
				item,
				{
					opacity: 1,
					duration: 5,
					ease: 'power3.inOut',
				},
				'+=0.7'
			)
				.to(
					h2,
					{
						fontSize: '24px',
						duration: 5,
						ease: 'power3.inOut',
					},
					'<'
				)
				.to(
					h1,
					{
						fontSize: '120px',
						duration: 5,
						ease: 'power3.inOut',
					},
					'<'
				)
				.to(
					desc,
					{
						maxHeight: 500,
						opacity: 1,
						duration: 5,
						ease: 'power3.inOut',
					},
					'<'
				)
				.to(
					desc,
					{
						maxHeight: 0,
						opacity: 0,
						duration: 5,
						ease: 'power3.inOut',
					},
					'+=1.2'
				)
				.to(
					h2,
					{
						fontSize: '18px',
						duration: 5,
						ease: 'power3.inOut',
					},
					'<'
				)
				.to(
					h1,
					{
						fontSize: '24px',
						duration: 5,
						ease: 'power3.inOut',
					},
					'<'
				)
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [])

	return (
		<div
			ref={sectionRef}
			className='relative w-full h-screen p-4 overflow-hidden'
			style={{
				backgroundImage:
					'linear-gradient(180deg, rgba(29, 29, 29, 0.8) 0%, rgba(29, 29, 29, 0.4) 50%, rgba(29, 29, 29, 0.8) 100%), url("/safety-screen/bg5.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div
				ref={scrollAreaRef}
				className='w-full max-w-[752px] px-16 py-5 h-full bg-[#FFFFFF1A] backdrop-blur-[80px] overflow-y-auto'
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
								itemsRefs.current[i] = el
							}}
							className='border-t border-[#FFFFFF1A] py-4 cursor-pointer overflow-visible relative'
						>
							<div className='flex justify-between'>
								<div className='flex flex-col gap-6 relative'>
									<h2 className='text-lg text-white uppercase'>{item.title}</h2>
									<p
										ref={el => {
											descriptionsRefs.current[i] = el
										}}
										className='text-[#FFFFFFBF] text-base/[155%] uppercase max-w-[444px]'
										style={{ overflow: 'hidden' }}
									>
										{item.text}
									</p>
								</div>
								<h1 className='text-lg/[155%] text-[#FFFFFF80] uppercase'>
									{item.number}
								</h1>
							</div>
						</div>
					))}
				</div>
			</div>

			<h2
				ref={textRef}
				className='absolute bottom-10 right-10 text-4xl/[125%] text-white uppercase text-right opacity-0'
			>
				ФИЗИЧЕСКАЯ <br />
				БЕЗОПАСНОСТЬ
			</h2>
		</div>
	)
}
