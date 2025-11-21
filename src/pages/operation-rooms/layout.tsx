import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
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
			<ContactPopUp />
			<DoctorCardModal />

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
