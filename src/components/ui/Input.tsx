type InputProps = {
	placeholder: string
	className?: string
}

export const Input = ({ placeholder, className = '' }: InputProps) => {
	return (
		<input
			type='text'
			placeholder={placeholder}
			className={`placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-2 ${className}`}
		/>
	)
}
