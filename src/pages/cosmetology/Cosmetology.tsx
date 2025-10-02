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
		contentRef6
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
    sm:top-auto sm:bottom-[-5rem]
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
            bg-[url('/cosmetology-screen/beef4aba2d32319ab3ff30157c877b883ffce82b.jpg')]
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
          bg-[url('/cosmetology-screen/beef4aba2d32319ab3ff30157c877b883ffce82b.jpg')]
          bg-no-repeat bg-cover
          scale-[1.4] md:scale-[1] bg-[-13rem_8rem] md:bg-[-10rem_8rem] xl:bg-[-10rem_0%]
        "
			/>

			<div className='flex flex-col items-end gap-[120px] my-[120px]'>
				{contentData.map(item => (
					<div
						key={item.id}
						ref={item.ref}
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
					ref={contentRef1}
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
					ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
				</h1>
			)}
		</div>
	)
}
