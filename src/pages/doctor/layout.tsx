import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import { DoctorResultEffect } from '../../components/DoctorResultEffect'
import EducationPanel from '../../components/EducationPanel'
import ExperiencePanel from '../../components/ExperiencePanel'
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
		isOpen(POPUP_NAMES.CONTACT) ||
		isOpen(POPUP_NAMES.DOCTOR_CARD) ||
		isOpen(POPUP_NAMES.DOCTORS_EDUCATION) ||
		isOpen(POPUP_NAMES.DOCTORS_EXPERIENCE)

	useEffect(() => {
		const welcomeSection = document.querySelector(
			'[aria-label="Приветствие и информация о докторе"]'
		)
		const cardsSection = document.querySelector(
			'[aria-label="Фоновое изображение"]'
		)
		const videoSection = document.querySelector('video')
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
				onEnter: () => setUseWhiteText(false),
				onLeaveBack: () => setUseWhiteText(true),
				scroller: smootherWrapper,
			})
		)

		if (cardsSection) {
			triggers.push(
				ScrollTrigger.create({
					trigger: cardsSection,
					start: 'center center',
					end: 'bottom top',
					onEnter: () => setUseWhiteText(true),
					onLeaveBack: () => setUseWhiteText(true),
					scroller: smootherWrapper,
				})
			)
		}

		if (videoSection) {
			triggers.push(
				ScrollTrigger.create({
					trigger: videoSection,
					start: 'top center',
					onEnter: () => setUseWhiteText(true),
					onLeaveBack: () => setUseWhiteText(false),
					scroller: smootherWrapper,
				})
			)
		}

		if (contactFooterSection) {
			triggers.push(
				ScrollTrigger.create({
					trigger: contactFooterSection,
					start: 'top center',
					onEnter: () => setUseWhiteText(false),
					onLeaveBack: () => setUseWhiteText(true),
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
					onLeaveBack: () => setUseWhiteText(false),
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
			<DoctorResultEffect />
			<EducationPanel />
			<ExperiencePanel />

			{!isAnyPopupOpen && <HeaderUpdate useWhiteText={useWhiteText} />}

			<ScrollSmoother>
				<Outlet />

				{/* {isMobile && (
					<div className='min-h-[600px] sm:min-h-[700px] flex items-center justify-center footer-content '>
						<ContactOpenBoxFooter />
					</div>
				)} */}

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
