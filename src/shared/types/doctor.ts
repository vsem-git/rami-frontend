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
    description: string;
    images: string[];
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

export type Doctor = {
    image: string;
    shadow?: string;
    video: string;
    specialties: string[];
    lastName: string;
    firstName: string;
    link: string;
    linkQuote?: string;
    id: string;

    videoFooterIm?: string;
    videoFooterMp?: string;
    cards?: string[];

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
};
