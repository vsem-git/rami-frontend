import { Link } from 'react-router-dom'
import { patientData } from '../../shared/data/patient'

export const Patient = () => {
	return (
		<div className=''>
			<div className='w-full max-w-[890px] flex flex-col mx-auto pt-[8rem] lg:pt-[12rem] px-4 lg:px-0'>
				<h2 className='text-xl sm:text-4xl md:text-[44px] uppercase text-[#1D1D1D] tracking-[3px] sm:tracking-[6px]'>
					{patientData.title}
				</h2>

				<div className='text-[11px] sm:text-sm md:text-lg text-[#1D1D1D] uppercase space-y-4 md:space-y-8 mt-12 md:mt-16'>
					{patientData.info.map((text, index) => (
						<p key={index}>{text}</p>
					))}
				</div>

				<div className='mt-1.5 sm:mt-2 md:mt-4 flex flex-col gap-1 md:gap-2'>
					{patientData.documents.map((doc, index) => {
						if (typeof doc === 'object' && doc.id) {
							return (
								<Link
									key={index}
									to={`/patient/${doc.id}`}
									className='w-full py-2 md:py-3 flex items-start gap-3 md:gap-4 cursor-pointer group hover:gap-5 transition-all duration-300'
								>
									<img
										src='/ins.svg'
										alt=''
										className='mt-1 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert-[0.2] w-6 md:w-8'
									/>
									<div className='w-full mt-1.75'>
										<h3 className='text-[10px] sm:text-sm md:text-base text-[#1D1D1D] uppercase font-semibold leading-[155%] transition-all duration-300 group-hover:translate-x-1'>
											{doc.name}
										</h3>
										<div className='w-full h-px bg-[#1D1D1D26] mt-1' />
									</div>
								</Link>
							)
						}

						if (typeof doc === 'object' && doc.type === 'pdf') {
							return (
								<a
									key={index}
									href={`${doc.file}`}
									target='_blank'
									rel='noopener noreferrer'
									className='w-full py-2 md:py-3 flex items-start gap-3 md:gap-4 cursor-pointer group hover:gap-5 transition-all duration-300 no-underline'
								>
									<img
										src='/ins.svg'
										alt=''
										className='mt-1 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert-[0.2] w-6 md:w-8'
									/>
									<div className='w-full mt-1.75'>
										<h3 className='text-[10px] sm:text-sm md:text-base text-[#1D1D1D] uppercase font-semibold leading-[155%] transition-all duration-300 group-hover:translate-x-1'>
											{doc.name}
										</h3>
										<div className='w-full h-px bg-[#1D1D1D26] mt-1' />
									</div>
								</a>
							)
						}

						return (
							<div
								key={index}
								className='w-full py-2 md:py-3 flex items-start gap-3 md:gap-4 group'
							>
								<img src='/ins.svg' alt='' className='mt-1 w-6 md:w-8' />
								<div className='w-full mt-1.75'>
									<h3 className='text-[10px] sm:text-sm md:text-base text-[#1D1D1D] uppercase font-semibold leading-[155%]'>
										{doc.name}
									</h3>
									<div className='w-full h-px bg-[#1D1D1D26] mt-1' />
								</div>
							</div>
						)
					})}
				</div>

				<div className='mt-24 max-w-[870px]'>
					<h3 className='text-base md:text-xl text-[#1D1D1D] font-bold uppercase'>
						{patientData.appointment.title}
					</h3>
					<p className='text-[11px] sm:text-sm md:text-lg text-[#1D1D1D] uppercase mt-4 sm:mt-8'>
						{patientData.appointment.text}
					</p>
				</div>

				<div className='mt-24'>
					<h3 className='text-base md:text-xl text-[#1D1D1D] font-bold uppercase mb-4 md:mb-7'>
						{patientData.priceList.title}
					</h3>
					<a
						href={`/${patientData.priceList.file}`}
						target='_blank'
						rel='noopener noreferrer'
						className='w-full py-3 flex items-start gap-4 cursor-pointer group hover:gap-5 transition-all duration-300 no-underline'
					>
						<img
							src='/ins.svg'
							alt=''
							className='mt-1 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert-[0.2] w-6 md:w-8'
						/>
						<div className='w-full mt-1.75'>
							<h3 className='text-[10px] sm:text-sm md:text-base text-[#1D1D1D] uppercase font-semibold leading-[155%] transition-all duration-300 group-hover:translate-x-1'>
								{patientData.priceList.document}
							</h3>
							<div className='w-full h-px bg-[#1D1D1D26] mt-1' />
						</div>
					</a>
				</div>

				<div className='mt-24'>
					<h3 className='text-base md:text-xl text-[#1D1D1D] font-bold uppercase mb-4 md:mb-8'>
						{patientData.vacancies.title}
					</h3>
					<button className='flex items-center gap-4 mt-4 cursor-pointer group'>
						<span className='relative text-[10px] sm:text-sm md:text-base text-[#1D1D1D] font-semibold uppercase pb-1'>
							{patientData.vacancies.buttonText}
							<span className='absolute bottom-0 left-0 w-0 h-px bg-[#1D1D1D] transition-all duration-300 group-hover:w-full'></span>
						</span>
						<img
							src='/icon-r.svg'
							alt=''
							className='w-6 md:w-8 filter brightness-0 invert-0 object-cover mb-1 transition-all duration-500 group-hover:translate-x-2 group-hover:brightness-0 group-hover:invert-[0.2]'
						/>
					</button>
				</div>
			</div>

			<div
				id='patient-section2'
				className='w-full mt-14 bg-[#691C32] pb-[100px] px-4 lg:px-0'
			>
				<div className='w-full max-w-[890px] flex flex-col mx-auto pt-16 md:pt-[114px]'>
					<h3 className='text-base md:text-[11px] sm:text-sm md:text-lg text-white font-bold uppercase'>
						{patientData.referenceInfo.title}
					</h3>

					<h4 className='text-[11px] sm:text-sm md:text-lg text-white font-bold uppercase mt-4 md:mt-8'>
						{patientData.referenceInfo.postalAddress.title}
					</h4>

					<div className='text-[11px] sm:text-sm md:text-lg text-white uppercase mt-2 md:mt-8 leading-[155%]'>
						<p
							className=''
							dangerouslySetInnerHTML={{
								__html: patientData.referenceInfo.postalAddress.content,
							}}
						/>

						<p className='mt-4 md:mt-8 mb-2 md:mb-4'>
							{patientData.referenceInfo.postalAddress.requisitesTitle}
						</p>

						<div className='space-y-2'>
							{patientData.referenceInfo.requisites.map((item, index) => (
								<p key={index}>
									<b>{item.key}</b> {item.value}
								</p>
							))}
						</div>
					</div>

					<div className='mt-24'>
						<h3 className='text-base md:text-xl text-white font-bold uppercase'>
							{patientData.license.title}
						</h3>
						<p className='text-[11px] sm:text-sm md:text-lg text-white uppercase mt-8 leading-[155%] mb-4'>
							{patientData.license.description}
						</p>

						<a
							href={patientData.license.file}
							target='_blank'
							className='w-full py-2 md:py-3 flex items-start gap-3 md:gap-4 cursor-pointer group hover:gap-5 transition-all duration-300'
						>
							<img
								src='/ins.svg'
								alt=''
								className='mt-1 filter brightness-0 invert-[1] transition-all duration-300 group-hover:scale-110 w-6 md:w-8 '
							/>
							<div className='mt-1.75'>
								<h3 className='text-[10px] sm:text-sm md:text-base text-white uppercase font-semibold leading-[155%] max-w-[852px] transition-all duration-300 group-hover:translate-x-1'>
									{patientData.license.text}
								</h3>
								<div className='w-full h-px bg-[#FFFFFF26] mt-1 transition-all duration-300 group-hover:bg-white group-hover:opacity-70' />
							</div>
						</a>
					</div>

					<div className='w-full mt-24'>
						<h3 className='text-base md:text-xl text-white font-bold uppercase mb-4 md:mb-6'>
							документы
						</h3>
						<div className='space-y-2'>
							{patientData.documentsList.map((doc, index) => (
								<Link
									key={index}
									to={doc.href}
									className='w-full py-2 md:py-3 flex items-start gap-3 md:gap-4 cursor-pointer group hover:gap-5 transition-all duration-300'
								>
									<img
										src='/ins.svg'
										alt=''
										className='mt-1 filter brightness-0 invert-[1] transition-all duration-300 group-hover:scale-110 w-6 md:w-8'
									/>
									<div className='w-full mt-1.75'>
										<h3 className='text-[10px] sm:text-sm md:text-base text-white uppercase font-semibold leading-[155%] transition-all duration-300 group-hover:translate-x-1'>
											{doc.name}
										</h3>
										<div className='w-full h-px bg-[#FFFFFF26] mt-1 transition-all duration-300 group-hover:bg-white group-hover:opacity-70' />
									</div>
								</Link>
							))}
						</div>
					</div>

					<div className='w-full mt-24'>
						<h3 className='text-base md:text-xl text-white font-bold uppercase mb-4 md:mb-8'>
							{patientData.managementStructure.title}
						</h3>
						<div className='text-[11px] sm:text-sm md:text-lg text-white uppercase leading-[155%] space-y-2 md:space-y-4'>
							{patientData.managementStructure.items.map((item, index) => (
								<p key={index}>
									<b>{item.position}</b> {item.name}
								</p>
							))}
						</div>
					</div>

					<div className='w-full mt-24'>
						<h3 className='text-base md:text-xl text-white font-bold uppercase mb-4 md:mb-8'>
							{patientData.receptionSchedule.title}
						</h3>
						<div className='text-[11px] sm:text-sm md:text-lg text-white uppercase leading-[155%] space-y-4'>
							{patientData.receptionSchedule.items.map((item, index) => (
								<p key={index} dangerouslySetInnerHTML={{ __html: item }} />
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='w-full bg-[#1D1D1D] pb-16 md:pb-[100px] px-4 lg:px-0'>
				<div className='w-full max-w-[890px] flex flex-col mx-auto pt-16 md:pt-[114px]'>
					<h3 className='text-base md:text-xl text-white font-bold uppercase'>
						{patientData.controllingOrganizations.title}
					</h3>

					<div className='text-[11px] sm:text-sm md:text-lg text-white uppercase leading-[155%] space-y-4 mt-8 '>
						{patientData.controllingOrganizations.items.map((org, index) => (
							<p key={index} className={org.maxWidth}>
								<b>{org.name}</b> Адрес: {org.address}{' '}
								{org.name.includes('Комитет') ? 'Единая' : 'Тел. / факс'}:{' '}
								{org.phone}
							</p>
						))}
					</div>

					<h3 className='text-base md:text-xl text-white font-bold uppercase mt-24 max-w-[850px]'>
						{patientData.usefulInfo.title}
					</h3>

					<div className='mt-4 md:mt-8'>
						{patientData.usefulInfo.documents.map((doc, index) => (
							<a
								key={index}
								href={`/${doc.file}`}
								target='_blank'
								rel='noopener noreferrer'
								className='w-full py-3 flex items-start gap-4 cursor-pointer group hover:gap-5 transition-all duration-300 no-underline'
							>
								<img
									src='/ins.svg'
									alt=''
									className='mt-1 filter brightness-0 invert-[1] transition-all duration-300 group-hover:scale-110 w-6 md:w-8'
								/>
								<div className='w-full mt-1.75'>
									<h3 className='text-[10px] sm:text-sm md:text-base text-white uppercase font-semibold leading-[155%] transition-all duration-300 group-hover:translate-x-1'>
										{doc.name}
									</h3>
									<div className='w-full h-px bg-[#FFFFFF26] mt-1 transition-all duration-300 group-hover:bg-white group-hover:opacity-70' />
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
