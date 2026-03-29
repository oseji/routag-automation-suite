import axios from "axios";

export const fetchOTPFromMailtrap = async (): Promise<string> => {
    const url = `https://mailtrap.io/api/accounts/v1/inboxes/${process.env.MAILTRAP_INBOX_ID}/messages`;

    for (let i = 0; i < 10; i++) {
        try {
            const response = await axios.get(url, {
                headers: { "Api-Token": process.env.MAILTRAP_API_KEY! },
            });

            if (response.data && response.data.length > 0) {
                const messageId = response.data[0].id;
                const body = await axios.get(`${url}/${messageId}/body.txt`, {
                    headers: { "Api-Token": process.env.MAILTRAP_API_KEY! },
                });

                const otpMatch = body.data.match(/\b\d{6}\b/);
                if (otpMatch) return otpMatch[0];
            }
        } catch (error: any) {
            console.error("Mailtrap Fetch Error:", error.message);
        }
        await new Promise((res) => setTimeout(res, 3000)); // Wait 3s before retry
    }
    throw new Error("OTP not found in Mailtrap after 30 seconds");
};
