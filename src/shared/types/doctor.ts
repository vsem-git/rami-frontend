import type { JSX } from "react";

export interface ICardDoctorAge {
    year: string;
    title: string;
    description: string;
    image: string;
    backgroundYear: string;
    imageClassName?: string;
}

export type ExperienceItem = {
    year?: string;
    description: string | string[];
};

export type EducationItem =
    | {
          year: string;
          description: string;
          specializations?: string[];
      }
    | {
          year?: never;
          description: string[];
          specializations?: never;
      }
    | {
          year?: never;
          description: string;
          specializations?: never;
      };

export type RouteItem = {
    year: string;
    title: string;
    description: string;
    image: string;
    backgroundYear: string;
    imageClassName: string;
};

export type WelcomeBlockItem = {
    bg: string;
    bgMobile: string;
    title: JSX.Element;
    description: JSX.Element;
};

export type GalleryItem = {
    leftColumnImages?: string[];
    centerColumnImages?: string[];
    rightColumnImages?: string[];
};

export type ModalResultItem = {
    id: number;
    type: Directions;
    description: string;
    before?: string;
    after?: string;
    video?: string;
    commentAudio?: string;
};

// Новый тип для карточек обучения
export type ModalCardEducationItem = {
    id: number;
    year?: string;
    description: string[] | string[][];
    images: string[];
};

export type ModalCardPathItem = {
    id: number;
    year: string;
    description: string[] | string[][];
    images: string[];
};

export type Directions =
    | "Пересадка волос"
    | "Ринопластика"
    | "Пластика лица"
    | "Пластика тела"
    | "Интимная пластика"
    | "Пластика груди"
    | "Коррекция шрамов и рубцов";

// ── PocketBase-serializable doctor record ─────────────────────────────────────

export interface DoctorRecord {
    id: string;                          // PocketBase record id
    slug: string;                        // URL slug, e.g. "serb-irina"
    lastName: string;
    firstName: string;
    specialties: string[];
    directions: string[];
    image: string;
    shadow?: string;
    video: string;
    videoFooterIm?: string;
    videoFooterMp?: string;
    bgDesktop?: string;
    bgMobile?: string;
    welcomeDescription?: string;
    quoteText?: string;
    titleGallery?: string;
    isSpecialites?: boolean;
    sortOrder?: number;
    modalProfessionalDev?: ExperienceItem[];
    modalEducation?: EducationItem[];
    route?: RouteItem[];
    gallery?: GalleryItem[];
    modal_result?: ModalResultItem[];
    modalCardEducation?: ModalCardEducationItem[];
    modalCardPath?: ModalCardPathItem[];
    created?: string;
    updated?: string;
}

export type DoctorCreateData = Omit<DoctorRecord, "id" | "created" | "updated">;

// ── Legacy frontend Doctor type (includes JSX) ────────────────────────────────

export type Doctor = {
    image: string;
    shadow?: string;
    video: string;
    specialties: string[];
    directions: Directions[];
    lastName: string;
    firstName: string;
    link: string;
    linkQuote?: string;
    id: string;

    videoFooterIm?: string;
    videoFooterMp?: string;

    modalProfessionalDev?: ExperienceItem[];
    modalEducation?: EducationItem[];

    route?: RouteItem[];
    welcome_block?: WelcomeBlockItem[];
    quote?: JSX.Element;

    titleGallery?: string;
    gallery?: GalleryItem[];

    modal_result?: ModalResultItem[];

    // Новые поля для модалок
    modalCardEducation?: ModalCardEducationItem[];
    modalCardPath?: ModalCardPathItem[];
    isSpecialites?: boolean;
};
