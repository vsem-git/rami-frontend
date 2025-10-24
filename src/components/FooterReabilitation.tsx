import { REABILITATION_TEXTS } from '../shared/data/reabilitation'
import Clocks from './Reabilitation/Clocks'
import { useClocks } from './Reabilitation/ClocksProvider'

const FooterReabilitation = () => {
	const { minuteAngle, hourAngle } = useClocks()

	return (
		<div className='h-auto w-full bg-[#1D1D1D]'>
			<div className='relative h-[720px] sm:h-[640px] overflow-hidden px-4'>
				<div className='bg-white aspect-square w-full sm:w-[55%] h-[65%] blur-[80px] rounded-full absolute bottom-[0%] sm:bottom-[10%]'></div>
				<Clocks
					minuteAngle={minuteAngle}
					hourAngle={hourAngle}
					className='absolute left-0 sm:left-[-10%] top-[15%] w-full sm:w-[80%] h-full sm:h-[80%] '
				/>

				<img
					src='/reabilitation-screen/reabilitation.webp'
					className='absolute bottom-[-5%] sm:bottom-[-20%] left-[-10%] z-10  max-h-[100%] object-contain image-reb-size'
					width={770}
				/>
				<div className='w-full h-full flex items-start sm:items-center justify-end mt-[6rem] sm:mt-0 relative z-10'>
					<div className={`${REABILITATION_TEXTS[6].className}`}>
						{REABILITATION_TEXTS[6].content}
					</div>
				</div>
			</div>
		</div>
	)
}

export default FooterReabilitation
