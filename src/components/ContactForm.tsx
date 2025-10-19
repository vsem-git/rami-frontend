import { ConsentCheckbox } from './ConsentCheckbox'
import { Input } from './ui/Input'

export const ContactForm = () => {
	return (
		<section className='w-full h-[580px] lg:h-[720px] xl:h-screen bg-[#691C32] px-4 sm:px-6 2xl:px-10 flex justify-center items-center flex-col'>
			<h2 className='leading-[125%] text-[24px] 2xl:text-[44px] text-white uppercase'>
				Свяжитесь с нами
			</h2>

			<form className='max-w-[800px] w-full mt-6 sm:mt-10'>
				<Input placeholder='КАК ВАС ЗОВУТ?*' />
				<Input placeholder='ТЕЛЕФОН*' />
				<Input placeholder='EMAIL' />
				<Input placeholder='ЧТО ВАС ИНТЕРЕСУЕТ?' className='mb-10' />

				<div className='flex justify-between items-center gap-4 sm:gap-20 flex-col-reverse sm:flex-row'>
					<button
						type='submit'
						className='w-full sm:w-[148px] min-w-[148px] h-[56px] sm:h-[48px] flex items-center justify-center bg-white text-sm 2xl:text-base text-[#691C32] font-semibold uppercase cursor-pointer'
					>
						ОТПРАВИТЬ
					</button>
					<ConsentCheckbox />
				</div>
			</form>
		</section>
	)
}
