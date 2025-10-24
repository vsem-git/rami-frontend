import { Outlet } from 'react-router-dom'
import { DoctorsModal } from '../../components/DoctorsModal'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { HeaderProvider } from '../../components/HeaderContext'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

const Layout = () => {
	return (
		<PopupProvider>
			<DoctorsModal />

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
				<Header />
				<ScrollSmoother>
					<Outlet />
					<Footer />
				</ScrollSmoother>
			</HeaderProvider>
		</PopupProvider>
	)
}

export default Layout
