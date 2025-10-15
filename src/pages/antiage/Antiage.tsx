import { useEffect, useRef, useState } from 'react'
import { ANTIAGE } from '../../shared/data/antiage'
import { useAntiageAnimation } from './animations/useAntiageAnimation'
import { useMobileTextAnimation } from './animations/useMobileTextAnimation'

interface AntiageItem {
	id: number
	content: React.ReactNode
}

export const Antiage = () => {
	const textRef = useRef<HTMLHeadingElement>(null)
	const sectionRef = useRef<HTMLDivElement>(null)
	const backgroundRef = useRef<HTMLDivElement>(null)
	const leftTextRef = useRef<HTMLHeadingElement>(null)
	const textRefMobile = useRef<HTMLHeadingElement>(null)

	const geneticPassportRef = useRef<HTMLHeadingElement>(null)
	const hormonesRef = useRef<HTMLHeadingElement>(null)
	const regenerativeMedicineRef = useRef<HTMLHeadingElement>(null)
	const cellularRejuvenationRef = useRef<HTMLHeadingElement>(null)

	const contentRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
		ANTIAGE.map(() => useRef<HTMLDivElement | null>(null))
	).current

	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => {
			window.removeEventListener('resize', checkScreenSize)
		}
	}, [])

	useAntiageAnimation(
		textRef,
		sectionRef,
		backgroundRef,
		leftTextRef,
		geneticPassportRef,
		hormonesRef,
		regenerativeMedicineRef,
		cellularRejuvenationRef,
		...contentRefs
	)

	useMobileTextAnimation(textRefMobile, isMobile)

	const firstBlock: AntiageItem = ANTIAGE[0]
	const remainingBlocks: AntiageItem[] = ANTIAGE.slice(1)

	return (
		<div
			ref={sectionRef}
			className='w-full h-auto md:h-[105vh] relative overflow-hidden bg-[url("/antiage-screen/anti-age.png")] bg-no-repeat bg-cover'
		>
			<div className='w-full h-[720px] sm:h-[640px] relative md:hidden bg-[#0c0807] overflow-hidden bg-[url("/antiage-screen/bg-mobile.png")] sm:bg-[url("/antiage-screen/anti-age.png")] bg-no-repeat bg-cover bg-center'>
				{isMobile && (
					<h1
						ref={textRefMobile}
						className='
							text-[64px]/[125%] font-normal uppercase whitespace-nowrap
							text-white mix-blend-difference
							absolute top-[5.5rem] right-0
							sm:top-auto sm:bottom-[-7rem]
							pointer-events-none
							z-20
						'
					>
						стратегия управления возрастом
					</h1>
				)}

				<div
					className="
						absolute hidden sm:block min-w-[600px] h-[100vh] will-change-transform
						bg-[url('/antiage-screen/image2.png')]
						bg-no-repeat bg-cover scale-[1]
					bg-size-anti

					"
				/>

				<div className='relative z-10 h-full flex flex-col items-end justify-end sm:justify-center pb-8 px-4 gap-16'>
					{isMobile && (
						<>
							<div className='space-y-6 text-white mt-24'>
								{firstBlock.content}
							</div>
						</>
					)}
				</div>
			</div>

			<div
				ref={backgroundRef}
				className="
    hidden md:block absolute w-full h-full min-w-[1200px]
    will-change-transform bg-[url('/antiage-screen/image2.png')] 
    bg-no-repeat bg-cover anti-age_bg
  "
			/>

			<h2
				ref={leftTextRef}
				className='
					hidden md:block text-[clamp(65px,3vw,96px)] font-normal uppercase whitespace-nowrap
					absolute top-[6rem] left-0
					text-[#1D1D1D4D] 
				'
			>
				#Антиэйдж
			</h2>

			<h3
				ref={geneticPassportRef}
				className='
					hidden md:block text-[clamp(24px,3vw,40px)] font-normal uppercase whitespace-nowrap
					absolute top-[50%] left-10
					text-[#FFFFFF99] 
					opacity-0 -translate-x-20
				'
			>
				#Генетический <br />
				паспорт
			</h3>

			<h3
				ref={hormonesRef}
				className='
					hidden md:block text-[clamp(36px,3vw,64px)]  font-normal uppercase whitespace-nowrap
					absolute top-[25%] text-anti
					text-[#FFFFFF4D] 
					opacity-0 scale-50
				'
			>
				#гормоны
			</h3>

			<h3
				ref={regenerativeMedicineRef}
				className='
					hidden md:block text-[32px]/[125%] font-normal uppercase whitespace-nowrap
					absolute top-[70%] left-10
					text-[#FFFFFFBF] 
					opacity-0 -translate-x-20
				'
			>
				#Регенеративная <br />
				Медицина
			</h3>

			<h3
				ref={cellularRejuvenationRef}
				className='
					hidden md:block text-[28px]/[125%] font-normal uppercase whitespace-nowrap
					absolute bottom-[11%] left-[21%]
					text-[#FFFFFFBF] 
					opacity-0 -translate-x-20
				'
			>
				#клеточное <br />
				омоложение
			</h3>

			<div className='flex flex-col items-end gap-16 my-16'>
				{remainingBlocks.map((item, index) => (
					<div
						key={item.id}
						ref={contentRefs[index + 1]}
						className={`
							space-y-10
							md:absolute md:bottom-0 md:right-8 lg:right-2.5 2xl:right-[110px] md:top-[35%]
							relative px-4 md:px-0
						`}
					>
						{item.content}
					</div>
				))}
			</div>

			{!isMobile && (
				<div
					ref={contentRefs[0]}
					className={`
						md:absolute md:bottom-0 md:right-8 lg:right-2.5 2xl:right-[110px] md:top-[35%]
						relative mt-10 px-4 md:px-0
					`}
				>
					{firstBlock.content}
				</div>
			)}

			{!isMobile && (
				<div
					ref={textRef}
					className='absolute -bottom-5 lg:bottom-5 right-0 w-full overflow-hidden mix-blend-difference text-white'
				>
					<div className='marquee-cosmetology flex whitespace-nowrap text-[clamp(3rem,8vw,10rem)] font-normal uppercase mix-blend-difference leading-[125%]'>
						<span className='px-4 md:px-6 xl:px-8'>
							ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
						</span>
					</div>
				</div>
			)}
		</div>
	)
}
