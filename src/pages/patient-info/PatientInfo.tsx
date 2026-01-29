import { useParams } from 'react-router-dom'
import { usePopup } from '../../components/PopupContext'
import { patientInfoData } from '../../shared/data/patient'

interface BaseSection {
	id: number
	title?: string
	content: string[]
}

interface LicenseSection extends BaseSection {
	gallery: string[]
}

const isLicenseSection = (
	section: BaseSection,
	id: string,
): section is LicenseSection => {
	return id === 'license' && 'gallery' in section
}

export const PatientInfo = () => {
	const { id } = useParams()
	const { openPopup } = usePopup()

	if (!id) {
		return (
			<div className='w-full h-auto pt-[120px] sm:pt-[140px] xl:pt-[210px] max-w-[720px] xl:max-w-[1080px] mx-auto mb-20 px-4'>
				<h1 className='text-xl sm:text-2xl lg:text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase'>
					Документ не найден
				</h1>
			</div>
		)
	}

	const getSelectionData = () => {
		switch (id) {
			case 'user-agreement':
				return {
					data: patientInfoData.selection2,
					title: 'Пользовательское соглашение об использовании сайта',
				}
			case 'privacy-policy':
				return {
					data: patientInfoData.selection3,
					title: 'Политика в отношении обработки персональных данных',
				}
			case 'cookie-agreement':
				return {
					data: patientInfoData.selection4,
					title: 'Соглашение об использовании cookie-файлов',
				}
			case 'license':
				return {
					data: patientInfoData.selection5,
					title: 'Лицензия',
				}
			default:
				return null
		}
	}

	const selectionData = getSelectionData()

	const openGallery = (index: number) => {
		if (id === 'license' && selectionData?.data[0]) {
			const firstSection = selectionData.data[0]
			if (isLicenseSection(firstSection, id)) {
				openPopup('licenseGallery', {
					images: firstSection.gallery,
					initialIndex: index,
				})
			}
		}
	}

	if (!selectionData) {
		return (
			<div className='w-full h-auto pt-[120px] sm:pt-[140px] xl:pt-[210px] max-w-[720px] xl:max-w-[1080px] mx-auto mb-20 px-4'>
				<h1 className='text-xl sm:text-2xl lg:text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase'>
					Документ не найден
				</h1>
			</div>
		)
	}

	return (
		<div className='w-full h-auto pt-[120px] sm:pt-[140px] xl:pt-[210px] max-w-[720px] xl:max-w-[1080px] mx-auto mb-20 px-4'>
			<h1 className='text-xl sm:text-2xl lg:text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase'>
				{selectionData.title}
			</h1>

			{selectionData.data.map((section, sectionIndex) => (
				<div key={section.id || sectionIndex}>
					{id !== 'license' && section.title && (
						<h3 className='text-base md:text-xl text-[#1D1D1D] font-semibold uppercase my-8'>
							{section.title}
						</h3>
					)}

					<div className='text-[11px] sm:text-sm md:text-lg text-[#1D1D1D] uppercase space-y-4 md:space-y-8 mt-12 md:mt-16'>
						{section.content.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>

					{isLicenseSection(section, id) && section.gallery && (
						<div className='mt-8 sm:mt-12'>
							<div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center'>
								{section.gallery.map((imgSrc, imgIndex) => (
									<img
										key={imgIndex}
										src={imgSrc}
										alt={`Лицензия ${imgIndex + 1}`}
										className='w-full cursor-pointer hover:opacity-90 transition-opacity'
										onClick={() => openGallery(imgIndex)}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	)
}
