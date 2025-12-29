import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

const LayoutContent = () => {
	const [useWhiteText, setUseWhiteText] = useState<boolean>(true)
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		const sectionsToObserve = [
			'safety-apartments-new',
			'service-apartments-new',
		]

		const options = {
			root: document.querySelector('.smooth-wrapper'),
			rootMargin: '-10% 0px -10% 0px',
			threshold: 0.1,
		}

		observerRef.current = new IntersectionObserver(entries => {
			let isDarkSectionVisible = false

			entries.forEach(entry => {
				if (
					entry.isIntersecting &&
					sectionsToObserve.includes(entry.target.id)
				) {
					isDarkSectionVisible = true
				}
			})

			setUseWhiteText(!isDarkSectionVisible)
		}, options)

		sectionsToObserve.forEach(id => {
			const section = document.getElementById(id)
			if (section && observerRef.current) {
				console.log(`Observing section: ${id}`)
				observerRef.current.observe(section)
			} else {
				console.log(`Section ${id} not found`)
			}
		})

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [])

	return (
		<>
			<ContactPopUp />
			<HeaderUpdate useWhiteText={useWhiteText} />

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
