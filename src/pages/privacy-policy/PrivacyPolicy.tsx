import { privacyPolicy } from "../../shared/data/privacy-policy";

export const PrivacyPolicy = () => {
	return (
		<div className='w-full h-auto pt-[120px] sm:pt-[140px] xl:pt-[210px] max-w-[720px] xl:max-w-[1080px] mx-auto mb-20 px-4'>
			<h1 className='text-xl sm:text-2xl lg:text-[28px] xl:text-[44px] leading-[125%] text-[#1D1D1D] uppercase'
                data-content-hint="privacy-policy.title">
				Положение о политике конфиденциальности интернет-сайта
			</h1>

            {privacyPolicy.map((section, index) => (
                <div
                    key={index}
                    className="mt-16 xl:mt-20  text-xs xl:text-lg leading-[155%] uppercase text-[#1D1D1D]"
                >
                    {section.title && (
                        <h3 className="font-bold mb-6" data-content-hint={`privacy-policy.section.${index}.title`}>{section.title}</h3>
                    )}
                    {section.content.map((paragraph, idx) => (
                        <p key={idx} data-content-hint={`privacy-policy.section.${index}.content.${idx}`}>{paragraph}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};
