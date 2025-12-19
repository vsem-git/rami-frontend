export const POPUP_NAMES = {
	CONTACT: 'contact',
	DOCTOR_CARD: 'doctorCard',
	DOCTOR_CARD_ID: 'doctorCardId',
	DOCTORS: 'doctors',
	DOCTORS_EDUCATION: 'doctorEducation',
	DOCTORS_EXPERIENCE: 'doctorExperience',
	DOCTOR_RESULTS: 'doctorResults',
	DOCTOR_EDUCATION: 'doctorEducation',
	DOCTOR_SURGERY_PATH: 'doctorSurgeryPath',
	UNIVERSAL_MODAL: 'universalModal',
	
} as const

export type PopupName = keyof typeof POPUP_NAMES
