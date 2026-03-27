import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/FooterWithoutAnimation'
import { GalleryModal } from './components/GalleryModal'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	return (
		<>
			<HeaderUpdate useWhiteText={false} />
			<DoctorCardModal modalResults={[]} onSelect={item => console.log(item)} />
			<GalleryModal />
			<ContactPopUp />
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
