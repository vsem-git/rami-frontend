<<<<<<< HEAD
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Hair from '../Lines/Hair'

const AnimationBlock = () => {
	const containerRef = useRef(null)
	const runningStroke = useRef(null)
	const imageRef = useRef(null)
	const firstText = useRef(null)
	const secondText = useRef(null)
	const thirdText = useRef(null)
	const fourthText = useRef(null)
=======
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Hair from "../Lines/Hair";
import Correction from "../Lines/Correction";
import Plastic from "../Lines/Plastic";
import Grud from "../Lines/Grud";
import Intim from "../Lines/Intim";
import Body from "../Lines/Body";
import { usePopup } from "../../PopupContext";

const AnimationBlock = () => {
    const { openPopup } = usePopup();

    const containerRef = useRef(null);
    const runningStroke = useRef(null);
    const imageRef = useRef(null);
    const firstText = useRef(null);
    const secondText = useRef(null);
    const thirdText = useRef(null);
    const fourthText = useRef(null);
    const servicesBlock = useRef(null);
>>>>>>> fc4bb6e220e1d29b0d8f5db4027039d1109a8481

	useGSAP(() => {
		gsap.set(
			[
				firstText.current,
				secondText.current,
				thirdText.current,
				fourthText.current,
			],
			{
				opacity: 0,
				filter: 'blur(10px)',
			}
		)

<<<<<<< HEAD
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top top',
				end: '+=1000%',
				scrub: 1,
				pin: true,
				anticipatePin: 1,
				fastScrollEnd: true,
			},
		})

		tl.fromTo(
			firstText.current,
			{
				opacity: 0,
				duration: 1,
				ease: 'none',
			},
			{
				opacity: 1,
				scale: 1,
				filter: 'blur(0px)',
				duration: 1,
				ease: 'none',
			}
		)
=======
        gsap.set(".shelf", {
            scale: 0,
            opacity: 0,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1000%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });

        tl.fromTo(
            firstText.current,
            {
                opacity: 0,
                duration: 1,
                ease: "none",
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "none",
            }
        ).to(
            ".shelf",
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "none",
            },
            "<"
        );
>>>>>>> fc4bb6e220e1d29b0d8f5db4027039d1109a8481

		tl.to({}, { duration: 1, ease: 'none' })

<<<<<<< HEAD
		tl.fromTo(
			runningStroke.current,
			{
				y: '0%',
				opacity: 1,
			},
			{
				y: '-100%',
				opacity: 0,
				duration: 1,
				ease: 'none',
			}
		)
			.to(
				imageRef.current,
				{
					height: '145%',
					duration: 2,
					ease: 'none',
				},
				'<'
			)
			.fromTo(
				firstText.current,
				{
					opacity: 1,
				},
				{
					opacity: 0,
					y: -20,
					duration: 1,
					ease: 'none',
				},
				'<'
			)

		tl.fromTo(
			secondText.current,
			{
				opacity: 0,
				ease: 'none',
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				filter: 'blur(0px)',
				ease: 'none',
			}
		)
=======
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            tl.fromTo(
                runningStroke.current,
                {
                    y: "0%",
                    opacity: 1,
                },
                {
                    y: "-100%",
                    opacity: 0,
                    duration: 1,
                    ease: "none",
                }
            )
                .to(
                    imageRef.current,
                    {
                        /* scale: 1.2,
                        bottom: "8%", */
                        left: "-4%",
                        width: "120%",
                        duration: 2,
                        ease: "none",
                    },
                    "<"
                )
                .fromTo(
                    firstText.current,
                    {
                        opacity: 1,
                    },
                    {
                        opacity: 0,
                        y: -20,
                        duration: 1,
                        ease: "none",
                    },
                    "<"
                );
        });
        mm.add("(max-width: 769px)", () => {
            tl.fromTo(
                runningStroke.current,
                {
                    y: "0%",
                    opacity: 1,
                },
                {
                    y: "-100%",
                    opacity: 0,
                    duration: 1,
                    ease: "none",
                }
            ).fromTo(
                firstText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                },
                "<"
            );

            tl.fromTo(
                servicesBlock.current,
                {
                    opacity: 0,
                    ease: "none",
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    filter: "blur(0px)",
                    ease: "none",
                }
            );

            tl.to({}, { duration: 2, ease: "none" });

            tl.fromTo(
                servicesBlock.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                }
            );
        });

        tl.fromTo(
            secondText.current,
            {
                opacity: 0,
                ease: "none",
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                filter: "blur(0px)",
                ease: "none",
            }
        );
>>>>>>> fc4bb6e220e1d29b0d8f5db4027039d1109a8481

		tl.to({}, { duration: 2, ease: 'none' })

		tl.fromTo(
			secondText.current,
			{
				opacity: 1,
			},
			{
				opacity: 0,
				y: -20,
				duration: 1,
				ease: 'none',
			}
		)

		tl.fromTo(
			thirdText.current,
			{
				opacity: 0,
				ease: 'none',
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				filter: 'blur(0px)',
				ease: 'none',
			}
		)

		tl.to({}, { duration: 2, ease: 'none' })

		tl.fromTo(
			thirdText.current,
			{
				opacity: 1,
			},
			{
				opacity: 0,
				y: -20,
				duration: 1,
				ease: 'none',
			}
		)

		tl.fromTo(
			fourthText.current,
			{
				opacity: 0,
				ease: 'none',
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				filter: 'blur(0px)',
				ease: 'none',
			}
		)

<<<<<<< HEAD
		tl.to({}, { duration: 2, ease: 'none' })

		tl.fromTo(
			fourthText.current,
			{
				opacity: 1,
			},
			{
				opacity: 0,
				y: -20,
				duration: 1,
				ease: 'none',
			}
		)
	})

	return (
		<div
			ref={containerRef}
			className='overflow-hidden relative min-h-dvh text-white  bg-[#080808] before:z-[-1] before:absolute before:h-dvh before:bottom-0 before:left-20 before:w-[calc(90%)] '
		>
			<div className='absolute inset-0'>
				<Hair className='absolute bottom-[540px] left-[455px]' />
			</div>
			<div className='absolute z-[-1] h-dvh w-full bg-[#080808]'>
				<img
					src='/plasticbg.jpg'
					className='absolute bottom-0 left-0 aspect-[4096/2777] h-[120%] object-cover object-bottom'
					alt=''
					ref={imageRef}
				/>
			</div>
			<div
				className='absolute top-[132px] left-0 w-full overflow-hidden'
				ref={runningStroke}
			>
				<div className='marquee flex whitespace-nowrap text-[130px] mix-blend-difference'>
					<span className='px-8'>ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
					<span className='px-8'>ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
					<span className='px-8'>ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
					<span className='px-8'>ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
				</div>
			</div>
			<div
				ref={firstText}
				className='absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col gap-4 p-[115px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]'
			>
				<p className='mt-30'>
					Пластический хирург – как скульптор – кончиками пальцев, умом и
					сердцем – творит новый образ пациента, восстанавливая гармонию между
					внешним и внутренним возрастом человека.
				</p>

				<p>
					Мы не только продлеваем молодость, но и меняем качество жизни, давая
					возможность ежедневно наслаждаться собственным преображением,
					ощущением свободы и обретением духовной силы.
				</p>
			</div>
			<div
				ref={secondText}
				className='absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col p-[80px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]'
			>
				<div className='mb-10 text-[21px]'>
					Команде пластических хирургов RAMICLINIC RESIDENCE – мастеров мирового
					уровня – под силу{' '}
					<span className='font-bold'>
						все операции на самом сложном уровне
					</span>
					:
				</div>
				<div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							01
						</div>
						<div className='text-lg font-medium uppercase'>
							Реконструктивные операции
						</div>
					</div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							02
						</div>
						<div className='text-lg font-medium uppercase'>
							Эстетические операции
						</div>
					</div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							03
						</div>
						<div className='text-lg font-medium uppercase'>
							Онкопластические операции
						</div>
					</div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							04
						</div>
						<div className='text-lg font-medium uppercase'>
							Повторные операции
						</div>
					</div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							05
						</div>
						<div className='text-lg font-medium uppercase'>
							Мужская пластика
						</div>
					</div>
				</div>
			</div>
			<div
				ref={thirdText}
				className='absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col gap-4 p-[110px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]'
			>
				<p className='text-[36px] mb-6'>Наш подход</p>
				<p>
					Мы не только продлеваем молодость, но и{' '}
					<span className='font-bold'>меняем качество жизни</span>, давая
					возможность ежедневно наслаждаться собственным преображением,
					ощущением свободы и обретением духовной силы.
				</p>
			</div>
			<div
				ref={fourthText}
				className='absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col p-[110px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]'
			>
				<p className='text-[36px] mb-10'>
					Преимущества пациент-центрированного подхода:
				</p>
				<div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							01
						</div>
						<div className='text-lg font-medium uppercase'>
							Реконструктивные операции
						</div>
					</div>
				</div>

				<div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							02
						</div>
						<div className='text-lg font-medium uppercase'>
							Антиэйдж-сопровождение
						</div>
					</div>
				</div>

				<div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center'>
						<div className='aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full'>
							03
						</div>
						<div className='text-lg font-medium uppercase'>
							Персонализированная «дорожная карта
						</div>
					</div>
				</div>

				<div>
					<div className='grid grid-cols-[48px_1fr] gap-6 items-center mb-4'>
						<div className='aspect-square flex justify-center items-center rounded-full'></div>
						<div className='text-lg uppercase text-[#FFFFFF99]'>
							С логистикой всех этапов эстетического преображения: от подготовки
							к операции до предсказуемых сценариев реабилитационной программы.
						</div>
					</div>
				</div>
			</div>
			{/* <Hair className="absolute hairplastic" />
=======
        /* tl.to({}, { duration: 2, ease: "none" });

        tl.fromTo(
            fourthText.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "none",
            }
        ); */
    });

    return (
        <div
            ref={containerRef}
            className="overflow-hidden relative min-h-dvh text-white  bg-[#080808] before:z-[-1] before:absolute before:h-dvh before:bottom-0 before:left-20 before:w-[calc(90%)] "
        >
            <div className="absolute z-[-1] h-dvh w-full bg-[#080808]">
                <div
                    ref={imageRef}
                    className="absolute -bottom-10 left-0 w-[100%] aspect-[4096/2777] bg-[url('/plasticbg.webp')] [background-position:15%_bottom] bg-no-repeat bg-cover min-h-dvh md:bg-contain sm:bg-bottom"
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="md:hidden absolute bottom-4 left-4 flex items-center w-fit gap-3">
                        <div className="p-3 bg-[#691C32] rounded-full">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2.5V8M8 13.5V8M8 8H13.5H2.5"
                                    stroke="white"
                                    stroke-width="1.5"
                                />
                            </svg>
                        </div>
                        <p className="text-xs font-semibold">СМОТРЕТЬ УСЛУГИ</p>
                    </div>
                    <Hair className="shelf hidden md:block absolute bottom-[47%] left-[27.5%] z-50" />
                    <Correction className="shelf hidden md:block absolute bottom-[37%] right-[76.5%] 2xl:left-[5.5%] z-50 2xl:whitespace-nowrap" />
                    <Grud className="shelf hidden md:block absolute bottom-[30%] right-[74%] 2xl:left-[14.5%] z-50" />
                    <Intim className="shelf hidden md:block absolute bottom-[23%] right-[71%] 2xl:left-[10.5%] 2xl:whitespace-nowrap z-50" />
                    <Body className="shelf hidden md:block absolute bottom-[26%] left-[31%] 2xl:left-[29.5%] z-50" />
                    <Plastic className="shelf hidden md:block absolute bottom-[36%] left-[28%] 2xl:left-[28.5%] z-50" />
                </div>
            </div>
            <div
                className="absolute bottom-[80px] sm:bottom-auto sm:top-[96px] md:top-[122px] left-0 w-full overflow-hidden"
                ref={runningStroke}
            >
                <div className="marquee flex whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference">
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                </div>
            </div>
            <div
                ref={firstText}
                className="absolute scale-50 text-xs 2xl:text-lg opacity-0 h-full right-0 z-10 flex flex-col gap-4 xl:p-[80px] 2xl:p-[115px] uppercase justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] md:px-[32px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="mt-30">
                    Пластический хирург – как скульптор – кончиками пальцев,
                    умом и сердцем – творит новый образ пациента, восстанавливая
                    гармонию между внешним и внутренним возрастом человека.
                </p>

                <p>
                    Мы не только продлеваем молодость, но и меняем качество
                    жизни, давая возможность ежедневно наслаждаться собственным
                    преображением, ощущением свободы и обретением духовной силы.
                </p>
            </div>
            <div
                ref={servicesBlock}
                className="absolute scale-50 mt-30 sm:mt-0 text-xs 2xl:text-lg opacity-0 h-full right-0 z-10 flex flex-col gap-8 xl:p-[80px] 2xl:p-[115px] uppercase justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-[20px] uppercase mt-[]">
                    Услуги пластической хирургии
                </p>
                <div className=" border-t border-[#FFFFFF26]">
                    <div
                        onClick={() => openPopup("hairpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Пересадка волос</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                stroke-opacity="0.5"
                                stroke-width="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("correctionpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">
                            Коррекция шрамов и рубцов
                        </div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                stroke-opacity="0.5"
                                stroke-width="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("plasticpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">пластика лица</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                stroke-opacity="0.5"
                                stroke-width="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("breastpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Грудь</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                stroke-opacity="0.5"
                                stroke-width="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("intimpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Интимная пластика</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                stroke-opacity="0.5"
                                stroke-width="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("bodypopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Тело</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                stroke-opacity="0.5"
                                stroke-width="1.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                ref={secondText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <div className="mb-8 2xl:mb-10 text-sm 2xl:text-[21px]">
                    Команде пластических хирургов RAMICLINIC RESIDENCE –
                    мастеров мирового уровня – под силу{" "}
                    <span className="font-bold">
                        все операции на самом сложном уровне
                    </span>
                    :
                </div>
                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            01
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Реконструктивные операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            02
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Эстетические операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            03
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Онкопластические операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            04
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Повторные операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            05
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Мужская пластика
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={thirdText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-[20px] 2xl:text-[28px] mb-6">Наш подход</p>
                <p className="text-[14px] 2xl:text-[21px]">
                    Мы не только продлеваем молодость, но и{" "}
                    <span className="font-bold">меняем качество жизни</span>,
                    давая возможность ежедневно наслаждаться собственным
                    преображением, ощущением свободы и обретением духовной силы.
                </p>
            </div>
            <div
                ref={fourthText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-[20px] 2xl:text-[28px] mb-10">
                    Преимущества пациент-центрированного подхода:
                </p>
                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            01
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Реконструктивные операции
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            02
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Антиэйдж-сопровождение
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[11px] rounded-full">
                            03
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-xs">
                            Персонализированная «дорожная карта
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-4">
                        <div className="aspect-square flex justify-center items-center rounded-full"></div>
                        <div className="2xl:text-lg font-medium uppercase text-xs text-[#FFFFFF99] leading-[155%]">
                            С логистикой всех этапов эстетического преображения:
                            от подготовки к операции до предсказуемых сценариев
                            реабилитационной программы.
                        </div>
                    </div>
                </div>
            </div>
            {/* <Hair className="absolute hairplastic" />
>>>>>>> fc4bb6e220e1d29b0d8f5db4027039d1109a8481
            <Correction className="absolute correctionplastic" />
            <Plastic className="absolute plasticplastic" />
            <Grud className="absolute grudplastic" />
            <Intim className="absolute intimplastic" />
            <Body className="absolute bodyplastic" /> */}
		</div>
	)
}

export default AnimationBlock
