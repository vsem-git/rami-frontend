import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import Footer from '../../components/Footer'
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
					<Footer />
				</ScrollSmoother>
			</HeaderProvider>
		</PopupProvider>
	)
}

export default Layout
