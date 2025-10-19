import { gsap } from 'gsap'
import { useRef, useState } from 'react'
import { useHeader } from './HeaderContext'
import { MenuHeader } from './MenuHeader'
import UnderlinedText from './UnderlinedText/UnderlinedText'

interface HeaderUpdateProps {
	useWhiteText?: boolean
}

const HeaderUpdate = ({ useWhiteText = true }: HeaderUpdateProps) => {
	const { headerColor } = useHeader()
	const headerRef = useRef(null)
	const logoRef = useRef(null)
	const menuButtonRef = useRef(null)
	const topLineRef = useRef(null)
	const bottomLineRef = useRef(null)
	const [isOpenMenu, setOpenMenu] = useState(false)

	const currentColor = useWhiteText ? '#ffffff' : headerColor || '#000000'

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

	const logoSrc = useWhiteText ? '/logo_white.webp' : '/logo_black.webp'

	return (
		<div
			ref={headerRef}
			className='fixed top-0 left-0 right-0 z-[9999] py-[16px] md:py-[20px] 2xl:py-[40px] md:px-[24px] sm:px-[16px] px-[16px] 2xl:px-[40px] grid grid-cols-3 justify-between items-center'
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
					className='theme hidden text-[13px] xl:text-base relative sm:block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full'
					style={{
						color: currentColor,
						transition: 'color 0.3s ease-in-out',
					}}
				>
					{isOpenMenu ? 'ЗАКРЫТЬ' : 'МЕНЮ'}
				</div>
			</div>

			<div className='item-wrapper flex justify-center items-center relative h-[60px]'>
				<div
					className='logo logoheader w-[100px] h-[81px] 2xl:w-[149px] 2xl:h-[120px] absolute z-[999]'
					ref={logoRef}
				>
					<div className='relative'>
						<div
							className='absolute inset-0 w-[100px] h-[81px] 2xl:w-[149px] 2xl:h-[120px] bg-black/15 blur-[30px] z-0'
							style={{
								opacity: useWhiteText ? 1 : 0,
								transition: 'opacity 0.3s ease-in-out',
							}}
						></div>

						<img
							src={logoSrc}
							alt='logo'
							className='absolute inset-0 w-[100px] h-[81px] 2xl:w-[149px] 2xl:h-[120px]'
							style={{ transition: 'opacity 0.3s ease-in-out', opacity: 1 }}
						/>
					</div>
				</div>
			</div>

			<div
				className='item visitheader font-semibold justify-end hidden md:flex cursor-pointer text-[13px] xl:text-base'
				style={{ color: currentColor }}
			>
				<style>{`.theme *:after { background-color: ${currentColor}; } .theme:after { background-color: ${currentColor}; }`}</style>
				<UnderlinedText className='theme'>ЗАПЛАНИРОВАТЬ ВИЗИТ</UnderlinedText>
			</div>

			<MenuHeader isOpen={isOpenMenu} />
		</div>
	)
}

export default HeaderUpdate
