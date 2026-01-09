import { CarePopup } from "./popups/CarePopup";
import { InjectionPopup } from "./popups/InjectionPopup";
import { InstrumentalPopup } from "./popups/InstrumentalPopup";
import { LiftingPopup } from "./popups/LiftingPopup";

const PopupWrapper = () => {
    return (
        <>
            <InjectionPopup />
            <LiftingPopup />
            <CarePopup />
            <InstrumentalPopup />
        </>
    );
};

export default PopupWrapper;
