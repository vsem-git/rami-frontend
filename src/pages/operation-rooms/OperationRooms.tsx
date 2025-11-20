import { useRef } from 'react'
import { InfoOperationRooms } from '../../components/InfoOperationRooms'
import { SafetyOperationRooms } from '../../components/SafetyOperationRooms/SafetyOperationRooms'
import { SafetyOperationRoomsMobile } from '../../components/SafetyOperationRooms/SafetyOperationRoomsMobile'
import { TelemedicineOperationRooms } from '../../components/TelemedicineOperationRooms'
import { WelcomeOperationRooms } from '../../components/WelcomeOperationRooms/WelcomeOperationRooms'

export const OperationRooms = () => {
	const photoRef = useRef<HTMLDivElement | null>(null)

	return (
		<>
			<WelcomeOperationRooms nextPhotoRef={photoRef} />
			<SafetyOperationRooms />
			<SafetyOperationRoomsMobile />
			<TelemedicineOperationRooms />
			<InfoOperationRooms />
		</>
	)
}
