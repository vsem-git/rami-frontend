import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { useHeader } from './HeaderContext'
import { MenuHeader } from './MenuHeader'
import { usePopup } from './PopupContext'
import Envelope from './svg/Envelope'
import Phone from './svg/Phone'

gsap.registerPlugin(ScrollTrigger)

interface HeaderProps {
	useWhiteText?: boolean
}

const Header = ({ useWhiteText }: HeaderProps) => {
	const { headerColor } = useHeader()
	const headerRef = useRef(null)
	const logoRef = useRef(null)
	const menuRef = useRef(null)
	const visitRef = useRef(null)
	const navBarRef = useRef<HTMLDivElement>(null)
	const [isOpenMenu, setOpenMenu] = useState(false)
	const topLineRef = useRef(null)
	const menuButtonRef = useRef(null)
	const bottomLineRef = useRef(null)
	const { openPopup } = usePopup()

	const currentColor = useWhiteText ? '#ffffff' : headerColor || '#000000'

	useEffect(() => {
		console.log('Ширина экрана в пикселях - ', window.innerWidth)
	}, [])

	useGSAP(() => {
		const logo = logoRef.current
		const header = headerRef.current
		const menu = menuRef.current
		const visit = visitRef.current
		const navBar = navBarRef.current

		if (!logo || !header || !menu || !visit || !navBar) {
			console.error('One or more refs are not defined:', {
				logo,
				header,
				menu,
				visit,
				navBar,
			})
			return
		}

		/* const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=1000",
                scrub: 1,
            },
        });
        tl.to({}, { duration: 3 })
            .to(menu, { opacity: 1, y: 0, duration: 0.5 }, 4)
            .to(visit, { opacity: 1, y: 0, duration: 0.5 }, 4)
            .to(navBar, { opacity: 1, y: 0, duration: 0.5 }, 4);

        tl.to(header, { opacity: 1, duration: 1 });

        tl.to({}, { duration: 1 });

        tl.to(logo, { scale: 1, x: 0, y: 0, duration: 1, ease: "power2.out" }); */
	}, [])

	const toggleMenu = () => {
		setOpenMenu(prev => !prev)

		if (!topLineRef.current || !bottomLineRef.current) return

		if (!isOpenMenu) {
			gsap.to(topLineRef.current, {
				rotate: 45,
				y: 6,
				backgroundColor: '#ffffff',
				duration: 0.3,
			})
			gsap.to(bottomLineRef.current, {
				rotate: -45,
				y: -1,
				backgroundColor: '#ffffff',
				duration: 0.3,
			})
		} else {
			gsap.to([topLineRef.current, bottomLineRef.current], {
				rotate: 0,
				y: 0,
				backgroundColor: currentColor,
				duration: 0.3,
			})
		}
	}

	return (
		<div
			ref={headerRef}
			className='header fixed top-0 left-0 right-0 z-[50] py-[16px] md:py-[20px] 2xl:py-[40px] md:px-[24px] sm:px-[16px] px-[16px] 2xl:px-[40px] grid grid-cols-3 justify-between items-center'
		>
			<div
				ref={menuButtonRef}
				onClick={toggleMenu}
				className='relative menuheader item flex font-semibold gap-4 items-center h-fit group cursor-pointer z-[999]'
			>
				<div className='flex flex-col gap-1'>
					<div
						ref={topLineRef}
						className='w-[32px] h-[2px]'
						style={{
							backgroundColor: currentColor,
							transition: 'background-color 0.3s ease-in-out',
						}}
					></div>
					<div
						ref={bottomLineRef}
						className='w-[32px] h-[2px]'
						style={{
							backgroundColor: currentColor,
							transition: 'background-color 0.3s ease-in-out',
						}}
					></div>
				</div>
				<div
					className={`hidden text-[13px] xl:text-base relative sm:block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full ${
						isOpenMenu ? 'after:bg-white' : 'after:bg-current'
					}`}
					style={{
						color: isOpenMenu ? '#fff' : currentColor,
						transition: 'color 0.3s ease-in-out',
					}}
				>
					{isOpenMenu ? 'ЗАКРЫТЬ' : 'МЕНЮ'}
				</div>
			</div>
			<div className='item-wrapper flex justify-center items-center relative h-[60px]'>
				<div
					className='logo logoheader w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] absolute'
					ref={logoRef}
				>
					<a href='/' className='relative block'>
						<div
							className='absolute inset-0 w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] bg-black/45 blur-[30px] z-0'
							style={
								headerColor === '#ffffff' ? { opacity: 1 } : { opacity: 0 }
							}
						></div>
						<img
							src='/logo_black.webp'
							width={1000}
							height={1000}
							alt='logo'
							className={`inset-0 absolute w-[79px] h-[64px] 2xl:w-[149px] z-1 2xl:h-[120px] ${
								headerColor === '#000000' ? 'opacity-100' : 'opacity-0'
							}`}
							style={{ transition: 'opacity 0.3s ease-in-out' }}
						/>
						<img
							src='/logo_white.webp'
							width={1000}
							height={1000}
							alt='logo'
							className={`absolute inset-0 w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] ${
								headerColor === '#000000' ? 'opacity-0' : 'opacity-100'
							}`}
							style={{ transition: 'opacity 0.3s ease-in-out' }}
						/>
					</a>
				</div>
			</div>
			<div
				ref={visitRef}
				className='item visitheader font-semibold justify-end items-center flex gap-6 cursor-pointer text-[11px] md:text-[12px] 2xl:text-base'
				style={{
					color: headerColor,
					transition: 'none', // Отключаем CSS-переходы
				}}
			>
				<Phone className='md:hidden' />
				<Envelope
					headerColor={headerColor}
					onClick={() => openPopup('contact')}
				/>
				<a href='tel:+78126271313' className='font-normal hidden md:inline'>
					+7 (812) 627 -13-13{' '}
				</a>
				<style>
					{`
                        .theme *:after {
                            background-color: ${headerColor};
                        }
                        
                        .theme:after {
                            background-color: ${headerColor};
                        }
                    `}
				</style>
				{/* <UnderlinedText
                    className="theme hidden! md:inline-block!"
                    onClick={() => openPopup("contact")}
                >
                    ЗАПЛАНИРОВАТЬ ВИЗИТ
                </UnderlinedText> */}
			</div>
			{/* <NavBar
                color={headerColor}
                ref={navBarRef as React.RefObject<HTMLDivElement>}
                navbarColor={navbarColor}
            /> */}

			<MenuHeader isOpen={isOpenMenu} />
		</div>
	)
}

export default Header
