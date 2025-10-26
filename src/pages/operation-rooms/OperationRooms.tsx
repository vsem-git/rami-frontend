import { TelemedicineOperationRooms } from '../../components/TelemedicineOperationRooms'
import { WelcomeOperationRooms } from '../../components/WelcomeOperationRooms/WelcomeOperationRooms'

export const OperationRooms = () => {
	return (
		<>
			<WelcomeOperationRooms />
			<div id='telemedicine-section'>
				<TelemedicineOperationRooms />
			</div>
		</>
	)
}
