import { telemedicineCards } from '../shared/data/apartments'

export const TelemedicineApartments = () => {
	const col1 = telemedicineCards.filter(card => card.col === 1)
	const col2 = telemedicineCards.filter(card => card.col === 2)

	const Card = ({
		id,
		title,
		img,
	}: {
		id: string
		title: string
		img: string
	}) => (
		<div className='w-full max-w-[760px]'>
			<img
				src={img}
				alt={title}
				className='w-full h-auto aspect-[1/1] object-cover'
			/>
			<div className='flex items-center gap-8'>
				<h2 className='text-[80px] sm:text-[120px] lg:text-[160px] leading-[105%] text-[#B59158] uppercase mt-[-4rem]'>
					{id}
				</h2>
				<h3
					className={`text-sm sm:text-base 2xl:text-[21px] leading-[155%] text-white uppercase
						${id === '03' ? 'mt-5' : 'mt-0'}`}
				>
					{title}
				</h3>
			</div>
		</div>
	)

	return (
		<div className='relative w-full bg-[#1D1D1D] px-20 2xl:px-[120px] py-[220px] flex justify-between overflow-hidden gap-20 xl:gap-[160px]'>
			<img src='/pattern1.svg' alt='' className='absolute right-0 top-0' />
			<img src='/pattern2.svg' alt='' className='absolute left-0 -top-32' />

			<div className='relative z-10 flex flex-col gap-24'>
				{col1.map(card => (
					<Card key={card.id} {...card} />
				))}
			</div>
			<div className='relative z-10 flex flex-col gap-24 mt-[380px]'>
				{col2.map(card => (
					<Card key={card.id} {...card} />
				))}
			</div>
		</div>
	)
}
