import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'

const LayoutContent = () => {
	return (
		<>
			<ContactPopUp />
			<HeaderUpdate useWhiteText={false} isRelative={true} />
			<DoctorCardModal modalResults={[]} onSelect={item => console.log(item)} />

			<Outlet />
			<Footer />
		</>
	)
}

const Layout = () => {
	return (
		<PopupProvider>
			<LayoutContent />
		</PopupProvider>
	)
}

export default Layout
