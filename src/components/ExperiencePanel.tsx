import { POPUP_NAMES } from '../constants/popupNames'
import ModalPanel from './ModalPanel'

interface ExperienceItem {
	year?: string
	description: string | string[]
}

interface ExperiencePanelProps {
	experienceData: ExperienceItem[]
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({
	experienceData,
}) => {
	const content = (
		<>
			{experienceData.map((item, idx) => (
				<div
					key={idx}
					className={`flex flex-col border-t border-[#FFFFFF80] ${
						idx === 0 ? 'py-6 md:py-8 xl:py-16' : 'py-8 xl:py-16'
					}`}
				>
					{item.year && (
						<h4 className='text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase mb-4'>
							{item.year}
						</h4>
					)}

					{Array.isArray(item.description) ? (
						item.description.map((desc, i) => (
							<p
								key={i}
								className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase mb-4 max-w-full sm:max-w-[342px] md:max-w-full'
							>
								{desc}
							</p>
						))
					) : (
						<p className='text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase mb-4 max-w-full sm:max-w-[342px] md:max-w-full'>
							{item.description}
						</p>
					)}
				</div>
			))}
		</>
	)

	return (
		<ModalPanel
			popupName={POPUP_NAMES.DOCTORS_EXPERIENCE}
			title='Опыт работы'
			content={content}
		/>
	)
}

export default ExperiencePanel
