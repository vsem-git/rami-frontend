// hooks/useScrollReset.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

export const useScrollReset = () => {
	useEffect(() => {
		return () => {
			ScrollTrigger.getAll().forEach(trigger => {
				trigger.kill()
			})
			gsap.set('*', { clearProps: 'transform,opacity,width,height,x,y' })
		}
	}, [])
}
