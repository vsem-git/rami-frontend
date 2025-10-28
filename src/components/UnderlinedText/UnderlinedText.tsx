const UnderlinedText = ({
	children,
	className,
	onClick,
}: {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}) => {
	return (
		<span
			className={`relative group inline-block ${className}`}
			onClick={onClick}
		>
			<span className='after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#7E318E] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full'>
				{children}
			</span>
		</span>
	)
}

export default UnderlinedText
