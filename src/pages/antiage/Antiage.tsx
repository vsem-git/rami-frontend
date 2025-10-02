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
		...contentRefs
	)

	useMobileTextAnimation(textRef, isMobile)

	const firstBlock: AntiageItem = ANTIAGE[0]
	const remainingBlocks: AntiageItem[] = ANTIAGE.slice(1)

	return (
		<div
			ref={sectionRef}
			className='w-full h-auto md:h-screen relative overflow-hidden bg-[#1D1D1D] md:bg-[#0c0807]'
		>
			<div className='w-full h-[720px] sm:h-[640px] relative md:hidden bg-[#0c0807]'>
				{isMobile && (
					<h1
						ref={textRef}
						className='
							text-[64px]/[125%] font-normal uppercase whitespace-nowrap
							text-white mix-blend-difference
							absolute top-[2rem] right-0
							sm:top-auto sm:bottom-[-5rem]
							pointer-events-none
							z-20
						'
					>
						стратегия управления возрастом
					</h1>
				)}

				<div
					className="
						absolute w-full h-full will-change-transform
						bg-[url('/antiage-screen/anti-age.jpg')]
						bg-no-repeat bg-cover scale-[1] sm:scale-[1.4]
						bg-[-17rem_0rem] sm:bg-[-13rem_8rem]
					"
				/>

				<div className='relative z-10 h-full flex items-end sm:items-center justify-end px-4 py-8'>
					{isMobile && (
						<div className='space-y-6 text-white'>{firstBlock.content}</div>
					)}
				</div>
			</div>

			<div
				ref={backgroundRef}
				className="
					hidden md:block absolute w-full h-full will-change-transform
					bg-[url('/antiage-screen/anti-age.jpg')] bg-no-repeat bg-cover scale-[1.5]
				"
			/>

			<h2
				ref={leftTextRef}
				className='
					hidden md:block text-[96px]/[125%] font-normal uppercase whitespace-nowrap
					absolute top-0 left-0
					text-[#1D1D1D4D] 
				'
			>
				Антиэйдж
			</h2>

			<div className='flex flex-col items-end gap-[120px] my-[120px]'>
				{remainingBlocks.map((item, index) => (
					<div
						key={item.id}
						ref={contentRefs[index + 1]}
						className={`
							space-y-10
							md:absolute md:bottom-0 md:right-8 lg:right-20 2xl:right-[110px] md:top-[35%]
							relative mt-10 px-4 md:px-0
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
						md:absolute md:bottom-0 md:right-8 lg:right-20 2xl:right-[110px] md:top-[35%]
						relative mt-10 px-4 md:px-0
					`}
				>
					{firstBlock.content}
				</div>
			)}

			{!isMobile && (
				<h1
					ref={textRef}
					className='
						text-[96px]/[125%] xl:text-[160px]/[125%] font-normal uppercase whitespace-nowrap
						absolute bottom-0 right-0
						text-white mix-blend-difference
					'
				>
					стратегия управления возрастом
				</h1>
			)}
		</div>
	)
}
