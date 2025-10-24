import { REABILITATION_TEXTS } from '../../shared/data/reabilitation'

const MobileReabilitation = () => {
	return (
		<div className='h-auto w-full bg-[#1D1D1D]'>
			<div className='relative h-[720px] sm:h-[640px] overflow-hidden px-4'>
				<div className='bg-white aspect-square w-full sm:w-[45%] h-[60%] blur-[80px] rounded-full absolute bottom-[10%] sm:bottom-[20%]'></div>
				<img
					src='/reabilitation-screen/reabilitation.webp'
					className='absolute bottom-0 z-10 w-full sm:w-[45%] max-h-[100%] object-contain '
					width={770}
				/>
				<div className='w-full h-full flex items-start sm:items-center justify-end mt-[6rem] sm:mt-0'>
					<div className={`${REABILITATION_TEXTS[0].className}`}>
						{REABILITATION_TEXTS[0].content}
					</div>
				</div>
				<div className='marquee-reabilitation inline-flex text-white pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference w-full absolute bottom-0 z-20'>
					<span className='px-8'>РЕАБИЛИТАЦИЯ</span>
					<span className='px-8'>РЕАБИЛИТАЦИЯ</span>
					<span className='px-8'>РЕАБИЛИТАЦИЯ</span>
					<span className='px-8'>РЕАБИЛИТАЦИЯ</span>
				</div>
			</div>

			<div className='flex flex-col items-end gap-[96px] my-24 px-4'>
				{REABILITATION_TEXTS.slice(1).map(
					item =>
						item.id !== 7 && (
							<div key={item.id} className={item.className}>
								{item.content}
							</div>
						)
				)}
			</div>
		</div>
	)
}

export default MobileReabilitation
