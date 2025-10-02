import { forwardRef } from 'react'

export const CosmetologyBackground = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div
			ref={ref}
			className='
        w-full h-[640px] relative overflow-hidden
        bg-[url("/cosmetology-screen/beef4aba2d32319ab3ff30157c877b883ffce82b.jpg")]
        bg-no-repeat bg-cover 
        bg-[center_top]
        md:bg-[-10rem_8rem] xl:bg-[-10rem_0%]
        md:will-change-transform
      '
		>
			<h1
				className='
          text-[60px] md:text-[160px]/[125%]
          font-normal uppercase whitespace-nowrap text-white
          absolute bottom-0 right-0 px-4 md:px-12
        '
			>
				ИНТЕЛЛЕКТУАЛЬНАЯ КОСМЕТОЛОГИЯ
			</h1>
		</div>
	)
})
