import pb from "./pocketbase";
import { uploadMedia } from "./media";
import type { DoctorRecord, DoctorCreateData } from "../shared/types/doctor";

export const fetchAllDoctors = async (): Promise<DoctorRecord[]> => {
    try {
        return await pb.collection("doctors").getFullList<DoctorRecord>({
            sort: "sortOrder,created",
        });
    } catch {
        return [];
    }
};

export const fetchDoctorBySlug = async (slug: string): Promise<DoctorRecord | null> => {
    try {
        const records = await pb.collection("doctors").getFullList<DoctorRecord>({
            filter: `slug = "${slug}"`,
        });
        return records[0] ?? null;
    } catch {
        return null;
    }
};

export const createDoctor = async (data: DoctorCreateData): Promise<DoctorRecord> => {
    return await pb.collection("doctors").create<DoctorRecord>(data);
};

export const updateDoctor = async (
    id: string,
    data: Partial<DoctorCreateData>,
): Promise<DoctorRecord> => {
    return await pb.collection("doctors").update<DoctorRecord>(id, data);
};

export const deleteDoctor = async (id: string): Promise<void> => {
    await pb.collection("doctors").delete(id);
};

export const uploadDoctorImage = async (file: File, context?: string): Promise<string> => {
    const { url } = await uploadMedia(file, "doctor-image", context ?? "new");
    return url;
};