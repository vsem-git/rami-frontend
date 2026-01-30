import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContactPopUp from '../../components/ContactPopUp'
import { DoctorCardModal } from '../../components/DoctorCardModal'
import Footer from '../../components/Footer'
import { HeaderProvider } from '../../components/HeaderContext'
import HeaderUpdate from '../../components/HeaderUpdate'
import { PopupProvider } from '../../components/PopupContext'
import ScrollSmoother from '../../components/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger)

const LayoutContent = () => {
	const [useWhiteHeader, setUseWhiteHeader] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			const section2 = document.getElementById('patient-section2')
			const section3 = document.getElementById('patient-section3')
			const contactFooterSection = document.querySelector(
				'.contact-footer-trigger',
			)
			const footerSection = document.querySelector('.footer-content')
			const smootherWrapper = document.querySelector('.smooth-wrapper')

			if (!section2 && !section3 && !contactFooterSection && !footerSection) {
				return
			}

			const triggers: ScrollTrigger[] = []

			if (section2) {
				triggers.push(
					ScrollTrigger.create({
						trigger: section2,
						start: 'top 20%',
						onEnter: () => {
							setUseWhiteHeader(true)
						},
						onLeaveBack: () => {
							setUseWhiteHeader(false)
						},
						scroller: smootherWrapper,
					}),
				)
			}

			if (section3) {
				triggers.push(
					ScrollTrigger.create({
						trigger: section3,
						start: 'bottom 80%',
						onEnter: () => {
							setUseWhiteHeader(false)
						},
						onLeaveBack: () => {
							setUseWhiteHeader(true)
						},
						scroller: smootherWrapper,
					}),
				)
			}

			if (contactFooterSection) {
				triggers.push(
					ScrollTrigger.create({
						trigger: contactFooterSection,
						start: 'top center',
						onEnter: () => {
							setUseWhiteHeader(false)
						},
						onLeaveBack: () => {
							setUseWhiteHeader(true)
						},
						scroller: smootherWrapper,
					}),
				)
			}

			if (footerSection) {
				triggers.push(
					ScrollTrigger.create({
						trigger: footerSection,
						start: 'top center',
						onEnter: () => {
							setUseWhiteHeader(true)
						},
						onLeaveBack: () => {
							setUseWhiteHeader(false)
						},
						scroller: smootherWrapper,
					}),
				)
			}

			return () => {
				triggers.forEach(t => t.kill())
				clearTimeout(timer)
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<ContactPopUp />
			<HeaderUpdate useWhiteText={useWhiteHeader} />
			<DoctorCardModal modalResults={[]} onSelect={item => console.log(item)} />

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
