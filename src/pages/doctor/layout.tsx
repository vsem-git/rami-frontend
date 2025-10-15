import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ContactOpenBoxFooter } from '../../components/ContactOpenBoxFooter'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import FooterUpdate from '../../components/FooterUpdate'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider, usePopup } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'
import { POPUP_NAMES } from '../../constants/popupNames'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	const { isOpen } = usePopup()
	const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
	const [useWhiteText, setUseWhiteText] = useState(true)

	const handleResize = useCallback(() => {
		setIsMobile(prev => {
			const next = window.innerWidth <= 768
			return prev === next ? prev : next
		})
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	const isAnyPopupOpen =
		isOpen(POPUP_NAMES.CONTACT) || isOpen(POPUP_NAMES.DOCTOR_CARD)

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
					start: 'top center',
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

			{!isAnyPopupOpen && <HeaderUpdate useWhiteText={useWhiteText} />}

			<ScrollSmoother>
				<Outlet />

				{isMobile && (
					<div className='min-h-[600px] sm:min-h-[700px] flex items-center justify-center footer-content '>
						<ContactOpenBoxFooter />
					</div>
				)}

				{isMobile ? <FooterUpdate /> : <Footer />}
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
