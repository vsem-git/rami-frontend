import gsap from 'gsap'
import { useEffect, useRef, type RefObject } from 'react'

export const useMobileTextAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	isMobile: boolean
) => {
	const animationRef = useRef<gsap.core.Timeline | null>(null)

	useEffect(() => {
		if (!isMobile || !textRef.current) return

		const textElement = textRef.current

		gsap.set(textElement, {
			x: '100%',
			y: '0%',
			opacity: 1,
			whiteSpace: 'nowrap',
		})

		const tl = gsap.timeline({
			onComplete: () => {
				gsap.set(textElement, {
					y: '-130vw',
					x: '0%',
				})
			},
		})

		tl.to(textElement, {
			x: '0%',
			duration: 3,
			ease: 'power2.out',
		})

		tl.to(textElement, {
			duration: 1.5,
		})

		tl.to(textElement, {
			y: '-150vw',
			duration: 2,
			ease: 'power2.inOut',
		})

		animationRef.current = tl

		return () => {
			if (animationRef.current) {
				animationRef.current.kill()
			}
		}
	}, [isMobile, textRef])
}
