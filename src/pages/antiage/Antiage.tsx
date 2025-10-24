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
	const specialBackgroundRef = useRef<HTMLHeadingElement>(null)

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
		specialBackgroundRef,
		...contentRefs
	)

	useMobileTextAnimation(textRefMobile, isMobile)

	const firstBlock: AntiageItem = ANTIAGE[0]
	const remainingBlocks: AntiageItem[] = ANTIAGE.slice(1)

	return (
		<div
			ref={sectionRef}
			className='w-full h-auto md:h-[105vh] relative overflow-hidden bg-[#1D1D1D] md:bg-[url("/antiage-screen/anti-age.png")] bg-no-repeat bg-cover '
		>
			<div
				ref={specialBackgroundRef}
				className="absolute top-0 left-0 min-w-[2000px] h-full bg-[url('/antiage-screen/anti-age.png')] bg-no-repeat bg-cover   will-change-transform -z-20 hidden md:block"
			/>

			<div className='w-full h-[800px] sm:h-[740px] relative md:hidden bg-[#0c0807] overflow-hidden bg-[url("/antiage-screen/bg-mobile.png")] sm:bg-[url("/antiage-screen/anti-age.png")] bg-no-repeat bg-cover bg-[55%_0%] sm:bg-center'>
				<div
					className="
        absolute left-[-120px] bottom-[-5.5rem] hidden sm:block  h-auto aspect-[3/4] will-change-transform
        bg-[url('/antiage-screen/image2.png')]
        bg-no-repeat bg-cover bg-center image-anti-size
    "
				/>
				<div className='relative z-10 h-full flex flex-col items-end justify-end sm:justify-center pb-8 px-4 gap-16 -mt-[70px]'>
					{isMobile && (
						<>
							<div className='w-full sm:w-auto space-y-6 text-white mt-24'>
								{firstBlock.content}
							</div>
						</>
					)}
				</div>

				{isMobile && (
					<h1
						ref={textRefMobile}
						className='
							text-[64px]/[125%] font-normal uppercase whitespace-nowrap
							text-white mix-blend-difference
							absolute bottom-[1rem] right-0
							pointer-events-none
							z-20
						'
					>
						стратегия управления возрастом
					</h1>
				)}
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
					hidden md:block text-[clamp(45px,3vw,65px)] 2xl:text-[96px] font-normal uppercase whitespace-nowrap
					absolute -z-10 top-[8rem] left-0
					text-[#1D1D1D4D] 
				'
			>
				Антиэйдж
			</h2>
			<h3
				ref={geneticPassportRef}
				className='
					hidden md:block text-[clamp(18px,3vw,24px)]  xl:text-[clamp(24px,3vw,28px)] 2xl:text-[40px] font-normal uppercase whitespace-nowrap
					absolute top-[40%] left-10
					text-[#FFFFFF99] 
					opacity-0 -translate-x-20
				'
			>
				Генетический <br />
				паспорт
			</h3>
			<h3
				ref={hormonesRef}
				className='
					hidden md:block text-[clamp(18px,3vw,24px)]  lg:text-[clamp(18px,3vw,36px)] xl:text-[clamp(36px,3vw,64px)]  font-normal uppercase whitespace-nowrap
					absolute top-[28%] text-lg_anti
					text-[#FFFFFF4D]
					opacity-0 scale-50
				'
			>
				гормоны
			</h3>
			<h3
				ref={regenerativeMedicineRef}
				className='
					hidden md:block text-[clamp(18px,3vw,24px)]  xl:text-[clamp(24px,3vw,32px)] 2xl:text-[32px]/[125%] font-normal uppercase whitespace-nowrap
					absolute top-[61%] left-[10vw]
					text-[#FFFFFFBF] 
					opacity-0 -translate-x-20
				'
			>
				Регенеративная <br />
				Медицина
			</h3>
			<h3
				ref={cellularRejuvenationRef}
				className='
					hidden md:block text-[clamp(18px,3vw,24px)]  xl:text-[clamp(24px,3vw,28px)] 2xl:text-[28px]/[125%] font-normal uppercase whitespace-nowrap
					absolute bottom-[11%] left-[21%]
					text-[#FFFFFFBF] 
					opacity-0 -translate-x-20
				'
			>
				клеточное <br />
				омоложение
			</h3>
			<div className='flex flex-col items-start sm:items-end gap-16 my-16'>
				{remainingBlocks.map((item, index) => (
					<div
						key={item.id}
						ref={contentRefs[index + 1]}
						className={`
            space-y-10
            md:absolute md:bottom-0 md:right-8 xl:right-20  2xl:right-[110px] md:top-[35%]
            relative px-4 md:px-0
            ${item.id === 9 ? 'show_block-text' : ''}
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
            md:absolute md:bottom-0 md:right-8 xl:right-20 2xl:right-[110px] md:top-[25%]
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
							стратегия управления возрастом
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							стратегия управления возрастом
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							стратегия управления возрастом
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							стратегия управления возрастом
						</span>
					</div>
				</div>
			)}
		</div>
	)
}