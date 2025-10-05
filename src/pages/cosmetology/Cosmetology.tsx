import { useEffect, useRef, useState } from 'react'
import { COSMETOLOGY } from '../../shared/data/cosmetology'
import { useCosmetologyAnimation } from './animations/useCosmetologyAnimation'
import { useMobileTextAnimation } from './animations/useMobileTextAnimation'

interface CosmetologyItem {
	id: number
	content: React.ReactNode
}

export const Cosmetology = () => {
	const textRef = useRef<HTMLHeadingElement>(null)
	const textRefMobile = useRef<HTMLHeadingElement>(null)
	const sectionRef = useRef<HTMLDivElement>(null)
	const backgroundRef = useRef<HTMLDivElement>(null)
	const contentRef1 = useRef<HTMLDivElement>(null)
	const contentRef2 = useRef<HTMLDivElement>(null)
	const contentRef3 = useRef<HTMLDivElement>(null)
	const contentRef4 = useRef<HTMLDivElement>(null)
	const contentRef5 = useRef<HTMLDivElement>(null)
	const contentRef6 = useRef<HTMLDivElement>(null)

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

	useCosmetologyAnimation(
		textRef,
		sectionRef,
		backgroundRef,
		contentRef1,
		contentRef2,
		contentRef3,
		contentRef4,
		contentRef5,
		contentRef6,
		isMobile
	)

	useMobileTextAnimation(textRefMobile, isMobile)

	const contentRefs = [
		contentRef1,
		contentRef2,
		contentRef3,
		contentRef4,
		contentRef5,
		contentRef6,
	]

	const firstBlock: CosmetologyItem = COSMETOLOGY[0]
	const remainingBlocks: CosmetologyItem[] = COSMETOLOGY.slice(1)

	const contentData = remainingBlocks.map(
		(item: CosmetologyItem, index: number) => ({
			...item,
			ref: contentRefs[index + 1],
		})
	)

	return (
		<div
			ref={sectionRef}
			className='w-full h-auto md:h-screen relative overflow-hidden bg-[#1D1D1D] md:bg-[#0c0807]'
		>
			<div className='w-full h-[720px] sm:h-[640px] relative md:hidden bg-[#0c0807]'>
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
						ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
					</h1>
				)}

				<div
					className="
						absolute w-full h-full will-change-transform
						bg-[url('/cosmetology-screen/beef4aba2d32319ab3ff30157c877b883ffce82b.webp')]
						bg-no-repeat bg-cover scale-[1] sm:scale-[1.4]
						bg-[-17rem_0rem] sm:bg-[-13rem_8rem]
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
					hidden md:block absolute w-full h-full will-change-transform
					bg-[url('/cosmetology-screen/beef4aba2d32319ab3ff30157c877b883ffce82b.webp')]
					bg-no-repeat bg-cover
					scale-[1.4] md:scale-[1] bg-[-13rem_8rem] md:bg-[-22rem_8rem] lg:bg-[-17rem_8rem] xl:bg-[-10rem_0%]
				"
			/>

			<div className='hidden md:flex items-center justify-end h-full w-full pr-8 xl:pr-20 2xl:pr-[110px]'>
				<div className='relative w-full max-w-[580px]'>
					{!isMobile && (
						<div
							ref={contentRef1}
							className='absolute -right-4 lg:right-8 top-[-131px]'
						>
							{firstBlock.content}
						</div>
					)}

					{contentData.map(item => (
						<div
							key={item.id}
							ref={item.ref}
							className='absolute -right-4 lg:right-8 top-[-131px]'
						>
							{item.content}
						</div>
					))}
				</div>
			</div>

			<div className='md:hidden flex flex-col items-end gap-16  my-16 px-4'>
				{contentData.map(item => (
					<div key={item.id} className='space-y-6 text-white'>
						{item.content}
					</div>
				))}
			</div>

			{!isMobile && (
				<div
					className='absolute -bottom-5 md:-bottom-0 lg:-bottom-5 right-0 w-full overflow-hidden mix-blend-difference text-white'
					ref={textRef}
				>
					<div className='marquee flex whitespace-nowrap text-[clamp(3rem,8vw,10rem)] font-normal uppercase mix-blend-difference leading-[125%]'>
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
