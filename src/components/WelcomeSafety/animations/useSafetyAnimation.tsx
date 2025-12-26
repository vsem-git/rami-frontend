import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useSafetyAnimation = (
	textRef: RefObject<HTMLHeadingElement | null>,
	isMobile?: boolean
) => {
	useEffect(() => {
		if (isMobile || window.innerWidth <= 768) {
			return
		}

		const textElement = textRef.current

		if (!textElement) return

		gsap.set(textElement, {
			y: '0%',
			opacity: 1,
		})
	}, [textRef, isMobile])
}
