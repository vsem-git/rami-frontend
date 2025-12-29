import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useAntiageAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	sectionRef: RefObject<HTMLElement | null>,
	backgroundRef: RefObject<HTMLDivElement | null>, // СТАТИКА
	leftTextRef: RefObject<HTMLHeadingElement | null>,
	geneticPassportRef: RefObject<HTMLHeadingElement | null>,
	hormonesRef: RefObject<HTMLHeadingElement | null>,
	regenerativeMedicineRef: RefObject<HTMLHeadingElement | null>,
	cellularRejuvenationRef: RefObject<HTMLHeadingElement | null>,
	specialBackgroundRef: RefObject<HTMLHeadingElement | null>,
	...contentRefs: RefObject<HTMLDivElement | null>[]
) => {
	useEffect(() => {
		const section = sectionRef.current
		const text = textRef.current
		const bg = backgroundRef.current
		const leftText = leftTextRef.current
		const genetic = geneticPassportRef.current
		const hormones = hormonesRef.current
		const regen = regenerativeMedicineRef.current
		const cellular = cellularRejuvenationRef.current
		const specialBg = specialBackgroundRef.current
		const blocks = contentRefs.map(r => r.current)

		if (
			!section ||
			!text ||
			!bg ||
			!leftText ||
			!genetic ||
			!hormones ||
			!regen ||
			!cellular ||
			!specialBg ||
			blocks.some(b => !b)
		)
			return

		const isMobile = window.innerWidth <= 768

		/* =====================
		   TIMELINE
		===================== */
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: isMobile ? '+=300%' : '+=1000%',
				scrub: 1.5,
				pin: !isMobile,
			},
		})

		/* =====================
		   MOBILE
		===================== */
		if (isMobile) {
			tl.to(text, {
				opacity: 0,
				y: -80,
				duration: 4,
				ease: 'power2.inOut',
			})
			return () => tl.kill()
		}

		/* =====================
		   GIRL — СТАТИКА
		===================== */
		gsap.set(bg, { x: 0, y: 0, scale: 1 })

		/* =====================
		   BIG BACKGROUND
		===================== */
		gsap.set(specialBg, { scale: 1, x: 0 })

		tl.to(
			specialBg,
			{
				x: '-30%',
				scale: 1.5,
				duration: 35,
				ease: 'power2.inOut',
			},
			0
		)

		/* =====================
		   MARQUEE
		===================== */
		gsap.set(text, { opacity: 1 })

		tl.to(
			text,
			{
				x: '-1vw',
				duration: 8,
				ease: 'sine.inOut',
			},
			0
		)

		/* =====================
		   LEFT BIG TEXT
		===================== */
		gsap.set(leftText, { x: '-100%', opacity: 0 })

		tl.to(
			leftText,
			{
				x: '7%',
				opacity: 1,
				duration: 20,
				ease: 'sine.inOut',
			},
			6
		)

		/* =====================
		   SIDE TEXTS — ЦЕНТР / РЯДОМ С BG
		===================== */
		gsap.set([genetic, regen, cellular], {
			opacity: 0,
			x: -60,
		})

		gsap.set(hormones, {
			opacity: 0,
			scale: 0.6,
			filter: 'blur(10px)',
		})

		/* =====================
		   CONTENT BLOCKS + ТЕКСТЫ
		   ПОРЯДОК СОХРАНЁН
		===================== */
		const appear = 5
		const stay = 3.5
		const disappear = 3.5

		blocks.forEach((block, index) => {
			const t = 4 + index * (appear + stay + disappear * 0.9)

			// контент
			gsap.set(block, {
				opacity: 0,
				scale: 0.7,
				filter: 'blur(25px)',
			})

			tl.to(
				block,
				{
					opacity: 1,
					scale: 1,
					filter: 'blur(0px)',
					duration: appear,
					ease: 'power2.out',
				},
				t
			)

			// порядок ТЕКСТОВ — КАК БЫЛ
			if (index === 2) {
				tl.to(
					genetic,
					{
						opacity: 1,
						x: 0,
						duration: 4,
						ease: 'power2.out',
					},
					t
				)
			}

			if (index === 3) {
				tl.to(
					hormones,
					{
						opacity: 1,
						scale: 1,
						filter: 'blur(0px)',
						duration: 4.5,
						ease: 'power2.out',
					},
					t
				)
			}

			if (index === 4) {
				tl.to(
					regen,
					{
						opacity: 1,
						x: 0,
						duration: 4,
						ease: 'power2.out',
					},
					t
				)
			}

			if (index === 5) {
				tl.to(
					cellular,
					{
						opacity: 1,
						x: 0,
						duration: 4,
						ease: 'power2.out',
					},
					t
				)
			}

			if (index < blocks.length - 1) {
				tl.to(
					block,
					{
						opacity: 0,
						scale: 0.95,
						filter: 'blur(10px)',
						duration: disappear,
						ease: 'power2.inOut',
					},
					t + appear + stay * 0.9
				)
			}
		})

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach(t => t.kill())
		}
	}, [
		textRef,
		sectionRef,
		backgroundRef,
		leftTextRef,
		geneticPassportRef,
		hormonesRef,
		regenerativeMedicineRef,
		cellularRejuvenationRef,
		specialBackgroundRef,
		...contentRefs,
	])
}
