import pb from "./pocketbase";
import { uploadMedia } from "./media";

export interface SpeakerRecord {
    number: string;
    title: string;
    avatar: string;
    name: string;
    description: string;
}

export interface GalleryImageRecord {
    src: string;
    className?: string;
}

export interface NewsItem {
    id: string;
    title: string;
    day: number;
    month: string;
    author: string;
    direction: "мероприятие" | "услуга" | "врач";
    image: string;
    positionImage?: string;
    positionDay?: string;
    isDarkened?: boolean;
    mainTexts?: string[];
    secondaryTexts?: string[];
    speakersData?: SpeakerRecord[];
    galleryImages?: GalleryImageRecord[];
    sortOrder?: number;
    created?: string;
    updated?: string;
}

export type NewsCreateData = Omit<NewsItem, "id" | "created" | "updated">;

export const fetchAllNews = async (): Promise<NewsItem[]> => {
    try {
        return await pb.collection("news").getFullList<NewsItem>({
            sort: "-created",
        });
    } catch {
        return [];
    }
};

export const createNewsItem = async (data: NewsCreateData): Promise<NewsItem> => {
    return await pb.collection("news").create<NewsItem>(data);
};

export const updateNewsItem = async (
    id: string,
    data: Partial<NewsCreateData>,
): Promise<NewsItem> => {
    return await pb.collection("news").update<NewsItem>(id, data);
};

export const deleteNewsItem = async (id: string): Promise<void> => {
    await pb.collection("news").delete(id);
};

export const uploadNewsImage = async (file: File, context?: string): Promise<string> => {
    const { url } = await uploadMedia(file, "news-image", context ?? "new");
    return url;
};
