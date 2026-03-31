import type { Doctor, DoctorRecord, Directions } from "../types/doctor";

/** PocketBase sometimes returns JSON fields as raw strings — parse safely. */
const safeArray = <T,>(val: unknown): T[] => {
    if (Array.isArray(val)) return val as T[];
    if (typeof val === "string") {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
};

/**
 * Converts a PocketBase DoctorRecord into the legacy Doctor type
 * (which includes JSX elements for welcome_block title/description and quote).
 */
export const doctorFromRecord = (record: DoctorRecord): Doctor => {
    return {
        id: record.slug,
        image: record.image,
        shadow: record.shadow,
        video: record.video,
        specialties: safeArray<string>(record.specialties),
        directions: safeArray<Directions>(record.directions),
        lastName: record.lastName,
        firstName: record.firstName,
        link: `/doctor/${record.slug}`,
        videoFooterIm: record.videoFooterIm,
        videoFooterMp: record.videoFooterMp,
        cards: safeArray<string>(record.cards),
        isSpecialites: record.isSpecialites,
        modalProfessionalDev: safeArray(record.modalProfessionalDev),
        modalEducation: safeArray(record.modalEducation),
        route: safeArray(record.route),
        titleGallery: record.titleGallery,
        gallery: safeArray(record.gallery),
        modal_result: safeArray(record.modal_result),
        modalCardEducation: safeArray(record.modalCardEducation),
        modalCardPath: safeArray(record.modalCardPath),
        welcome_block: [
            {
                bg: record.bgDesktop ?? "",
                bgMobile: record.bgMobile ?? "",
                title: (
                    <h1 className="text-2xl/[125%] sm:text-3xl/[125%] md:text-5xl/[125%] xl:text-7xl/[125%] 2xl:text-8xl/[125%] font-normal uppercase mb-6 xl:mb-10">
                        {record.lastName}
                        <br />
                        {record.firstName}
                    </h1>
                ),
                description: record.welcomeDescription ? (
                    <p className="text-[clamp(20px,2vw,24px)]/[125%] md:text-[clamp(24px,2vw,36px)]/[125%] text-[#1D1D1D] md:text-white font-normal uppercase w-full md:max-w-[616px] 2xl:max-w-[920px] tracking-[8%]">
                        {record.welcomeDescription}
                    </p>
                ) : (
                    <></>
                ),
            },
        ],
        quote: record.quoteText ? (
            <p className="text-[clamp(0.875rem,1.5vw,21px)]/[155%] text-[#1D1D1D] font-normal uppercase">
                {record.quoteText}
            </p>
        ) : undefined,
    };
};
