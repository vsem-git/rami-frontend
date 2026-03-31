import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import FooterUpdate from '../../components/FooterUpdate'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider, usePopup } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
	const { isOpen } = usePopup()

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

	return (
		<>
			<ContactPopUp />
			<DoctorCardModal modalResults={[]} modalProfessionalDev={[]} modalEducation={[]} onSelect={item => console.log(item)} />
			{!isOpen('contact') && <HeaderUpdate />}

			<ScrollSmoother>
				<Outlet />

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
