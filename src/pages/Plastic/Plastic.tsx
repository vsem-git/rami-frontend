import AnimationBlock from "./components/AnimationBlock/AnimationBlock";
import { useHeader } from "../../components/HeaderContext";
import { useEffect } from "react";

const Plastic = () => {
    const { setHeaderColor } = useHeader();
    useEffect(() => {
        setHeaderColor("#ffffff");
    }, []);
    return (
        <>
            <AnimationBlock />
        </>
    );
};

export default Plastic;
