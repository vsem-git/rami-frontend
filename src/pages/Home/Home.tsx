import VideoAnimation from '../../components/VideoAnimation/VideoAnimation'
/* import FirstAnimationBlock from "../../components/FirstAnimationBlock/FirstAnimationBlock"; */
import FourthAnimationBlock from '../../components/FourthAnimationBlock/FourthAnimationBlock'
import RebornFirstAnimationBlock from '../../components/RebornFirstAnimationBlock/RebornFirstAnimationBlock'
import SecondAnimationBlock from '../../components/SecondAnimationBlock/SecondAnimationBlock'
import ThirdAndSecondAnimation from '../../components/WrapperThirdAnimation/ThirdAndSecondAnimation'

// function toggleBypass() {
//     const key = "uc_bypass";
//     const on = localStorage.getItem(key) === "1";
//     if (on) localStorage.removeItem(key);
//     else localStorage.setItem(key, "1");
//     location.reload();
// }

const Home = () => {
	return (
		<>
			<VideoAnimation />
			{/* <FirstAnimationBlock /> */}
			<RebornFirstAnimationBlock />

			<SecondAnimationBlock />
			<ThirdAndSecondAnimation />
			<FourthAnimationBlock />
		</>
	)
}

export default Home
