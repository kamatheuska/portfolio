import { PUBLIC_API_BASE_URL } from "astro:env/client";

const apiBaseURL = PUBLIC_API_BASE_URL ?? "";

async function tryFetch({
    url,
    body = null,
    expectedStatus = 200,
    method = 'GET'
}: {
    url: string;
    body: Record<string, any>;
    expectedStatus: number;
    method: string;
}) {
    let response;
    try {
        console.info("Form submitted");
        const isUpdate = ['POST', 'PUT'].includes(method)

        const headers = isUpdate ? {
            "Content-Type": "application/json",
        } : undefined
        const updateBody = body ? JSON.stringify(body) : undefined;

        response = await fetch(url, {
            method,
            headers,
            body: updateBody,
            credentials: 'include'
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
        username: "",
        password: "",
        userCreated: false,
        userLoggedIn: false,
        hiddenSecret: null,

        async createMetaUser() {
            const url = `${apiBaseURL}/api/meta-auth/users`;

            try {
                await tryFetch({
                    url,
                    expectedStatus: 204,
                    method: 'POST',
                    body: {
                        username: this.username,
                        password: this.password,
                    },
                });

                this.userCreated = true;

                alert("User created!");
            } catch (error) {
                alert("Error on user creation", error.message);
            }
        },

        async createMetaSession() {
            const url = `${apiBaseURL}/api/meta-auth/sessions`;

            try {
                await tryFetch({
                    url,
                    expectedStatus: 204,
                    method: 'POST',
                    body: {
                        username: this.username,
                        password: this.password,
                    },
                });

                this.userLoggedIn = true;

                alert("User logged in!");
            } catch (error) {
                alert("Error on user login", error.message);
            }
        },

        async getMetaSession() {
            const url = `${apiBaseURL}/api/meta-auth/sessions`;

            try {
                await tryFetch({
                    url,
                    expectedStatus: 200,
                    method: 'GET'
                });

                this.hiddenSecret = "Not a big deal after all: 1234";

                alert("User session succesfully fetched!");
            } catch (error) {
                alert("Error while fetching the user session", error.message);
            }

        },

        async deleteMetaSession() {
            const url = `${apiBaseURL}/api/meta-auth/sessions`;

            if (!this.userLoggedIn) {
                alert("First login, then logout :)")
                return
            }

            try {
                await tryFetch({
                    url,
                    expectedStatus: 204,
                    method: 'DELETE'
                });

                this.hiddenSecret = ""
                this.username = ""
                this.password = ""
                this.userCreated = false
                this.userLoggedIn = false

                alert("User session succesfully deleted. Logged out!");
            } catch (error) {
                alert("Error while logout", error.message);
            }

        },
        noop() {}
    }));
});
