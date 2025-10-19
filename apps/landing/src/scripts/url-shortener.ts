import { string } from "astro:schema";

document.addEventListener("alpine:init", () => {
    // @ts-ignore
    Alpine.data("useUrlShortenerForm", () => ({
        data() {
            // @ts-ignore
            const inputs = Array.from(this.$el.querySelectorAll("input, textarea"));
            // @ts-ignore
            const data = inputs.reduce((object, key) => ({ ...object, [key.name]: key.value }), {});
            return data;
        },

        shortUrl: "",
        originalUrl: "",
        shortenedUrlHref: "",

        async post() {
            let response;
            try {
                console.info("Form submitted");
                response = await fetch("/api/url-shortener", {
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

            if ("short_url" in json) {
                this.shortUrl = json.short_url;
                this.shortenedUrlHref = `/api/url-shortener/${json.short_url}`;
            }
            if ("original_url" in json) {
                this.originalUrl = json.original_url;
            }
        },
    }));
});
