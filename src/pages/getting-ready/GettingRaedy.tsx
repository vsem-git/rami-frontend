import { useEffect, useRef, useState } from 'react'
import { GETTING } from '../../shared/data/getting-ready'
import { useMobileTextAnimation } from './animations/useMobileTextAnimation'
import { useGettingReadyAnimation } from './animations/useGettingReadyAnimation.tsx'

interface AntiageItem {
	id: number
	content: React.ReactNode
}

export const GettingReady = () => {
	const textRef = useRef<HTMLHeadingElement>(null)
	const sectionRef = useRef<HTMLDivElement>(null)
	const backgroundRef = useRef<HTMLDivElement>(null)
	const textRefMobile = useRef<HTMLHeadingElement>(null)
	const shadowRef = useRef<HTMLDivElement>(null)

	const contentRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
		GETTING.map(() => useRef<HTMLDivElement | null>(null))
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

	useGettingReadyAnimation(
		textRef,
		sectionRef,
		backgroundRef,
		shadowRef,
		...contentRefs
	)

	useMobileTextAnimation(textRefMobile, isMobile)

	const firstBlock: AntiageItem = GETTING[0]
	const remainingBlocks: AntiageItem[] = GETTING.slice(1)

	return (
		<div
			ref={sectionRef}
			className='w-full h-auto md:h-[105vh] relative overflow-hidden bg-black '
		>
			<div className='w-full h-[800px] sm:h-[740px] relative md:hidden bg-[#0c0807] overflow-hidden bg-[url("/antiage-screen/bg-mobile.png")] sm:bg-[url("/antiage-screen/anti-age.png")] bg-no-repeat bg-cover bg-[55%_0%] sm:bg-center'>
				<div>
					<div
						className="
						absolute hidden sm:block min-w-[600px] h-[100vh] will-change-transform
						bg-[url('/antiage-screen/image2.png')]
						bg-no-repeat bg-cover scale-[1]
						bg-size-anti
					"
					/>
				</div>

				<div className='relative z-10 h-full flex flex-col items-end justify-end sm:justify-center pb-8 px-4 gap-16 -mt-[70px]'>
					{isMobile && (
						<>
							<div className='space-y-6 text-white mt-24'>
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
						Подготовка к пластической операции
					</h1>
				)}
			</div>

			<div className='relative w-[420px] h-full'>
				{/* <div
					ref={shadowRef}
					className='absolute top-0 left-[320px] w-full h-full opacity-0 transition-opacity duration-1000 pointer-events-none z-0'
				>
					<img
						src='/getting-ready/shadow.svg'
						alt='shadow'
						className='w-full h-full object-cover'
					/>
				</div> */}

				<div
					ref={backgroundRef}
					className="
      hidden md:block absolute w-[340px] h-full 
      bg-[url('/getting-ready/bg1.png')] 
      bg-no-repeat bg-cover bg-center
      left-[310px] top-[32px] bottom-[62px] z-10
    "
				></div>
			</div>

			<div className='flex flex-col items-end gap-16 my-16'>
				{remainingBlocks.map((item, index) => (
					<div
						key={item.id}
						ref={contentRefs[index + 1]}
						className={`
							space-y-10
							md:absolute md:bottom-0 md:right-8 xl:right-20  2xl:right-[110px] md:top-[35%]
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
						md:absolute md:bottom-0 md:right-8 xl:right-20 2xl:right-[110px] md:top-[35%]
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
					<div className='marquee-cosmetology flex whitespace-nowrap text-[clamp(3rem,8vw,8.8rem)] font-normal uppercase mix-blend-difference leading-[125%]'>
						<span className='px-4 md:px-6 xl:px-8'>
							Подготовка к пластической операции
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							Подготовка к пластической операции
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							Подготовка к пластической операции
						</span>
						<span className='px-4 md:px-6 xl:px-8'>
							Подготовка к пластической операции
						</span>
					</div>
				</div>
			)}
		</div>
	)
}
