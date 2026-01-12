import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useState } from 'react'
import arrow from '/arrow-ap.svg'

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollToPlugin)
}

const featuresLeft = [
	{ text: 'Безопасность пребывания', id: 'safety-apartments-new' },
	{ text: 'Hi-tech технологии', id: 'technologies-apartments-new' },
	{ text: 'Комфорт в деталях', id: 'details-info-apartments-new' },
	{ text: 'Персонализированный сервис 24/7', id: 'service-apartments-new' },
	{
		text: 'Живописная пространственная среда',
		id: 'picturesque-wednesday-apartments-new',
	},
]

const featuresRight = [
	'Аквамарин',
	'Александрит',
	'Аметист',
	'Бриллиант',
	'Жемчуг',
	'Изумруд',
	'Рубин',
	'Сапфир',
]

export const WelcomeApartmentsNew = () => {
	const [hoverIndexRight, setHoverIndexRight] = useState<number | null>(2)

	const handleScrollToSection = (sectionId: string) => {
		const targetSection = document.getElementById(sectionId)

		if (!targetSection) {
			console.warn(`Section with id "${sectionId}" not found`)
			return
		}

		gsap.to(window, {
			duration: 1.5,
			scrollTo: {
				y: targetSection,
				offsetY: 0,
			},
			ease: 'power2.inOut',
		})
	}

	const handleScrollToNext = () => {
		handleScrollToSection('safety-apartments-new')
	}

	return (
		<div
			id='welcomeApartmentsNew'
			className='relative w-full min-h-[2400px] bg-[#1D1D1D] pt-52'
		>
			<img
				src='/apartmentsnew-screen/bg11.png'
				alt=''
				className='absolute left-0 top-0 w-[1026px]'
			/>

			<div className='relative w-full flex justify-center items-center ml-[-6rem]'>
				<ul className='flex flex-col gap-4 pl-20'>
					{featuresLeft.map((item, i) => (
						<li
							key={i}
							className='flex items-center gap-4 cursor-pointer uppercase group'
							onClick={() => handleScrollToSection(item.id)}
						>
							<span className='text-[#EAE6E0] transition-all duration-300 group-hover:text-white'>
								0{i + 1}
							</span>
							<span className='text-base text-[#EAE6E0] font-normal leading-none border-b border-[#EAE6E0] pb-2 pt-2 transition-all duration-300 group-hover:text-white group-hover:border-white'>
								{item.text}
							</span>
						</li>
					))}
				</ul>

				<div className='flex flex-col items-center mx-12 ml-[-2rem]'>
					<h4 className='text-xl font-normal text-white uppercase mb-[30px] leading-none'>
						Медицинские
					</h4>
					<h1 className='relative z-10 text-[110px] font-normal text-white uppercase leading-none'>
						апартаменты
					</h1>

					<div className='flex gap-5 mt-8'>
						<div className='relative w-[473px] h-[580px] overflow-hidden'>
							<img
								src='/apartmentsnew-screen/bg2.png'
								alt=''
								className='w-full h-full object-cover'
							/>
							<div className='absolute inset-0 bg-[#00000033]' />
						</div>
					</div>
				</div>

				<div className='w-[200px]'>
					<ul className='flex flex-col gap-3'>
						{featuresRight.map((item, i) => (
							<li
								key={i}
								className='flex items-center gap-4 cursor-pointer uppercase transition-all duration-300'
								onMouseEnter={() => setHoverIndexRight(i)}
							>
								<span
									className={`h-px bg-[#EAE6E0] transition-all duration-300 ${
										hoverIndexRight === i ? 'w-6' : 'w-2'
									} ${hoverIndexRight === i ? 'opacity-100' : 'opacity-50'}`}
								/>

								<span
									className={`text-base text-[#EAE6E0] font-normal leading-none transition-opacity duration-300 ${
										hoverIndexRight === i ? 'opacity-100' : 'opacity-50'
									}`}
								>
									{item}
								</span>
							</li>
						))}
					</ul>
				</div>

				<div className='absolute -bottom-30 right-[25%] w-[310px] h-[310px] border border-[#FFFFFF0F] rounded-full flex justify-end'>
					<button
						onClick={handleScrollToNext}
						className='w-10 h-10 rounded-full border border-[#FFFFFF0F] bg-[#1D1D1D] flex items-center justify-center cursor-pointer mr-8 mt-5 relative z-40 hover:bg-[#2D2D2D] transition-colors duration-300'
						aria-label='Перейти к следующему разделу'
					>
						<img src={arrow} alt='Стрелка вниз' />
					</button>
				</div>
			</div>

			<div className='relative w-full flex justify-center items-center flex-col mt-22'>
				<h2 className='relative z-10 text-[32px] font-normal text-white uppercase leading-none max-w-[1000px] text-center'>
					Спроектированы как респектабельные люксовые номера в высококлассных
					отелях
				</h2>

				<div className='flex items-center mt-[-13rem] px-[136px] '>
					<img
						src='/apartmentsnew-screen/card21.jpg'
						alt=''
						className='relative z-10 w-[359px] h-[422px] mt-[24rem] mr-[-3.5rem] '
					/>
					<img
						src='/apartmentsnew-screen/card19.jpg'
						alt=''
						className='w-[511px] h-[640px]'
					/>

					<img
						src='/apartmentsnew-screen/bg7.png'
						alt=''
						className='relative z-10 w-[435px] h-[556px] mt-[49rem] ml-[-3rem]'
					/>
					<img
						src='/apartmentsnew-screen/card20.jpg'
						alt=''
						className='w-[359px] h-[443px] mt-[-5rem] ml-[-8rem]'
					/>

					<img
						src='/apartmentsnew-screen/bg4.jpg'
						alt=''
						className='w-[283px] h-[355px] mt-[32rem] ml-[-3.5rem]'
					/>
				</div>
			</div>

			<img
				src='/apartmentsnew-screen/figure.png'
				alt=''
				className='absolute left-0 bottom-0'
			/>
		</div>
	)
}
