import { PUBLIC_API_BASE_URL } from "astro:env/client";

const apiBaseURL = PUBLIC_API_BASE_URL ?? "";

async function tryFetch({
    url,
    body,
    expectedStatus = 200,
    method = 'GET'
}: {
    url: string;
    body?: Record<string, any>;
    expectedStatus?: number;
    method?: string;
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
        throw error;
    }

    if (!response) {
        throw new Error("No response from api");
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

    if (response.status !== expectedStatus) {
        throw new Error(json.error.message);
    }

    return json;
}
async function getMetaSession() {
    const url = `${apiBaseURL}/api/meta-auth/sessions`;

    try {
        await tryFetch({
            url,
            expectedStatus: 200,
            method: 'GET'
        });

    } catch (error) {
        console.error("Error while fetching the user session", (error as Error).message);
    }
}

async function createMetaUser({
    username,
    password
}: {
    username: string;
    password: string;
}) {
    const url = `${apiBaseURL}/api/meta-auth/users`;

    await tryFetch({
        url,
        expectedStatus: 204,
        method: 'POST',
        body: {
            username,
            password
        },
    });

}

async function createMetaSession({
    username,
    password
}: {
    username: string;
    password: string;
}) {
    const url = `${apiBaseURL}/api/meta-auth/sessions`;

    await tryFetch({
        url,
        expectedStatus: 204,
        method: 'POST',
        body: {
            username,
            password
        },
    });

}


async function deleteMetaSession() {
    const url = `${apiBaseURL}/api/meta-auth/sessions`;

    await tryFetch({
        url,
        expectedStatus: 204,
        method: 'DELETE'
    });
}

function noop() {}

document.addEventListener("alpine:init", () => {
    // @ts-expect-error - Alpine is not typed
    Alpine.data("useMetaAuthForm", () => ({
        username: "",
        password: "",
        systemMessage: "",
        userCreated: false,
        userLoggedIn: true,
        hiddenSecret: null,
        createMetaUser,
        async createMetaSession(data: any) {
            this.systemMessage = 'Logging in...'
            try {
                await createMetaSession(data)

                this.userLoggedIn = true;
                this.systemMessage = 'Success!'
            } catch (error) {
                this.systemMessage = (error as Error).message
            }
        },
        async deleteMetaSession() {
            this.systemMessage = 'Logout...'

            try {
                await deleteMetaSession();

                this.userLoggedIn = false;
                this.systemMessage = 'Bye bye!'
            } catch (error) {
                this.systemMessage = (error as Error).message
            }
        },
        async getMetaSession() {
            this.systemMessage = 'Getting session...'
            try {
                await getMetaSession();

                this.userLoggedIn = true;
                this.systemMessage = 'Success!'
            } catch (error) {
                this.systemMessage = (error as Error).message
                this.userLoggedIn = false;
            }
        },
        noop,
    }));

    // Not sure why this is needed
    //
    // const session = getMetaSession()
    //     .then((session) => {
    //         const userLoggedIn = true
    //
    //         // @ts-ignore
    //     })

});
