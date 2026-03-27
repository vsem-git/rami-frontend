import { useContentContext } from "../contexts/ContentContext";

export const useContent = (fieldId: string, fallback: string): string => {
    const { getContent } = useContentContext();
    return getContent(fieldId, fallback);
};
