import type { ICardDoctorAge } from '../types/doctor'

export const DOCTOR = [
	{
		id: 1,
		content: (
			<>
				<p className='text-[clamp(1.125rem,2vw,2.25rem)]/[125%] text-[#1D1D1D] md:text-white font-normal uppercase w-full md:max-w-[616px] xl:max-w-[920px]'>
					Профессионал со стажем работы в специальности 29 лет, блестящий
					специалист в области пластической хирургии, известный далеко за
					пределами России. Виртуозный мастер хирургической коррекции возрастных
					и посттравматических изменений лица и тела. Ежегодно выполняет более
					300 операций высокой степени сложности. Одно из главных направлений -
					комплексное омоложение лица.
				</p>
			</>
		),
	},
]

export const cardData: ICardDoctorAge[] = [
	{
		year: '1995',
		title: 'Университет',
		description: '1995',
		image: '/doctor-screen/age/card1.webp',
		backgroundYear: '1995',
		imageClassName:
			'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
	},
	{
		year: '1997',
		title: '6 курс университета. Субординатура.',
		description: '1997',
		image: '/doctor-screen/age/card4.webp',
		backgroundYear: '1997',
		imageClassName:
			'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
	},
	{
		year: '2006',
		title:
			'Альма-Матер. Мурманская областная больница. Отделение микрохирургии',
		description: '2006',
		image: '/doctor-screen/age/card5.webp',
		backgroundYear: '2006',
		imageClassName:
			'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
	},
	{
		year: '1998 -2008',
		title: 'Опыт работы в ургентной и плановой микрохирургии',
		description: '1998 -2008',
		image: '/doctor-screen/age/card2.webp',
		backgroundYear: '2008',
		imageClassName:
			'w-[323px] md:w-[450px] xl:w-[593px] h-[216px] md:h-[280px] xl:h-[396px]',
	},
	{
		year: '2016',
		title: 'Работа в клинике рами',
		description: '2016',
		image: '/doctor-screen/age/card3.webp',
		backgroundYear: '2016',
		imageClassName:
			'w-[323px] md:w-[380px] xl:w-[449px] h-[216px] md:h-[250px] xl:h-[300px]',
	},
]
