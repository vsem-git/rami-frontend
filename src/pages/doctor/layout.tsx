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

		if (!welcomeSection || !videoSection) return

		const smootherWrapper = document.querySelector('.smooth-wrapper')

		const updateHeaderColor = (white: boolean) => {
			const widthMd = window.innerWidth >= 768
			if (widthMd && cardsSection && ScrollTrigger.isInViewport(cardsSection)) {
				setUseWhiteText(true)
			} else if (widthMd) {
				setUseWhiteText(false)
			} else {
				setUseWhiteText(white)
			}
		}

		const trigger1 = ScrollTrigger.create({
			trigger: welcomeSection,
			start: 'bottom top+=10%',
			onEnter: () => updateHeaderColor(false),
			onLeaveBack: () => updateHeaderColor(true),
			scroller: smootherWrapper,
		})

		const trigger2 = ScrollTrigger.create({
			trigger: videoSection,
			start: 'top center',
			onEnter: () => setUseWhiteText(true),
			onLeaveBack: () => setUseWhiteText(false),
			scroller: smootherWrapper,
		})

		const trigger5 = ScrollTrigger.create({
			trigger: cardsSection,
			start: 'top center',
			onEnter: () => {
				if (window.innerWidth < 768) setUseWhiteText(false)
			},
			onLeaveBack: () => {
				if (window.innerWidth < 768) setUseWhiteText(true)
			},
			scroller: smootherWrapper,
		})

		let trigger3: ScrollTrigger | null = null
		if (contactFooterSection) {
			trigger3 = ScrollTrigger.create({
				trigger: contactFooterSection,
				start: 'top center',
				onEnter: () => setUseWhiteText(false),
				onLeaveBack: () => setUseWhiteText(true),
				scroller: smootherWrapper,
			})
		}

		const trigger4 = ScrollTrigger.create({
			trigger: footerSection,
			start: 'top center',
			onEnter: () => setUseWhiteText(true),
			onLeaveBack: () => setUseWhiteText(false),
			scroller: smootherWrapper,
		})

		return () => {
			trigger5.kill()
			trigger2.kill()
			trigger3?.kill()
			trigger4.kill()
			trigger1.kill()
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
