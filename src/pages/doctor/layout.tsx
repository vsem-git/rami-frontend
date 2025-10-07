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

const LayoutContent = () => {
	const { isOpen } = usePopup()
	const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

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

	return (
		<>
			<ContactPopUp />
			<DoctorCardModal />

			{!isAnyPopupOpen && <HeaderUpdate />}

			<ScrollSmoother>
				<Outlet />

				{isMobile && (
					<div className='min-h-[600px] sm:min-h-[700px] flex items-center justify-center'>
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
