import { useState } from 'react'
import { TabItem } from '../../../Doctors/Doctors'
import type { ModalResultItem } from '../../../../shared/types/doctor'
import { Result } from './Result'

interface Tab {
	id: number
	label: string
}

interface DoctorResultsProps {
	directions: string[]
	results: ModalResultItem[]
	onSelect: (item: ModalResultItem) => void
}

const DoctorResults = ({
	directions,
	results,
	onSelect,
}: DoctorResultsProps) => {
	// Не показываем секцию, если нет результатов и направлений
	if ((!results || results.length === 0) && (!directions || directions.length === 0)) {
		return null
	}

	const [processedResults, setProcessedResults] = useState(results || [])

	const TABS: Tab[] = [
		{ id: 0, label: 'Результаты' },
		...directions.map((direction, index) => ({
			id: index + 1,
			label: direction,
		})),
	]

	const [activeTab, setActiveTab] = useState(TABS[0].id)

	const handleActiveTab = (tabId: number) => {
		setActiveTab(tabId)

		if (tabId === 0) {
			setProcessedResults(results || [])
		} else {
			const tabLabel = TABS.find(tab => tab.id === tabId)?.label

			const processedResults = results?.filter(
				result => result.type === tabLabel
			)

			setProcessedResults(processedResults || [])
		}
	}

	return (
		<div className='2xl:pt-[152px] md:pt-[112px] pt-[80px] px-6 sm:px-4 md:px-6 2xl:px-10 md:mb-[120px] xl:mb-[160px] mb-[96px] 2xl:mb-[240px]'>
			<div className='font-semibold leading-[155%] text-[11px] md:text-xs 2xl:text-base flex lg:flex-row flex-col justify-between xl:items-center'>
				<nav className='py-12 md:py-16 2xl:py-20'>
					<ul className='flex gap-10 xl:h-auto h-[48px] items-center uppercase overflow-x-auto whitespace-nowrap scrollbar-hide pb-2'>
						{TABS.map(tab => (
							<TabItem
								key={tab.id}
								tab={tab}
								isActive={activeTab === tab.id}
								onClick={handleActiveTab}
							/>
						))}
					</ul>
				</nav>
			</div>

			<div className='grid md:grid-cols-2 xl:grid-cols-3 gap-3'>
				{processedResults.map((result, index) => (
					<Result
						key={result.id}
						item={result}
						index={index}
						onSelect={() => onSelect(result)}
					/>
				))}
			</div>
		</div>
	)
}

export default DoctorResults
