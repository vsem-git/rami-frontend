import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Header from '../../components/Header'
import { HeaderProvider } from '../../components/HeaderContext'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'
import Footer from '../../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	return (
		<>
			<ContactPopUp />
			<Header />
			<DoctorCardModal modalResults={[]} modalProfessionalDev={[]} modalEducation={[]} onSelect={item => console.log(item)} />

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
