import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider, usePopup } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'
import { POPUP_NAMES } from '../../constants/popupNames'

import { useEffect, useState } from 'react'
import { ContactOpenBoxFooter } from '../../components/ContactOpenBoxFooter'
import FooterUpdate from '../../components/FooterUpdate'

const LayoutContent = () => {
	const { isOpen } = usePopup()
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<>
			<ContactPopUp />
			<DoctorCardModal />

			{!isOpen(POPUP_NAMES.CONTACT) && !isOpen(POPUP_NAMES.DOCTOR_CARD) && (
				<HeaderUpdate />
			)}

			<ScrollSmoother>
				<Outlet />
				<div className='min-h-[600px] sm:min-h-[700px] flex items-center justify-center'>{isMobile && <ContactOpenBoxFooter />}</div>
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
