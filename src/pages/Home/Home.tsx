import VideoAnimation from "../../components/VideoAnimation/VideoAnimation";
import FirstAnimationBlock from "../../components/FirstAnimationBlock/FirstAnimationBlock";
import SecondAnimationBlock from "../../components/SecondAnimationBlock/SecondAnimationBlock";
import ThirdAndSecondAnimation from "../../components/WrapperThirdAnimation/ThirdAndSecondAnimation";
import FourthAnimationBlock from "../../components/FourthAnimationBlock/FourthAnimationBlock";

const Home = () => {
    return (
        <>
            <VideoAnimation />
            <FirstAnimationBlock />
            <SecondAnimationBlock />
            <ThirdAndSecondAnimation />
            <FourthAnimationBlock />
        </>
    );
};

export default Home;
