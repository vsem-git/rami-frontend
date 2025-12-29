import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider, usePopup } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'
import { POPUP_NAMES } from '../../constants/popupNames'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	const location = useLocation()

	useEffect(() => {
		const bgpattern1 = document.querySelector('.bgpattern1') as HTMLElement
		const bgpattern2 = document.querySelector('.bgpattern2') as HTMLElement
		bgpattern1.style.transform = 'translateX(120%)'
		bgpattern2.style.transform = 'translateX(-120%)'
	}, [location.pathname])

	const { isOpen } = usePopup()
	const [useWhiteText, setUseWhiteText] = useState(true)

	const isAnyPopupOpen =
		isOpen(POPUP_NAMES.CONTACT) || isOpen(POPUP_NAMES.DOCTOR_CARD)

	useEffect(() => {
		const welcomeSection = document.querySelector('#welcome-operation')
		const safetySection = document.querySelector('#safety-operation')
		const safetySectionTel = document.querySelector('#telemedicine-section')
		const contactFooterSection = document.querySelector(
			'.contact-footer-trigger'
		)
		const footerSection = document.querySelector('.footer-content')
		const smootherWrapper = document.querySelector('.smooth-wrapper')

		if (!welcomeSection) return

		const triggers: ScrollTrigger[] = []

		triggers.push(
			ScrollTrigger.create({
				trigger: welcomeSection,
				start: 'top top',
				end: 'bottom top',
				onEnter: () => setUseWhiteText(true),
				onLeaveBack: () => setUseWhiteText(true),
				scroller: smootherWrapper,
			})
		)

		if (safetySection) {
			triggers.push(
				ScrollTrigger.create({
					trigger: safetySection,
					start: 'top center',
					end: 'bottom top',
					onEnter: () => setUseWhiteText(false),
					onLeaveBack: () => setUseWhiteText(true),
					scroller: smootherWrapper,
				})
			)
		}
		if (safetySectionTel) {
			triggers.push(
				ScrollTrigger.create({
					trigger: safetySectionTel,
					start: 'top center',
					end: 'bottom top',
					onEnter: () => setUseWhiteText(false),
					onLeaveBack: () => setUseWhiteText(true),
					scroller: smootherWrapper,
				})
			)
		}

		if (contactFooterSection) {
			triggers.push(
				ScrollTrigger.create({
					trigger: contactFooterSection,
					start: 'top center',
					onEnter: () => setUseWhiteText(true),
					onLeaveBack: () => setUseWhiteText(false),
					scroller: smootherWrapper,
				})
			)
		}

		if (footerSection) {
			triggers.push(
				ScrollTrigger.create({
					trigger: footerSection,
					start: 'top center',
					onEnter: () => setUseWhiteText(true),
					onLeaveBack: () => setUseWhiteText(true),
					scroller: smootherWrapper,
				})
			)
		}

		return () => {
			triggers.forEach(t => t.kill())
		}
	}, [])

	return (
		<>
			<div className='bgpattern1 fixed top-0 right-0 h-full hidden sm:block opacity-50 z-[0]'>
				<img
					src='/pattern1.svg'
					alt='teambg'
					className='h-full object-cover overflow-visible'
				/>
			</div>
			<div className='bgpattern2 fixed top-0 left-0 h-full hidden sm:block opacity-50 z-[0]'>
				<img
					src='/pattern2.svg'
					alt='teambg'
					className='h-full object-cover overflow-visible'
				/>
			</div>
			<ContactPopUp />
			<DoctorCardModal modalResults={[]} onSelect={item => console.log(item)} />

			{!isAnyPopupOpen && <HeaderUpdate useWhiteText={useWhiteText} />}

			<ScrollSmoother>
				<Outlet />
				<Footer />
			</ScrollSmoother>
		</>
	)
}

const Layout = () => {
	return (
		<PopupProvider>
			<HeaderProvider>
				<LayoutContent />
			</HeaderProvider>
		</PopupProvider>
	)
}

export default Layout
