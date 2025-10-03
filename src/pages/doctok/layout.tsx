import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider, usePopup } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

const LayoutContent = () => {
	const { isOpen } = usePopup()

	return (
		<>
			<ContactPopUp />
			{!isOpen('contact') && <HeaderUpdate />}
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
