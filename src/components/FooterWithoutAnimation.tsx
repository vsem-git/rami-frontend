import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useHeader } from './HeaderContext'
import FooterInfo from './FooterInfo'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
	const { setHeaderColor } = useHeader()
	const footerRef = useRef(null)

	useEffect(() => {
		const colorObj = { color: '#000000' }

		const trigger = ScrollTrigger.create({
			trigger: footerRef.current,
			start: 'top 10%',
			end: 'bottom 20%',
			onEnter: () => {
				gsap.to(colorObj, {
					color: '#ffffff',
					duration: 0.6,
					onUpdate: () => setHeaderColor(colorObj.color),
				})
			},
			onLeaveBack: () => {
				gsap.to(colorObj, {
					color: '#000000',
					duration: 0.6,
					onUpdate: () => setHeaderColor(colorObj.color),
				})
			},
		})

		return () => trigger.kill()
	}, [])

	return (
		<>
			<footer ref={footerRef} className='h-dvh relative overflow-hidden'>
				<div className="w-full pt-20 sm:pt-0 h-dvh bg-[url('/footer.webp')] bg-cover bg-center text-white flex flex-col ">
					<div className='flex-1 sm:text-[21px] flex-col sm:flex-row uppercase md:text-[28px] 2xl:text-[36px] font-semibold h-full flex '>
						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								История
							</span>
							{/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        </svg> */}
						</a>

						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								Документы
							</span>
							{/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        </svg> */}
						</a>

						<a
							href='#'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<a
								href='лицензия_выписка_28_10_2025_ДЕЙСТВУЮЩАЯ.pdf'
								target='_blank'
								className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'
							>
								Лицензия
							</a>
							{/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        </svg> */}
						</a>

						<a
							href='/price.pdf'
							target='_blank'
							className='flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10'
						>
							<span className='relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full'>
								Прайс
							</span>
							{/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        </svg> */}
						</a>
					</div>
					<div className=' absolute bottom-0 left-0 sm:left-auto sm:right-0 text-xs xl:text-base border-[#FFFFFF4D] border-0 uppercase font-semibold flex md:flex-row flex-col gap-4 justify-between p-6 2xl:p-10 footer-content'>
						<a href='#' className='text-[#FFFFFF80] hidden'>
							©2025. Рамиклиник резиденс
						</a>
						<a
							href='/privacy-policy.docx'
							className='flex gap-2 items-center group text-xs xl:text-base border-b border-[#FFFFFF4D] leading-[150%] py-4'
							download
							target='_blank'
						>
							<span className='relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:w-full'>
								Политика конфиденциальности
							</span>
						</a>
					</div>
				</div>
			</footer>
			<FooterInfo />
		</>
	)
}

export default Footer
