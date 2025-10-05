import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider, usePopup } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'
import { POPUP_NAMES } from '../../constants/popupNames'

const LayoutContent = () => {
	const { isOpen } = usePopup()

	return (
		<>
			<ContactPopUp />
			<DoctorCardModal />

			{!isOpen(POPUP_NAMES.CONTACT) && !isOpen(POPUP_NAMES.DOCTOR_CARD) && (
				<HeaderUpdate />
			)}
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
