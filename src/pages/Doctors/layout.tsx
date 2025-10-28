import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorsModal } from '../../components/DoctorsModal'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

const Layout = () => {
	return (
		<PopupProvider>
			<HeaderProvider>
				<div className='bgpattern1 fixed top-0 right-0 h-full hidden sm:block opacity-50 z-[0]'>
					<img
						src='/pattern1.svg'
						alt='teambg'
						className='h-full object-cover overflow-visible'
					/>
				</div>
				<div className='bgpattern2 fixed top-0 left-0 h-full opacity-50 z-[0]'>
					<img
						src='/pattern2.svg'
						alt='teambg'
						className='h-full object-cover overflow-visible'
					/>
				</div>

				<ContactPopUp />
				<DoctorsModal />

				<HeaderUpdate useWhiteText={false} />
				<ScrollSmoother>
					<Outlet />
					<Footer />
				</ScrollSmoother>
			</HeaderProvider>
		</PopupProvider>
	)
}

export default Layout
