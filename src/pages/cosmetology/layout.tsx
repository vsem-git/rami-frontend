import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import FooterUpdate from '../../components/FooterUpdate'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

const Layout = () => {
	return (
		<PopupProvider>
			<HeaderProvider>
				<ContactPopUp />
				<HeaderUpdate />
				<ScrollSmoother>
					<Outlet />
					<FooterUpdate />
				</ScrollSmoother>
			</HeaderProvider>
		</PopupProvider>
	)
}

export default Layout
