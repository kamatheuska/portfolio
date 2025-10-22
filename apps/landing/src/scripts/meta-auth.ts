import { PUBLIC_API_BASE_URL } from "astro:env/client";

const apiBaseURL = PUBLIC_API_BASE_URL ?? "";

async function tryPostFetch(url: string, body: Record<string, any>, expectedStatus = 200) {
    let response;
    try {
        console.info("Form submitted");
        response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    } catch (error) {
        console.error("Error while tryPostFetch", error);
        throw error;
    }

    if (!response) {
        throw new Error("No response from api");
    }

    if (response.status !== expectedStatus) {
        throw new Error("Error on tryPostFetch");
    }

    if (expectedStatus === 204) {
        return;
    }

    let json;
    try {
        json = await response.json();
    } catch (error) {
        console.error("Error while parsing json", error);
        throw error;
    }

    return json;
}

document.addEventListener("alpine:init", () => {
    // @ts-ignore
    Alpine.data("useMetaAuthForm", () => ({
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
        username: "",
        password: "",
        userCreated: false,

        async createMetaUser() {
            const url = `${apiBaseURL}/api/meta-auth/users`;

            try {
                await tryPostFetch(
                    url,
                    {
                        username: this.username,
                        password: this.password,
                    },
                    204,
                );

                this.userCreated = true;

                alert("User created!");
            } catch (error) {
                alert("Error on user creation", error.message);
            }
        },

        noop() {}
    }));
});
