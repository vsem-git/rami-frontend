import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Регистрируем плагин
gsap.registerPlugin(ScrollToPlugin)

const navLink = [
	{
		title: 'О клинике',
		href: '#clinic',
	},
	{
		title: 'Манифест искренности',
		href: '#manifesto',
	},
	{
		title: 'Направления услуг',
		href: '#services',
	},
	{
		title: 'Команда врачей',
		href: '#team',
	},
	{
		title: 'Удобства клиники',
		href: '#facilities',
	},
	{
		title: 'Расположение',
		href: '#location',
	},
]

const NavBar = ({
	color,
	ref,
	navbarColor,
}: {
	color: string
	ref: React.RefObject<HTMLDivElement>
	navbarColor: string
}) => {
	const pathname = window.location.pathname

	const wrapLetters = (text: string) => {
		return text.split('').map((char, index) => (
			<span
				key={index}
				className='letter inline-block opacity-0 -translate-x-[10px] transition-all duration-300 ease-in-out'
				style={{ transitionDelay: `${index * 50}ms` }}
			>
				{char === ' ' ? '\u00A0' : char}
			</span>
		))
	}

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault()
		
		const targetId = href.replace('#', '')
		const targetElement = document.getElementById(targetId)
		
		if (targetElement) {
			gsap.to(window, {
				duration: 1.5,
				scrollTo: {
					y: targetElement,
					offsetY: 50 
				},
				ease: "power2.inOut"
			})
		} else {
			const element = document.querySelector(href)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}

	return (
		<nav
			ref={ref}
			className={`${
				pathname === '/' ? 'hidden md:flex ' : 'hidden'
			}navbarheader opacity-0 fixed left-4 md:left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-50 uppercase font-semibold flex-col`}
		>
			<style>
				{`
              .group:hover ~ span .letter {
                opacity: 1;
                transform: translateX(0);
              }
            `}
			</style>
			{navLink.map((item, index) => (
				<div key={index} className='flex items-center gap-4 relative py-3'>
					<a 
						href={item.href} 
						className='relative group'
						onClick={(e) => handleNavClick(e, item.href)}
					>
						<div className='absolute -left-4 -right-4 -top-2 -bottom-2' />
						<div
							className={`w-6 2xl:w-8 h-[1px] group-hover:w-16 transition-all duration-300`}
							style={{
								backgroundColor: navbarColor || color,
								transition: 'all 0.3s ease-in-out',
							}}
						/>
					</a>
					<span
						className={`pointer-events-none select-none absolute whitespace-nowrap left-[calc(100%_+_1.5rem)]`}
						style={{
							color: navbarColor || color,
							transition: 'all 0.3s ease-in-out',
						}}
					>
						{wrapLetters(item.title)}
					</span>
				</div>
			))}
		</nav>
	)
}

export default NavBar