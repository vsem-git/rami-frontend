import { InfoOperationRooms } from '../../components/InfoOperationRooms'
import { SafetyOperationRooms } from '../../components/SafetyOperationRooms/SafetyOperationRooms'
import { SafetyOperationRoomsMobile } from '../../components/SafetyOperationRooms/SafetyOperationRoomsMobile'
import { TelemedicineOperationRooms } from '../../components/TelemedicineOperationRooms'
import { WelcomeOperationRooms } from '../../components/WelcomeOperationRooms/WelcomeOperationRooms'

export const OperationRooms = () => {
	return (
		<>
			<WelcomeOperationRooms />
			<div id='telemedicine-section'>
				<SafetyOperationRooms />
				<SafetyOperationRoomsMobile />
			</div>
			<TelemedicineOperationRooms />
			<InfoOperationRooms />
		</>
	)
}
