import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE_LINK_CLASSES =
	'text-[21px] flex gap-2 items-center justify-end group [writing-mode:vertical-rl] border-l border-[#FFFFFF4D] py-4 px-5'

const SPAN_CLASSES =
	'relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full rotate-180'

const links = [
	{ href: '#', text: 'История' },
	{ href: '#', text: 'Документы' },
	{ href: '#', text: 'Лицензия' },
	{ href: '#', text: 'Прайс', isDoubleBorder: true },
]

const FooterUpdate = () => {
	const getLinkClass = (linkText: string, isDoubleBorder?: boolean) => {
		if (isDoubleBorder || linkText === 'Прайс') {
			return `${BASE_LINK_CLASSES} border-r border-[#FFFFFF4D]`
		}
		return BASE_LINK_CLASSES
	}

	return (
		<footer className='h-screen relative'>
			<div className="relative inset-0 w-full sm:pt-0 h-dvh bg-[url('/footer.webp')] bg-cover  bg-[50%_0%] sm:bg-center text-white flex flex-col ">
				<div className='flex-row uppercase font-semibold h-full flex'>
					{links.map((link, index) => (
						<a
							key={index}
							href={link.href}
							className={getLinkClass(link.text, link.isDoubleBorder)}
						>
							<span className={SPAN_CLASSES}>{link.text}</span>
						</a>
					))}
				</div>

				<div className='text-xs xl:text-base border-t border-[#FFFFFF4D] uppercase font-semibold flex flex-col gap-2 justify-between p-6 2xl:p-10'>
					<a href='#' className='text-[#FFFFFF80]'>
						©2025. Рамиклиник резиденс
					</a>
					<a
						href='/privacy-policy.docx'
						className='text-xs xl:text-base'
						download target="_blank" 
					>
						Политика конфиденциальности
					</a>
				</div>
			</div>
		</footer>
	)
}

export default FooterUpdate
