import { useEffect } from 'react'
import FooterReabilitation from './components/FooterReabilitation'
import { useHeader } from '../../components/HeaderContext'
import AnimationBlock from './components/AnimationBlock'
import MobileReabilitation from './MobileReabilitation'

const Reabilitation = () => {
	const { setHeaderColor } = useHeader()
	useEffect(() => {
		setHeaderColor('#ffffff')
	}, [])
	return (
		<>
			<div className='hidden md:block'>
				<AnimationBlock />
			</div>

			<div className='md:hidden block'>
				<MobileReabilitation />
				<FooterReabilitation />
			</div>
		</>
	)
}

export default Reabilitation
