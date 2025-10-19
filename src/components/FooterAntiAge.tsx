import { ANTIAGE } from '../shared/data/antiage'

export const FooterAntiAge = () => {
	return (
		<div className='relative w-full h-screen overflow-hidden '>
			<div className="absolute top-0 bg-[10%_0%] w-full h-full bg-[url('/antiage-screen/anti-age.png')] bg-no-repeat bg-cover will-change-transform" />

			<div
				className="
					absolute w-full min-h-[775px] left-0
					will-change-transform bg-[url('/antiage-screen/image2.png')] 
					bg-no-repeat bg-cover bg-center
					anti-age_bg
				"
			/>

			<h2
				className='
					text-[38.4px] font-normal uppercase whitespace-nowrap
					absolute top-[3rem] smx:top-[6rem] left-0
					text-[#1D1D1D4D] 
				'
			>
				Антиэйдж
			</h2>
			<h3
				className='
					text-base font-normal uppercase whitespace-nowrap
					absolute top-[30%] left-[40%] smx:left-[35%]
					text-[#FFFFFF99] 
					-translate-x-20
				'
			>
				Генетический <br />
				паспорт
			</h3>
			<h3
				className='
					text-[25px] font-normal uppercase whitespace-nowrap
					absolute top-[15%] smx:top-[25%] left-[56%] smx:left-0
					text-[#FFFFFF4D] 
				'
			>
				гормоны
			</h3>
			<h3
				className='
					text-[12.8px] font-normal uppercase whitespace-nowrap
					absolute top-[45%] left-[80%] smx:left-[20%]
					text-[#FFFFFFBF] 
					-translate-x-20
				'
			>
				Регенеративная <br />
				Медицина
			</h3>
			<h3
				className='
					text-[11.2px] font-normal uppercase whitespace-nowrap
					absolute bottom-[31%] left-[34%]
					text-[#FFFFFFBF] 
					-translate-x-20
				'
			>
				клеточное <br />
				омоложение
			</h3>

			<div
				className={`
					smx:flex hidden
					absolute right-0 top-1/2 transform -translate-y-1/2
					w-1/2 max-w-[500px]
					 items-center justify-center
				`}
			>
				<div>{ANTIAGE[6].content}</div>
			</div>
		</div>
	)
}
