import { PUBLIC_API_BASE_URL } from "astro:env/client";

const apiBaseURL = PUBLIC_API_BASE_URL ?? "";
console.log("api", apiBaseURL);
document.addEventListener("alpine:init", () => {
    // @ts-ignore
    Alpine.data("useFileMetadataForm", () => ({
        result: "",
        file: "",

        async analyseFile() {
            let response;
            const fileInput = document.querySelector('input[type="file"]');
            if (!fileInput) {
                return;
            }
            // @ts-ignore
            const file = fileInput.files[0];

            const formData = new FormData();
            formData.append("file", file);
            try {
                console.info("Form submitted");
                response = await fetch(`${apiBaseURL}/api/file-analyse`, {
                    method: "POST",
                    body: formData,
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

            this.result = JSON.stringify(json, undefined, 2);
            console.log("res", this.result);
        },
    }));
});
