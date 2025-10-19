import { PUBLIC_API_BASE_URL } from "astro:env/client";

const apiBaseURL = PUBLIC_API_BASE_URL ?? "";
console.log("api", apiBaseURL);
document.addEventListener("alpine:init", () => {
    // @ts-ignore
    Alpine.data("useTimestamps", () => ({
        data() {
            // @ts-ignore
            const inputs = Array.from(this.$el.querySelectorAll("input, textarea"));
            // @ts-ignore
            const data = inputs.reduce((object, key) => ({ ...object, [key.name]: key.value }), {});
            return data;
        },

        result: "",

        async post() {
            let response;
            try {
                console.info("Form submitted");
                response = await fetch(`${apiBaseURL}/api/timestamps`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.data()),
                });
            } catch (error) {
                console.error("Error while fetch post shorturl", error);
                throw error;
            }

            if (!response) {
                throw new Error("No response from api");
            }

            let json;
            try {
                json = await response.json();
            } catch (error) {
                console.error("Error while parsing json", error);
                throw error;
            }

            if ("result" in json) {
                this.result = json.result;
            }
        },
    }));
});
