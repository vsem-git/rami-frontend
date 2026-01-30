import { ContactForm } from "../../components/ContactForm";
import { ContactInfo } from "../../components/ContactInfo";

export const Contact = () => {
    return (
        <>
            <section className="w-full md:grid grid-cols-2 md:flex-row mt-[120px] sm:mt-[100px] md:mt-0 h-auto md:h-[580px] lg:h-[720px] xl:h-screen">
                <div className="flex-1 px-6 2xl:px-10 w-full flex flex-col justify-center">
                    <ContactInfo />
                </div>
                <div className='flex-1 w-full min-h-[480px] h-[480px] md:h-full mt-16 md:mt-0 bg-[url("/map.png")] bg-no-repeat bg-cover flex items-center justify-center'>
                    <button className="w-20 h-20 flex items-center justify-center bg-[#691C32] rounded-full border-none cursor-pointer">
                        <img
                            src="/mappinline.svg"
                            alt="map-btn"
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            </section>

            {/* <ContactForm /> */}
        </>
    );
};
