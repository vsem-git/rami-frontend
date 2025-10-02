import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import FooterUpdate from '../../components/FooterUpdate'
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
				<FooterUpdate />
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
