const BASE_URL = import.meta.env.VITE_API_URL;

export type FeedbackPayload = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

type FeedbackResponse = {
    success: boolean;
    error?: string;
};

export async function submitFeedback(payload: FeedbackPayload): Promise<FeedbackResponse> {
    const res = await fetch(`${BASE_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return res.json() as Promise<FeedbackResponse>;
}
