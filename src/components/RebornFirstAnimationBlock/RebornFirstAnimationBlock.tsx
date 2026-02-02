import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import SecondAnimationBlock from '../../components/SecondAnimationBlock/SecondAnimationBlock'
import { useScroll } from '../../pages/Home/ScrollContext'
import { useHeader } from '../HeaderContext'

// Swiper imports
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother)

const FirstAnimationBlock = () => {
	const { setHeaderColor } = useHeader()
	const { setScrollToClinic, setScrollToManifesto } = useScroll()
	const containerRef = useRef(null)
	const block1Ref = useRef(null)
	const block2Ref = useRef(null)
	const block2TextRef = useRef(null)
	const block2LogoRef = useRef(null)
	const block3Ref = useRef<React.RefObject<HTMLDivElement>>(null)
	const block4Ref = useRef(null)
	const block9Ref = useRef(null)
	const tlRef = useRef<gsap.core.Timeline | null>(null)

	useGSAP(() => {
		gsap.set(block2TextRef.current, { autoAlpha: 0 })
		gsap.set(block2LogoRef.current, { x: '-100%' })

		gsap.set(block4Ref.current, {
			opacity: 0,
			pointerEvents: 'none',
		})

		gsap.set(block9Ref.current, { y: '100%' })
		gsap.set('.firstblocktext', { opacity: 0 })

		ScrollTrigger.create({
			trigger: containerRef.current,
			start: 'top-=100 top',
			onEnter: () => setHeaderColor('#ffffff'),
			onLeaveBack: () => setHeaderColor('#000000'),
		})

		tlRef.current = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=950%',
				scrub: 1,
				pin: true,
				anticipatePin: 1,
				fastScrollEnd: true,
			},
		})

		tlRef.current.fromTo(
			'.firstblocktext',
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: 'power2.inOut' },
		)

		tlRef.current.addLabel('clinic')

		tlRef.current
			.to(
				[block1Ref.current],
				{ opacity: 0, duration: 1, ease: 'power2.inOut' },
				'>',
			)
			.call(() => setHeaderColor('#ffffff'))
			.call(() => setHeaderColor('#000000'))

		tlRef.current.to(block2LogoRef.current, {
			x: '0%',
			duration: 1,
			ease: 'power2.inOut',
		})
		tlRef.current.to(block2TextRef.current, { autoAlpha: 1, duration: 1 })

		tlRef.current
			.call(() => setHeaderColor('#000000'))
			.call(() => setHeaderColor('#ffffff'))
			.to(block2Ref.current, { autoAlpha: 0, duration: 1 })

		// Появление block4 с opacity 0 → 1
		tlRef.current.to(block4Ref.current, {
			opacity: 1,
			duration: 1,
			ease: 'power3.inOut',
			onUpdate: function () {
				// Как только opacity >= 0.5 — разрешаем взаимодействие
				if (this.targets()[0].style.opacity <= 0.5) {
					gsap.set(block4Ref.current, { pointerEvents: 'none' })
				}
				if (this.targets()[0].style.opacity >= 0.5) {
					gsap.set(block4Ref.current, { pointerEvents: 'auto' })
				}
			},
		})

		tlRef.current.to(block3Ref.current, { opacity: 0, duration: 1 })

		tlRef.current.to(block9Ref.current, {
			y: '0%',
			duration: 1,
			ease: 'power3.inOut',
		})

		tlRef.current
			.addLabel('manifesto')
			.call(() => setHeaderColor('#ffffff'), [], '-=0.5')
			.call(() => setHeaderColor('#000000'), [], '-=0.4')
	})

	const handleScrollToManifesto = () => {
		const tl = tlRef.current
		if (!tl) return
		const st = tl.scrollTrigger
		if (!st) return
		const progress = tl.labels['manifesto'] / tl.duration()
		const scrollPosition = st.start + progress * (st.end - st.start)
		gsap.to(window, {
			scrollTo: scrollPosition,
			duration: 1,
			scrub: false,
			ease: 'power2.inOut',
		})
	}

	const handleScrollToClinic = () => {
		const tl = tlRef.current
		if (!tl) return
		const st = tl.scrollTrigger
		if (!st) return
		const progress = tl.labels['clinic'] / tl.duration()
		const scrollPosition = st.start + progress * (st.end - st.start)
		gsap.to(window, {
			scrollTo: scrollPosition,
			duration: 1,
			scrub: false,
			ease: 'power2.inOut',
		})
	}

	useEffect(() => {
		setScrollToClinic(() => handleScrollToClinic)
		setScrollToManifesto(() => handleScrollToManifesto)

		return () => {
			setScrollToClinic(() => {})
			setScrollToManifesto(() => {})
		}
	}, [])

	return (
		<div
			className='min-h-screen will-change-transform relative overflow-hidden'
			ref={containerRef}
		>
			<div
				id='reborn-first-block'
				className="absolute top-0 left-0 w-full h-full bg-[url('/1slide.webp')] bg-cover bg-center z-50 pointer-events-none"
				ref={block1Ref}
				style={{ willChange: 'opacity' }}
			>
				<div
					className='relative h-full w-full flex justify-end items-end overflow-hidden'
					id='clinic'
				>
					<p className='firstblocktext pointer-events-none fixed top-[90px] md:bottom-0 text-[13px] md:text-sm 2xl:text-[21px] sm:top-1/2 sm:-translate-y-1/4 md:-translate-y-0 md:top-auto right-0 text-white m-6 xl:m-10 2xl:m-20 uppercase max-w-full  sm:max-w-[320px] 2xl:max-w-[480px] 2xl:tracking-wider 2xl:leading-8 z-10'>
						<span className='font-bold'>Новый проект</span> владельцев
						многопрофильной Клиники РАМИ Галины Резник и Мазена Хамуда – Клиника
						пластической хирургии и эстетической косметологии{' '}
						<span className='font-bold'>RAMIСLINIC RESIDENCE</span>
					</p>
					<div
						className='absolute w-[600px] h-[600px] -bottom-0 -right-10 bg-[#1D1D1D9D] blur-[5px] md:blur-[200px] hidden md:block'
						style={{ willChange: 'filter' }}
					/>
					<div
						className='absolute w-full md:w-[600px] h-[200px] md:h-[600px] right-0 md:-right-20 top-10 md:-top-30 bg-[#1D1D1D9D] blur-[30px] md:blur-[200px]'
						style={{ willChange: 'filter' }}
					/>
				</div>
			</div>
			<div>
					<div
					className='absolute top-0 left-0 w-full min-h-full bg-white flex flex-col-reverse lg:flex-row justify-between items-center smx:items-start lg:items-end z-40 overflow-hidden'
					ref={block2Ref}
					style={{ willChange: 'opacity' }}
				>
					<img
						src='/logo.svg'
						alt='logo'
						ref={block2LogoRef}
						className='w-full max-w-[340px] sm:max-w-[400px] smx:max-w-[500px] md:max-w-[570px] xl:max-w-[782px] 2xl:max-w-[1000px] object-contain'
						style={{ willChange: 'transform' }}
					/>
					<div className='w-full flex justify-center smx:justify-end lg:w-auto'>
						<p
							className='text-black mt-25 m-4 sm:m-10 sm:mt-25 uppercase text-[13px] md:text-sm 2xl:text-[21px] 2xl:max-w-[720px] md:max-w-[400px] sm:max-w-[400px] max-w-full'
							ref={block2TextRef}
							style={{ willChange: 'opacity' }}
						>
							<span className='mb-4 inline-block 2xl:mb-8 text-[20px] md:text-[24px] 2xl:text-[36px]'>
								RAMICLINIC RESIDENCE
							</span>
							<br />
							<span className='whitespace-normal'>клиника-резиденция</span>{' '}
							высокотехнологичной пластической хирургии и эстетической
							косметологии для искушенных пациентов, склонных к поддержанию
							индивидуальной красоты и внешней привлекательности с гарантией
							эталонных стандартов безопасности в медицине, полной анонимностью,
							сервисом и приватностью, достойными первых лиц государств
						</p>
					</div>
				</div>
			</div>
			<SecondAnimationBlock
				ref={block3Ref as unknown as React.RefObject<HTMLDivElement>}
			/>
			{/* <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/2slide.webp')] bg-cover bg-center z-30"
                ref={block3Ref}
                style={{ willChange: "opacity" }}
            >
                <div className="relative h-full w-full flex justify-start items-start md:items-center">
                    <div
                        className="absolute w-[600px] h-[600px] top-1/2 -translate-y-1/2 left-20 bg-[#1D1D1D]/50 blur-[5px] md:blur-[200px] hidden md:block"
                        style={{ willChange: "filter" }}
                        ref={block3BlurRef}
                    />
                    <div
                        className="absolute w-full md:w-[600px] h-[250px] md:h-[600px] right-0 md:-right-30 top-0 md:-top-40 bg-[#1D1D1D9D] blur-[80px] md:blur-[200px]"
                        style={{ willChange: "filter" }}
                    />
                    <p
                        className="text-white text-sm 2xl:text-[21px] ml-[24px] mt-[110px] sm:mt-[96px] md:ml-[120px] md:mt-0 xl:ml-[120px] 2xl:ml-[200px] max-w-[312px] sm:max-w-[288px] md:max-w-[360px] xl:max-w-[360px] 2xl:max-w-[560px] uppercase z-10"
                        ref={block3TextRef}
                        style={{ willChange: "opacity" }}
                    >
                        <span className="font-bold">Расположена</span> в
                        живописной и престижной локации Санкт-Петербурга – в
                        дельте Невы, на
                        <span className="font-bold"> Крестовском острове</span>,
                        в историческом особняке, окруженном старинным парком
                    </p>
                </div>
            </div> */}
			<div
				className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-30'
				ref={block4Ref}
				style={{ willChange: 'opacity' }}
			>
				<Swiper
					modules={[Autoplay, Navigation]}
					navigation={{
						nextEl: '.swiper-button-next-custom',
						prevEl: '.swiper-button-prev-custom',
					}}
					loop={true}
					speed={1200}
					allowTouchMove={false}
					className='w-full h-full relative'
				>
					<SwiperSlide>
						<div
							className='w-full h-full bg-cover bg-center'
							style={{
								backgroundImage: "url('/residence1.webp')",
							}}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className='w-full h-full bg-cover bg-center'
							style={{
								backgroundImage: "url('/residence2.webp')",
							}}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className='w-full h-full bg-cover bg-center'
							style={{
								backgroundImage: "url('/residence3.webp')",
							}}
						/>
					</SwiperSlide>

					{/* Стрелка ВЛЕВО */}
					<div className='swiper-button-prev-custom absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 cursor-pointer select-none'>
						<svg
							width='40'
							height='40'
							viewBox='0 0 40 40'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='w-10 h-10 md:w-14 md:h-14 opacity-70 hover:opacity-100 transition-opacity duration-300'
						>
							<circle
								cx='20'
								cy='20'
								r='19.5'
								stroke='white'
								strokeOpacity='0.8'
							/>
							<path
								d='M22 14L16 20L22 26'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>

					{/* Стрелка ВПРАВО */}
					<div className='swiper-button-next-custom absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 cursor-pointer select-none'>
						<svg
							width='40'
							height='40'
							viewBox='0 0 40 40'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='w-10 h-10 md:w-14 md:h-14 opacity-70 hover:opacity-100 transition-opacity duration-300'
						>
							<circle
								cx='20'
								cy='20'
								r='19.5'
								stroke='white'
								strokeOpacity='0.8'
							/>
							<path
								d='M18 14L24 20L18 26'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</Swiper>

				{/* Размытие сверху */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-black/30 rounded-full blur-[40px] pointer-events-none z-40'></div>
			</div>
			{/* 
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence2.webp')] bg-cover bg-center flex justify-center items-center z-40"
                ref={block5Ref}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-black/30 rounded-full blur-[40px] pointer-events-none"></div>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence3.webp')] bg-cover bg-center flex justify-center items-center z-30"
                ref={block6Ref}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-black/30 rounded-full blur-[40px] pointer-events-none"></div>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence4.webp')] bg-cover bg-center flex justify-center items-center z-20"
                ref={block7Ref}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-black/30 rounded-full blur-[40px] pointer-events-none"></div>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence5.webp')] bg-cover bg-center flex justify-center items-center z-10"
                ref={block8Ref}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-black/30 rounded-full blur-[40px] pointer-events-none"></div>
            </div> */}
			<div
				className="absolute top-0 left-0 w-full h-full bg-[url('/residence6.webp'),linear-gradient(90deg,rgba(242,235,236,1)0%,rgba(248,246,247,1)30%,rgba(246,244,244,1)100%)] [background-position:80%_100%,center] [background-size:_176%,cover] [background-repeat:no-repeat,no-repeat] md:bg-cover md:bg-center z-50"
				ref={block9Ref}
			>
				<div
					id='manifesto'
					className='relative w-full h-full flex justify-start pl-[16px] md:pl-[80px] xl:pl-[120px] 2xl:pl-[200px] items-start pt-[110px] sm:pt-[110px] md:pt-0 md:items-center'
				>
					<div>
						<div className='text-[#1D1D1D99] text-[20px] md:text-[24px] 2xl:text-[36px] uppercase mb-7'>
							манифест искренности
						</div>
						<div className='flex gap-6'>
							<img src='/quotes.webp' alt='' className='w-[80px] h-[66px]' />
							<p className='max-w-[264px] sm:max-w-[376px] 2xl:max-w-[640px] leading-[155%] mt-0 sm:mt-4 2xl:mt-10 uppercase text-[11px] md:text-xs 2xl:text-lg'>
								<span className='font-bold text-[#691C32]'>
									RAMICLINIC RESIDENCE
								</span>{' '}
								– проект, в котором, объединив накопленный опыт, компетенции,
								энергию и знания наших талантливых врачей, мы создали уникальную
								для России Клинику пластической хирургии и косметологии, чтобы
								внедрить и утвердить новые профессиональные стандарты
								эстетической медицины и сервиса в повседневную жизнь
							</p>
						</div>
					</div>
					<div className='uppercase absolute bottom-6 text-white right-6 md:right-[clamp(4.938rem,_-2.938rem_+_16.41vw,_16.75rem)]'>
						<p className='font-bold mb-1 text-sm 2xl:text-[21px]'>
							Галина Резник
						</p>
						<p className='text-xs 2xl:text-lg'>Генеральный директор</p>
					</div>
					<div className='absolute hidden sm:block sm:left-4 sm:bottom-6 md:bottom-auto md:left-auto md:top-32 md:right-8'>
						<img
							src='/ceo_logo.webp'
							alt=''
							width={228}
							height={218}
							className='w-[160px] h-[153px] 2xl:w-[228px] 2xl:h-[218px]'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FirstAnimationBlock
