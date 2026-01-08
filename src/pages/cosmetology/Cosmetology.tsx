import { useEffect, useRef, useState } from 'react'
import { usePopup } from '../../components/PopupContext'
import { COSMETOLOGY } from '../../shared/data/cosmetology'
import { useCosmetologyAnimation } from './animations/useCosmetologyAnimation'
import { useMobileTextAnimation } from './animations/useMobileTextAnimation'

interface CosmetologyItem {
	id: number
	content: React.ReactNode
}

const featuresLeft = [
	{
		label: 'ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ',
		popup: 'cosmetology-modal',
	},
	{
		label: 'АППАРАТНАЯ КОСМЕТОЛОГИЯ',
		popup: 'cosmetology-modal',
	},
	{
		label: 'НИТЕВОЙ ЛИФТИНГ',
		popup: 'cosmetology-modal',
	},
	{
		label: 'УХОДОВЫЕ ПРОЦЕДУРЫ',
		popup: 'cosmetology-modal',
	},
]

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
	const featuresRef = useRef<HTMLDivElement>(null)
	const { openPopup } = usePopup()

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
		featuresRef,
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

	// const firstBlock: CosmetologyItem = COSMETOLOGY[0]
	// const remainingBlocks: CosmetologyItem[] = COSMETOLOGY.slice(1)

	// const contentData = remainingBlocks.map(
	// 	(item: CosmetologyItem, index: number) => ({
	// 		...item,
	// 		ref: contentRefs[index + 1],
	// 	})
	// )

	const contentData = COSMETOLOGY.map(
		(item: CosmetologyItem, index: number) => ({
			...item,
			ref: contentRefs[index],
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

				<div className='relative z-10 h-full flex flex-col items-start sm:items-end justify-end sm:justify-center pb-8 px-4 gap-16'>
					{/* {isMobile && (
						<>
							<div className='space-y-6 text-white mt-24'>
								{firstBlock.content}
							</div>
						</>
					)} */}

					<ul className='flex flex-col gap-3 mr-0 smx:mr-3'>
						{featuresLeft.map((item, i) => (
							<li
								key={i}
								onClick={() => openPopup(item.popup)}
								className='flex items-center gap-4 cursor-pointer uppercase'
							>
								<span className='text-white transition-all duration-300'>
									0{i + 1}
								</span>

								<span className='text-sm 2xl:text-base text-white font-normal leading-none relative'>
									{item.label}
									<span className='absolute left-0 bottom-0 h-[1px] bg-white w-0 transition-all duration-300 group-hover:w-full'></span>
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div
				ref={backgroundRef}
				className="
					hidden md:block absolute w-[100%] xl:w-full h-full will-change-transform
					bg-[url('/cosmetology-screen/beef4aba2d32319ab3ff30157c877b883ffce82b.webp')]
					bg-no-repeat bg-cover
					scale-[1.4] md:scale-[.6]  lg:scale-[1] cosmetology-bg_image
				"
			/>

			<div className='hidden md:flex items-center justify-end h-full w-full pr-10 2xl:pr-20 2xl:pr-[110px]'>
				<div className='relative w-full max-w-[580px]'>
					{contentData.map(item => (
						<div
							key={item.id}
							ref={item.ref}
							className='absolute -right-4 xl:right-8 top-[-131px]'
						>
							{item.content}
						</div>
					))}
				</div>
			</div>

			<div
				ref={featuresRef}
				className='md:block hidden absolute top-1/2 lg:top-[40%] left-[50%] lg:-left-10 xl:left-[-2%] -translate-y-1/2 z-999'
			>
				<ul className='flex flex-col gap-4 pl-20'>
					{featuresLeft.map((item, i) => (
						<li
							key={i}
							onClick={() => openPopup(item.popup)}
							className='flex items-center gap-4 cursor-pointer uppercase group'
						>
							<span className='text-white transition-all duration-300'>
								0{i + 1}
							</span>

							<span className='text-xs xl:text-sm 2xl:text-base text-white font-normal leading-none relative'>
								{item.label}
								<span className='absolute left-0 -bottom-1 h-[1.5px] bg-white w-0 transition-all duration-300 group-hover:w-full'></span>
							</span>
						</li>
					))}
				</ul>
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
