import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InfoSafetyNew } from '../../components/InfoSafetyNew'
import { MedicalSafety } from './components/MedicalSafety'
import { PhysicalSecuritySafety } from './components/PhysicalSecuritySafety'
import { WelcomeSafety } from './components/WelcomeSafety/WelcomeSafety'

gsap.registerPlugin(ScrollTrigger)

export const Safety = () => {
	return (
		<div>
			<WelcomeSafety />
			<section id='medical-safety-section'>
				<MedicalSafety />
			</section>
			{/* <InfoSafety /> */}
			<InfoSafetyNew />
			<PhysicalSecuritySafety />
		</div>
	)
}
