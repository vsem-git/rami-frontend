import { useContentContext } from "../contexts/ContentContext";
import Phone from "./svg/Phone";

export const PhoneList = () => {
    const { getContent } = useContentContext();
    const phone = getContent("contact.phone", "+7 (812) 627-13-13");
    const telHref = "tel:" + phone.replace(/[^\d+]/g, "");

    return (
        <div className="mb-10">
            <div className="flex items-center gap-2 md:gap-4 text-[11px] md:text-xs 2xl:text-base font-semibold leading-[155%] text-[#1D1D1D] uppercase whitespace-nowrap">
                <Phone />
                <a
                    href={telHref}
                    className="border-b border-[#1D1D1D26]"
                >
                    <span data-content-hint="contact.phone">+7 (812) 627-13-13</span>
                </a>
            </div>
            <div className="flex items-center gap-1 mt-3 md:mt-6">
                <a
                    href="https://t.me/+78126271313"
                    className="w-12 h-12 flex items-center justify-center cursor-pointer border-[#1D1D1D1A] border rounded-full"
                >
                    <img src="/social/tg.svg" alt="tg" className="w-5 h-5" />
                </a>
                <a
                    href="https://wa.me/78126271313"
                    className="w-12 h-12 flex items-center justify-center cursor-pointer border-[#1D1D1D1A] border rounded-full"
                >
                    <img src="/social/wt.svg" alt="wt" className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
};
