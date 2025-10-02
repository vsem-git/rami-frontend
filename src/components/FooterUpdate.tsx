import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FooterUpdate = () => {
	return (
		<>
			<footer className='h-screen relative'>
				<div className="relative inset-0 w-full pt-20 sm:pt-0 h-dvh bg-[url('/footer.webp')] bg-cover bg-center text-white flex flex-col">
					<div className='flex-1 sm:text-[21px] flex-col sm:flex-row uppercase md:text-[28px] 2xl:text-[36px] font-semibold h-full flex'>
						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								История
							</span>
						</a>

						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								Документы
							</span>
						</a>

						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								Лицензия
							</span>
						</a>

						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								Прайс
							</span>
						</a>
					</div>
					<div className=' absolute bottom-0 left-0 sm:left-auto sm:right-0 text-xs xl:text-base border-[#FFFFFF4D] border-0 uppercase font-semibold flex md:flex-row flex-col gap-4 justify-between p-6 2xl:p-10'>
						<a href='#' className='text-[#FFFFFF80] hidden'>
							©2025. Рамиклиник резиденс
						</a>
						<a href='#' className='text-xs xl:text-base'>
							Политика конфиденциальности
						</a>
					</div>
				</div>
			</footer>
		</>
	)
}

export default FooterUpdate
