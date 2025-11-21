import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InfoSafety } from '../../components/InfoSafety'
import { MedicalSafety } from '../../components/MedicalSafety'
import { PhysicalSecuritySafety } from '../../components/PhysicalSecuritySafety'
import { WelcomeSafety } from '../../components/WelcomeSafety/WelcomeSafety'

gsap.registerPlugin(ScrollTrigger)

export const Safety = () => {
	return (
		<div>
			<WelcomeSafety />
			<section id='medical-safety-section'>
				<MedicalSafety />
			</section>
			<InfoSafety />
			<PhysicalSecuritySafety />
		</div>
	)
}
