import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import FooterUpdate from '../../components/FooterUpdate'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	return (
		<>
			<ContactPopUp />
			<DoctorCardModal />

			<HeaderUpdate useWhiteText={false} />

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
