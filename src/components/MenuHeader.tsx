import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import {
	footerLinks,
	mainMenuLinks,
	patientLinks1,
	patientLinks2,
} from '../shared/data/header'

interface MenuHeaderProps {
	isOpen: boolean
}

export const MenuHeader = ({ isOpen }: MenuHeaderProps) => {
	const menuRef = useRef<HTMLDivElement>(null)
	const patientBlockRef = useRef<HTMLDivElement>(null)
	const [isPatientOpen, setIsPatientOpen] = useState(false)

	useEffect(() => {
		if (!menuRef.current) return

		if (isOpen) {
			gsap.fromTo(
				menuRef.current,
				{ x: '-100%', autoAlpha: 0 },
				{ x: '0%', autoAlpha: 1, duration: 0.6, ease: 'power3.out' }
			)
		} else {
			gsap.to(menuRef.current, {
				x: '-100%',
				autoAlpha: 0,
				duration: 0.5,
				ease: 'power3.in',
			})
		}
	}, [isOpen])

	useEffect(() => {
		if (!patientBlockRef.current) return

		const el = patientBlockRef.current

		if (isPatientOpen) {
			el.style.display = 'flex'

			gsap.fromTo(
				el,
				{ height: 0, opacity: 0, scaleY: 0.8, transformOrigin: 'top center' },
				{
					height: 'auto',
					opacity: 1,
					scaleY: 1,
					duration: 0.6,
					ease: 'power3.out',
				}
			)
		} else {
			gsap.to(el, {
				height: 0,
				opacity: 0,
				scaleY: 0.8,
				duration: 0.5,
				ease: 'power3.in',
				onComplete: () => {
					el.style.display = 'none'
				},
			})
		}
	}, [isPatientOpen])

	const togglePatientBlock = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		setIsPatientOpen(prev => !prev)
	}

	const underlineClass =
		'absolute left-0 -bottom-1 h-[1.5px] bg-white transition-all duration-300 w-0 group-hover:w-full'

	return (
		<div
			ref={menuRef}
			className='fixed top-0 left-0 w-full md:w-1/2 h-screen bg-[#1d1d1d] z-50 overflow-auto'
			style={{
				transform: 'translateX(-100%)',
				opacity: 0,
				pointerEvents: isOpen ? 'auto' : 'none',
			}}
		>
			<nav className='flex flex-col gap-2 mt-[200px] pl-5 md:pl-14 xl:pl-[100px]'>
				{mainMenuLinks.map((item, index) => (
					<a
						key={index}
						href='#'
						className='inline-block relative cursor-pointer select-none group'
						style={{ textTransform: 'uppercase' }}
					>
						<span className='relative inline-block text-[18px] md:text-[21px] lg:text-[28px] 2xl:text-4xl leading-[150%] text-white z-10'>
							{item}
							<span className={underlineClass} />
						</span>
					</a>
				))}

				<a
					href='#'
					onClick={togglePatientBlock}
					className='inline-flex relative items-center gap-4 text-[18px] md:text-[21px] lg:text-[28px] 2xl:text-4xl leading-[150%] text-white uppercase cursor-pointer select-none group'
				>
					<span className='relative z-10 inline-block'>
						Пациентам
						<span
							className={`absolute left-0 -bottom-1 h-[1.5px] bg-white transition-all duration-300 ${
								isPatientOpen ? 'w-full' : 'w-0 group-hover:w-full'
							}`}
							style={{ zIndex: 0 }}
						/>
					</span>
					<img
						src='/plus.svg'
						alt='plus'
						className='w-8 h-8 transition-transform duration-300'
						style={{
							transform: isPatientOpen ? 'rotate(45deg)' : 'rotate(0deg)',
							filter: 'invert(50%) opacity(0.3)',
						}}
					/>
				</a>
			</nav>

			<div
				ref={patientBlockRef}
				style={{
					height: 0,
					overflow: 'hidden',
					display: 'none',
					opacity: 0,
					transformOrigin: 'top center',
					transform: 'scaleY(1)',
				}}
				className='w-full bg-[#691C32] mt-10 pl-5 md:pl-14 xl:pl-[100px]'
			>
				<div className='flex flex-col lg:flex-row gap-10 py-10'>
					<div className='w-full xl:w-[250px] 2xl:w-[352px]'>
						<ul className='flex flex-col gap-4 text-sm 2xl:text-base leading-[155%] text-white uppercase cursor-pointer'>
							{patientLinks1.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
					<div className='w-full xl:w-[250px] 2xl:w-[352px]'>
						<ul className='flex flex-col gap-4 text-sm 2xl:text-base leading-[155%] text-white uppercase cursor-pointer'>
							{patientLinks2.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-4 mt-20 pl-5 md:pl-14 xl:pl-[100px]'>
				{footerLinks.map((item, index) => (
					<a
						key={index}
						href='#'
						className='inline-block relative cursor-pointer select-none group'
						style={{ textTransform: 'uppercase' }}
					>
						<span className='relative inline-block text-base leading-[155%] text-white z-10'>
							{item}
							<span className={underlineClass} />
						</span>
					</a>
				))}
			</div>
		</div>
	)
}
