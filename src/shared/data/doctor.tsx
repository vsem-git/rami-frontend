import type { Doctor } from '../types/doctor'

export const DOCTORS_DATA: Doctor[] = [
	{
		image: '/swiper1.webp',
		video: '/serb.gif',
		specialties: ['ГЛАВНЫЙ ВРАЧ', 'Пластический хирург'],
		lastName: 'Серб',
		firstName: 'Ирина Анатольевна',
		link: '/doctor',
		videoFooterIm: '/serb-short.webm',
		videoFooterMp: '/serb-short.mp4',
		id: 'serb-irina',
		cards: [
			'/doctor-screen/card1.webp',
			'/doctor-screen/card2.webp',
			'/doctor-screen/card3.webp',
		],
		modalProfessionalDev: [
			{
				year: '1988 — 2008',
				description: [
					'ОПЫТ РАБОТЫ В УРГЕНТНОЙ И ПЛАНОВОЙ МИКРОХИРУРГИИ ПОСЛУЖИЛ ТОЙ ОСНОВОЙ ДЛЯ РАЗВИТИЯ МАНУАЛЬНЫХ НАВЫКОВ И КОНЦЕПТУАЛЬНОЙ ФИЛОСОФИИ, КОТОРЫЕ ПОЗВОЛИЛИ В ДАЛЬНЕЙШЕМ БЫТЬ ВСЕГДА НА ШАГ ВПЕРЕДИ В ЭСТЕТИЧЕСКОЙ ХИРУРГИИ',
				],
			},
			{
				year: 'С 2007',
				description: ['РАБОТА В ВЕДУЩИХ ЧАСТНЫХ КЛИНИКАХ САНКТ-ПЕТЕРБУРГА'],
			},
			{
				year: 'С 2016',
				description: ['РАБОТА В КЛИНИКЕ РАМИ'],
			},
			{
				description: [
					'В СВОЕЙ ПРАКТИКЕ ИСПОЛЬЗУЕТ ИСКЛЮЧИТЕЛЬНО САМЫЕ СОВРЕМЕННЫЕ ТЕХНОЛОГИИ ПРОВЕДЕНИЯ ОПЕРАЦИЙ, ЭФФЕКТИВНОСТЬ КОТОРЫХ ПРОВЕРЕНА ВРЕМЕНЕМ И ОПЫТОМ, А ТАКЖЕ В ХОДЕ МНОГОЧИСЛЕННЫХ СТАЖИРОВОК В РАЗЛИЧНЫХ КЛИНИКАХ МИРА.',
					'ВЫСОКАЯ КВАЛИФИКАЦИЯ ХИРУРГА И ЧУТКОЕ ПОНИМАНИЕ ЭСТЕТИКИ ЛИЦА ПОЗВОЛЯЮТ ОБЕСПЕЧИТЬ ПАЦИЕНТУ БЕЗОПАСНОЙ, МАКСИМАЛЬНО ЕСТЕСТВЕННЫЙ И ГАРМОНИЧНЫЙ РЕЗУЛЬТАТ.',
					'ЧУТКОЕ И БЕРЕЖНОЕ СОПРОВОЖДЕНИЕ ПАЦИЕНТА НА ВСЕХ ЭТАПАХ ЛЕЧЕНИЯ И ДЛИТЕЛЬНОЕ ВРЕМЯ ПОСЛЕ ОПЕРАЦИИ ГАРАНТИРУЮТ ТОТ БЕСПРЕЦЕДЕНТНЫЙ УРОВЕНЬ ДОВЕРИЯ МЕЖДУ ПАЦИЕНТОМ И ВРАЧОМ, КОТОРЫЙ ПОМОГАЕТ БЕЗ СТРАХА И СОМНЕНИЯ ИДТИ НА ОПЕРАЦИЮ, А ПОТОМ БЫСТРО И С МАКСИМАЛЬНЫМ КОМФОРТОМ ВОССТАНАВЛИВАТЬСЯ ПОСЛЕ НЕЕ.',
				],
			},
		],
		modalEducation: [
			{
				year: '1998',
				description:
					'выпускница медицинского факультета Петрозаводского государственного университета им. Куусинена',
				specializations: [
					'общая хирургия',
					'челюстно-лицевая хирургия',
					'травматология и ортопедия',
					'сосудистая и микроссудистая хирургия',
					'хирургия кисти и стопы',
				],
			},
			{
				year: '2000',
				description:
					'прошла специализацию по пластической, реконструктивной и эстетической хирургии на базе СПб МАПО и по настоящее время является практикующим пластическим хирургом',
				specializations: [],
			},
			{
				description: [
					'Более 10 лет практики в ургентной и плановой микрохирургии и травматологии.',
					'Каждые 5 лет проходит Курсы повышения квалификации по специальности «Пластическая, реконструктивная и эстетическая хирургия».',
					'Ежегодно посещает самые продвинутые курсы по эстетической коррекции лица и тела, а также проходит обучение в рамках курса всемирно известного американского пластического хирурга, основоположника методики глубокого SMAS – лифтинга, профессора Сэма Хамра. Стажировки в ведущих клиниках США, Испании, Германии.',
				],
			},
		],
		route: [
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
		],
		welcome_block: [
			{
				bgMobile: '/doctor-screen/serb1.webp',
				bg: '/doctor-screen/bg.webp',
				title: (
					<h1 className='text-2xl/[125%] sm:text-3xl/[125%] md:text-5xl/[125%] xl:text-7xl/[125%] 2xl:text-8xl/[125%] font-normal uppercase mb-6 xl:mb-10'>
						Серб Ирина
						<br />
						Анатольевна
					</h1>
				),
				description: (
					<p className='text-[clamp(20px,2vw,24px)]/[125%] md:text-[clamp(24px,2vw,36px)]/[125%] text-[#1D1D1D] md:text-white font-normal uppercase w-full md:max-w-[616px] 2xl:max-w-[920px] tracking-[8%]'>
						Профессионал со стажем работы в специальности 29 лет, блестящий
						специалист в области пластической хирургии, известный далеко за
						пределами России. Виртуозный мастер хирургической коррекции
						возрастных и посттравматических изменений лица и тела. Ежегодно
						выполняет более 300 операций высокой степени сложности. Одно из
						главных направлений - комплексное омоложение лица.
					</p>
				),
			},
		],
		quote: (
			<p className='text-[clamp(0.875rem,1.5vw,21px)]/[155%] text-[#1D1D1D] font-normal uppercase'>
				Красота и жизнь нераздельно сплетены друг с другом, и хирург – лишь одна
				из нитей той непостижимой ткани, где сплелись солнечный свет, звездная
				пыль и неведомое чудо. Та радость и гордость, которые появляются в душе
				пациенток после пластической операции, достойны того, чтобы пройти этот
				путь. Их улыбки становятся ярче, глаза излучают особенный свет, а
				уверенность в себе транслируется всему окружению. Красота – это не
				просто слово. Это обещание счастья! Это сила, способная изменить мир к
				лучшему.
			</p>
		),
		titleGallery: 'Красота как стиль жизни',
		gallery: [
			{
				leftColumnImages: [
					'/doctor-screen/gallery/photo2.webp',
					'/doctor-screen/gallery/photo4.webp',
					'/doctor-screen/gallery/photo6.webp',
				],
			},
			{
				centerColumnImages: [
					'/doctor-screen/gallery/photo1.webp',
					'/doctor-screen/gallery/photo7.webp',
				],
			},
			{
				rightColumnImages: [
					'/doctor-screen/card2.webp',
					'/doctor-screen/gallery/photo3.webp',
					'/doctor-screen/gallery/photo5.webp',
				],
			},
		],

		modal_result: [
			{
				id: 1,
				description:
					'Комплексное омоложение:  эндоскопический фронтотемпоральный лифтинг, нижняя трансконъюктивальная блефаропластика, медиальная платизмопластика, смас-лифтинг, липофилинг лица',
				images: [
					'/doctor-screen/result-ser/1/1.png',
					'/doctor-screen/result-ser/1/2.png',
					'/doctor-screen/result-ser/1/1.1.png',
					'/doctor-screen/result-ser/1/1.2.png',
				],
			},
			{
				id: 2,
				description:
					'Комплексное омоложение: квадрилатеральная блефаропластика, эндоскопический фронтотемпоральный лифтинг, корсетная медиальная платизмопластика, смас-лифтинг',
				images: [
					'/doctor-screen/result-ser/2/1.1.jpg',
					'/doctor-screen/result-ser/2/2.2.jpg',
					'/doctor-screen/result-ser/2/2.3.jpg',
					'/doctor-screen/result-ser/2/2.4.jpg',
					'/doctor-screen/result-ser/2/2.jpg',
				],
			},
			{
				id: 3,
				description:
					'Комплексное омоложение:  эндоскопический фронтотемпоральный лифтинг,  квадрилатеральная блефаропластика, кантомиопексия, медиальная платизмопластика, субментальная липосакция, смас-лифтинг',
				images: [
					'/doctor-screen/result-ser/3/1.png',
					'/doctor-screen/result-ser/3/2.png',
					'/doctor-screen/result-ser/3/3.png',
					'/doctor-screen/result-ser/3/4.png',
					'/doctor-screen/result-ser/3/5.png',
				],
			},

			{
				id: 5,
				description:
					'Комплексное омоложение:  верхняя и нижняя блефаропластика, эндоскопический фронтотемпоральный лифтинг, медиальная корсетная платизмопластика, смас-лифтинг, редукция комков Биша',
				images: [
					'/doctor-screen/result-ser/4/1.png',
					'/doctor-screen/result-ser/4/2.png',
					'/doctor-screen/result-ser/4/3.png',
				],
			},
			{
				id: 5,
				description: '',
				images: [
					'/doctor-screen/result-ser/5/1.png',
					'/doctor-screen/result-ser/5/2.png',
					'/doctor-screen/result-ser/5/3.png',
				],
			},
		],
	},
	{
		image: '/swiper2.webp',
		video: '/telishevskiy.gif',
		specialties: [
			'ЗАМЕСТИТЕЛЬ ГЛАВНОГО ВРАЧА',
			'ПЛАСТИЧЕСКИЙ ХИРУРГ',
			'ОНКОЛОГ-МАММОЛОГ',
		],
		lastName: 'Телишевский',
		firstName: 'Антон Валентинович',
		link: '/doctor',
		id: 'telishevskiy-anton',
	},
	{
		image: '/swiper3.webp',
		video: '/tarasenko.gif',
		videoFooterIm: '/serb-short.webm',
		videoFooterMp: '/serb-short.mp4',
		specialties: ['КАНДИДАТ МЕДИЦИНСКИХ НАУК', 'ПЛАСТИЧЕСКИЙ ХИРУРГ'],
		lastName: 'Тарасенко',
		firstName: 'Василий Сергеевич',
		link: '/doctor',
		id: 'tarasenko-vasiliy',
		cards: [
			'/doctor-screen/tarasenko-vasiliy/result/res4/1.png',
			'/doctor-screen/tarasenko-vasiliy/archive/card6.JPG',
			'/doctor-screen/tarasenko-vasiliy/training/card2.jpg',
		],
		modalProfessionalDev: [
			{
				description:
					'Регулярно повышает мастерство, принимает участие в российских и международных симпозиумах по пластической хирургии. В их числе:',
			},
			{
				year: '2009',
				description:
					'Казанская государственная медицинская академия, семинар «Применение ботулотоксинов в неврологической практике и косметологии»',
			},
			{
				year: '2011',
				description:
					'Российское отделение ISAPS, международный курс по пластической хирургии ISAPS, Санкт-Петербург',
			},
			{
				year: '2012',
				description:
					'Российский национальный исследовательский медицинский университет имени Н.И. Пирогова, кафедра пластической и реконструктивной хирургии, косметологии и клеточных технологий, международный обучающий семинар «Сложные случаи эстетической маммопластики: задай свой вопрос мировому эксперту Дэннису Хаммонду»',
			},
			{
				year: '2012',
				description:
					'РГМУ имени Н.И.Пирогова, международный обучающий семинар по ринопластике с участием профессора В. Губиша, Москва;',
			},
			{
				year: '2014',
				description:
					'Московский научно-исследовательский онкологический институт имени П.А. Герцена, продвинутый курс по реконструктивной и эстетической хирургии молочной железы',
			},
			{
				year: '2014',
				description:
					'Академия Allergan, обучающий курс по пластической хирургии молочных желез',
			},
			{
				year: '2014',
				description:
					'мастер-класс Clovermed по безоперационной подтяжке лица и тела нитями Spring Thread от челюстно-лицевого и пластического хирурга Жюля Мартана, Франция',
			},
			{
				year: '2014',
				description:
					'Школа пластической и реконструктивной хирургии с курсом прикладной анатомии (руководитель Джуме Массия), Испания',
			},
			{
				year: '2015',
				description:
					'Австралийское общество эстетической пластической хирургии, курс лицевой анатомии, Мельбурн',
			},
			{
				year: '2015',
				description:
					'Испанский национальный медицинский университет, курс пластической хирургии «Применение эндотинов в эстетической хирургии лица»',
			},
			{
				year: '2015',
				description:
					'обучающий курс MAFAC доктора Брайана Мендельсона «Мельбурнский курс расширенной лицевой анатомии», Австралия',
			},
			{
				year: '2016',
				description:
					'Санкт-Петербургский государственный медицинский университет имени академика И.П. Павлова, курс доктора Брайана Мендельсона «Инновационные методы омоложение лица»',
			},
			{
				year: '2016',
				description: 'VI международный обучающий курс по пластической хирургии',
			},
			{
				year: '2016',
				description:
					'VI международный курс-тренинг для пластических и реконструктивных хирургов BioConcept',
			},
			{
				year: '2016',
				description:
					'мастер-класс «Мини-фиксаторы тканей лица Endotine в практике пластического хирурга»',
			},
			{
				year: '2017',
				description:
					'VI национальный конгресс «Пластическая хирургия, эстетическая медицина и косметология» (обучение в рамках реализации модели отработки основных принципов непрерывного медицинского образования)',
			},
			{
				year: '2017',
				description:
					'курс BioConcept «Классики пластической хирургии. Сэм Хамра и его методики»',
			},
			{
				year: '2017',
				description:
					'VII международный курс-тренинг для пластических и реконструктивных хирургов ICTPS',
			},
			{
				year: '2017',
				description:
					'курс EDMED «Современные вопросы омолаживающей хирургии лица»',
			},
			{
				year: '2017',
				description:
					'мастер-класс О. Рамиреза (США) с диссекционным курсом «Пластическая хирургия лица, носа. Эндоскопический лифтинг»',
			},
			{
				year: '2017',
				description:
					'спикер мастер-класса «Мультиточечная жесткая фиксация тканей в эстетической хирургии лица»',
			},
			{
				year: '2017',
				description:
					'спикер мастер-класса Д. Крастиновой-Лолов «Современные вопросы омолаживающей хирургии лица»',
			},
			{
				year: '2017',
				description:
					'Австралийское общество эстетической пластической хирургии, продвинутый курс лицевой анатомии с участием доктора Ботти, Австралия',
			},
			{
				year: '2017',
				description:
					'VII международный обучающий курс по пластической хирургии',
			},
			{
				year: '2018',
				description: 'участник мастер-класса Edmed «Оморфиопластика лица»',
			},
			{
				year: '2018',
				description:
					'спикер VIII международного обучающего курса по пластической хирургии',
			},
			{
				year: '2019',
				description:
					'спикер IX международного обучающего курса по пластической хирургии',
			},
		],
		modalEducation: [
			{
				year: '2001',
				description:
					'Саратовский военно-медицинский институт, специальность «Лечебное дело»',
				specializations: [
					'ПЛАСТИКА ЛИЦА И ШЕИ',
					'ПЛАСТИКА ВЕК',
					'ПЛАСТИКА УШЕЙ',
					'ПЛАСТИКА ГУБ',
					'ХИРУРГИЧЕСКОЕ ОМОЛОЖЕНИЕ НОСА',
					'ПЛАСТИКА ТЕЛА',
					'ПЛАСТИКА МОЛОЧНЫХ ЖЕЛЕЗ',
					'ИНТИМНАЯ ПЛАСТИКА',
				],
			},
			{
				year: '2002',
				description:
					'Саратовский военно-медицинский институт, интернатура по специальности «Хирургия»',
			},
			{
				year: '2007',
				description:
					'Саратовский военно-медицинский институт, адъюнктура (аспирантура) по специальности «Хирургия».',
			},
			{
				year: '2008',
				description:
					'Саратовским государственным медицинским университетом присуждена ученая степень кандидата медицинских наук',
			},
			{
				year: '2010',
				description:
					'Саратовский военно-медицинский институт, профессиональная переподготовка по специальности «Эндоскопия»',
			},
			{
				year: '2012 ',
				description:
					'Казанская государственная медицинская академия, профессиональная переподготовка по специальности «Пластическая хирургия»',
			},
			{
				year: '2017',
				description:
					'Первый Санкт-Петербургский государственный медицинский университет имени академика И.П. Павлова, сертификационный цикл по пластической хирургии',
			},
			{
				year: '2020',
				description:
					'Первый Санкт-Петербургский государственный медицинский университет имени академика И.П. Павлова, сертификационный цикл по пластической хирургии',
			},
			{
				year: '2024',
				description:
					'Первый Санкт-Петербургский государственный медицинский университет имени академика И.П. Павлова, тематическое усовершенствование по программе «Актуальные вопросы пластической хирургии»',
			},
			{
				year: '2025',
				description:
					'Периодическая аккредитация медицинского работника. Действующий сертификат «Пластическая хирургия» выдан Северо-Западным государственным медицинским университетом имени И.И. Мечникова, Санкт-Петербург',
			},
			{
				description:
					'Действующий сертификат «Пластическая хирургия» выдан Северо-Западным государственным медицинским университетом имени И.И. Мечникова, Санкт-Петербург.',
			},
		],
		route: [
			{
				year: '2015',
				title:
					'Б. Мендельсон, курс MAFAC (продвинутая анатомия лица дляпластических хирургов), Мельбурн, Австралия',
				description: '2015',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card1.PNG',
				backgroundYear: '2015',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
			{
				year: '2016',
				title: 'ISAPS, Киото, Япония',
				description: '2016',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card2.JPG',
				backgroundYear: '2016',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
			{
				year: '2016',
				title:
					'Б.Мендельсон, курс «Инновационные методы омоложения лица», Санкт-Петербург',
				description: '2016',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card3.jpg',
				backgroundYear: '2016',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
			{
				year: '2017',
				title:
					'Б. Мендельсон (Австралия) и Д. Батюков (Беларусь), продвинутый курс MAFAC',
				description: '2017',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card4.JPG',
				backgroundYear: '2017',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
			{
				year: '2017',
				title: '3.Сэм Хамра (США), мастер-класс, Москва',
				description: '2017',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card5.JPG',
				backgroundYear: '2017',
				imageClassName:
					'w-[323px] md:w-[380px] xl:w-[449px] h-[216px] md:h-[250px] xl:h-[300px]',
			},
			{
				year: '2018',
				title:
					'Рамирез (США), международный интенсивный обучающий курс, Санкт-Петербург',
				description: '2018',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card6.JPG',
				backgroundYear: '2018',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
			{
				year: '2018',
				title: 'Томас М. Биггс, ISAPS, Майами, США',
				description: '2018',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card7.JPG',
				backgroundYear: '2018',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
			{
				year: '2018',
				title: 'О.Рамирез, ISPS, СПб',
				description: '2018',
				image: '/doctor-screen/tarasenko-vasiliy/archive/card8.jpg',
				backgroundYear: '2018',
				imageClassName:
					'w-[193px] md:w-[280px] xl:w-[317px] h-[216px] md:h-[320px] xl:h-[396px]',
			},
		],
		welcome_block: [
			{
				bgMobile: '/doctor-screen/tarasenko-vasiliy/TARASENKO.png',
				bg: '/doctor-screen/tarasenko-vasiliy/bg.png',
				title: (
					<h1 className='text-2xl/[125%] sm:text-3xl/[125%] md:text-5xl/[125%] xl:text-7xl/[125%]  font-normal uppercase mb-6 xl:mb-10'>
						ТАРАСЕНКО ВАСИЛИЙ
						<br />
						СЕРГЕЕВИЧ
					</h1>
				),
				description: (
					<p className='text-[clamp(20px,2vw,24px)]/[125%] md:text-[clamp(24px,2vw,32px)]/[125%] text-[#1D1D1D] md:text-white font-normal uppercase w-full md:max-w-[616px] 2xl:max-w-[920px] tracking-[8%]'>
						Более 20 лет выполняет пластические и реконструктивные операции на
						лице и теле. Признанный эксперт по омолаживающей хирургии лица,
						выполняющий показательные операции на международных конгрессах.
						Выдающийся специалист по лифтингу Мендельсона, технике которого
						учился непосредственно у австралийского ученого – профессора
						Мендельсона. Один из немногих хирургов России, который действительно
						в совершенстве владеет данной методикой.
					</p>
				),
			},
		],
		quote: (
			<p className='text-[clamp(0.875rem,1.5vw,21px)]/[155%] text-[#1D1D1D] font-normal uppercase'>
				На протяжении всей карьеры каждый пластический хирург делает выбор. То
				есть можно, как сейчас модно говорить, «хайповать» и делать редкие
				операции, граничащие с уродством. А можно оставаться в пределах этичных
				или общепринятых параметров красоты. Так что мне особенно
				перестраиваться не пришлось, потому что тренды, которые актуальны
				сейчас, я отрабатывал еще 10-15 лет назад. Пациенты, которые стремились
				сохранить естественную красоту, были всегда. Просто раньше это были,
				скорее, исключения из правил. Сейчас же все вошло в комфортный для меня
				поток.
			</p>
		),
		linkQuote:
			'https://www.grazia.ru/beauty/kak-plasticheskie-operacii-vliyayut-na-jizn-samoocenku-i-kareru-vse-o-glavnyh-trendah-esteticheskoi-mediciny/',
		titleGallery: 'Обучение у Мендельсона и любимая методика',
		gallery: [
			{
				leftColumnImages: [
					'/doctor-screen/tarasenko-vasiliy/training/card6.jpg',
					'/doctor-screen/tarasenko-vasiliy/training/card1.jpg',
				],
			},
			{
				centerColumnImages: [
					'/doctor-screen/tarasenko-vasiliy/training/card4.jpg',
					'/doctor-screen/tarasenko-vasiliy/training/card5.jpg',
				],
			},
			{
				rightColumnImages: [
					'/doctor-screen/tarasenko-vasiliy/training/card3.jpg',
					'/doctor-screen/tarasenko-vasiliy/training/card2.jpg',
				],
			},
		],

		modal_result: [
			{
				id: 1,
				description:
					'Комплексная операция: лифтинг Мендельсона, эндоскопическое омоложение лба и нижняя блефаропластика. Результат через 6 месяцев после операции.',
				images: [
					'/doctor-screen/tarasenko-vasiliy/result/res1/1.png',
					'/doctor-screen/tarasenko-vasiliy/result/res1/1.2.png',
					'/doctor-screen/tarasenko-vasiliy/result/res1/2.png',
					'/doctor-screen/tarasenko-vasiliy/result/res1/2.2.png',
				],
			},
			{
				id: 2,
				description: '',
				images: [
					'/doctor-screen/tarasenko-vasiliy/result/res2/35_1.jpg',
					'/doctor-screen/tarasenko-vasiliy/result/res2/35_2.jpg',
				],
			},
			{
				id: 3,
				description:
					'Подтяжка лица и шеи по методике лифтинг Мендельсона, эндоскопический фронто-темпоральный лифтинг. Результата через 6 месяцев после операции.',
				images: [
					'/doctor-screen/tarasenko-vasiliy/result/res3/4.2.jpg',

					'/doctor-screen/tarasenko-vasiliy/result/res3/4.jpg',
				],
			},

			{
				id: 5,
				description:
					'Лифтинг Мендельсона и эндоскопический фронтотемпоральный лифтинг 6 мес',
				images: [
					'/doctor-screen/tarasenko-vasiliy/result/res4/1.png',
					'/doctor-screen/tarasenko-vasiliy/result/res4/3.png',
				],
			},
			{
				id: 5,
				description:
					'Лифтинг Мендельсона и эндоскопический фронтотемпоральный лифтинг 1 год',
				images: [
					'/doctor-screen/tarasenko-vasiliy/result/res5/1.jpg',
					'/doctor-screen/tarasenko-vasiliy/result/res5/1.jpg',
					'/doctor-screen/tarasenko-vasiliy/result/res5/2.jpg',
					'/doctor-screen/tarasenko-vasiliy/result/res5/3.jpg',
					'/doctor-screen/tarasenko-vasiliy/result/res5/4.jpg',
					'/doctor-screen/tarasenko-vasiliy/result/res5/5.jpg',
				],
			},
		],
	},
	{
		image: '/swiper4.webp',
		video: '/hrustaleva.gif',
		specialties: ['ДОКТОР МЕДИЦИНСКИХ НАУК', 'ПЛАСТИЧЕСКИЙ ХИРУРГ'],
		lastName: 'Хрусталева',
		firstName: 'Ирина Эдуардовна',
		link: '/doctor',
		id: 'hrustaleva-irina',
	},
	{
		image: '/swiper5.webp',
		video: '/kardov.gif',
		specialties: ['ПЛАСТИЧЕСКИЙ ХИРУРГ'],
		lastName: 'Кардов',
		firstName: 'Хазрит Музаринович',
		link: '/doctor',
		id: 'kardov-hazrit',
	},
	{
		image: '/swiper6.webp',
		video: '/rami.gif',
		specialties: ['ПЛАСТИЧЕСКИЙ ХИРУРГ'],
		lastName: 'Хамуд',
		firstName: 'Рами',
		link: '/doctor',
		id: 'rami-rami',
	},
]
