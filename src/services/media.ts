import pb from "./pocketbase";

export interface MediaRecord {
    id: string;
    file: string;
    label: string;
    context: string;
    collectionId: string;
    collectionName: string;
}

/**
 * Upload a file to the `media` PocketBase collection.
 * Returns the public URL of the uploaded file.
 */
export const uploadMedia = async (
    file: File,
    label: string = "",
    context: string = "",
): Promise<{ record: MediaRecord; url: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    if (label) formData.append("label", label);
    if (context) formData.append("context", context);

    const record = await pb.collection("media").create<MediaRecord>(formData);
    const url = pb.files.getURL(record, record.file);
    return { record, url };
};
