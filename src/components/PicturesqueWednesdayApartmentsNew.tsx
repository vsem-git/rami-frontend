export const PicturesqueWednesdayApartmentsNew = () => {
	return (
		<div
		id='picturesque-wednesday-apartments-new'
			className='relative w-full h-[120vh] min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat pt-20'
			style={{
				backgroundImage: `
      linear-gradient(230.27deg, rgba(0, 0, 0, 0) 13.2%, rgba(0, 0, 0, 0.4) 82.61%, rgba(0, 0, 0, 0.4) 99.66%),
      url('/apartmentsnew-screen/bg-s.jpg')
    `,
				transform: 'scaleX(-1)',
			}}
		>
			<div
				className='relative z-10 flex flex-col px-10'
				style={{
					transform: 'scaleX(-1)',
				}}
			>
				<h2 className='relative z-10 text-[80px] font-normal text-[#EAE6E0] uppercase leading-[120%]  mb-10'>
					Живописная
					<br />
					пространственная
					<br />
					среда
				</h2>
				<div className='w-full flex items-center flex-col'>
					<h4 className='text-base font-medium text-white uppercase mb-10 max-w-[738px] text-center'>
						Из окон открываются прекрасные виды на старинный парк,
						способствующие релаксации
					</h4>

					<p className='relative z-10 text-[13px] font-normal text-white uppercase leading-[140%] max-w-[350px] mt-[154px] mr-[15rem]'>
						Для отдыха на свежем воздухе после согласования с врачом доступны
						террасы «Летний сад» и «Sky Bar» на крыше, а также уединенная чайная
						беседка
					</p>
				</div>
			</div>
		</div>
	)
}
