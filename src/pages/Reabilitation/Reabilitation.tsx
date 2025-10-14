import { useHeader } from "../../components/HeaderContext";
import { useEffect } from "react";
import AnimationBlock from "../../components/Reabilitation/AnimationBlock";

const Reabilitation = () => {
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

export default Reabilitation;
