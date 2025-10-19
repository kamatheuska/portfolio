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
            }

            if (!response) {
                throw new Error("No response from api");
            }

            let json;
            try {
                json = response.json();
            } catch (error) {
                console.error("Error while parsing json", error);
            }
        },
    }));
});
