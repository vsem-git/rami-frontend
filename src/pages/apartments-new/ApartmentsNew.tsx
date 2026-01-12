import { DetailsInfoApartmentsNew } from '../../components/DetailsInfoApartmentsNew'
import { PicturesqueWednesdayApartmentsNew } from '../../components/PicturesqueWednesdayApartmentsNew'
import { SafetyApartmentsNew } from '../../components/SafetyApartmentsNew'
import { ServiceApartmentsNew } from '../../components/ServiceApartmentsNew'
import { TechnologiesApartmentsNew } from '../../components/TechnologiesApartmentsNew'
import { WelcomeApartmentsNew } from '../../components/WelcomeApartmentsNew'


export const ApartmentsNew = () => {
	return (
		<div className='bg-[#1D1D1D]'>
			<WelcomeApartmentsNew />
			<SafetyApartmentsNew />
			<TechnologiesApartmentsNew />
			<DetailsInfoApartmentsNew />
			<ServiceApartmentsNew />
			<PicturesqueWednesdayApartmentsNew />
			{/* <AquamarineApartmentsNew /> */}
		</div>
	)
}
