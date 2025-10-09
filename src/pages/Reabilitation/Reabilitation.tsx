import { useHeader } from "../../components/HeaderContext";
import { useEffect } from "react";

const Reabilitation = () => {
    const { setHeaderColor } = useHeader();
    useEffect(() => {
        setHeaderColor("#ffffff");
    }, []);
    return <></>;
};

export default Reabilitation;
