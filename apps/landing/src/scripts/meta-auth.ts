import { init } from "astro/virtual-modules/prefetch.js";
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


    if (expectedStatus === 204 && response.status === 204) {
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
        throw new Error(json.message);
    }


    return json;
}
async function getMetaSession() {
    const url = `${apiBaseURL}/api/meta-auth/sessions`;

    await tryFetch({
        url,
        expectedStatus: 200,
        method: 'GET'
    });

}

async function createMetaUser({
    username,
    password
}: {
        username: string;
        password: string;
    }) {
    const url = `${apiBaseURL}/api/meta-auth/users`;

    if (!username || !password) return;

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
        userLoggedIn: false,
        hiddenSecret: "",
        async createMetaUser() {
            if (!this.username || !this.password) return;

            this.systemMessage = 'Creating user...'

            try {
                await createMetaUser({
                    username: this.username,
                    password: this.password
                })

                this.userCreated = true;
                this.systemMessage = `User ${this.username} created!`

            } catch (error) {
                this.systemMessage = (error as Error).message
            } finally {
                this.clearMessages(2000)
            }
        },
        init() {
            console.log('init', this.userLoggedIn)
            this.checkSession()
        },
        async createMetaSession(data: any) {
            if (!data.username || !data.password) return;

            this.systemMessage = 'Logging in...'
            try {
                await createMetaSession(data)

                this.userLoggedIn = true;
                this.systemMessage = 'Success!'

            } catch (error) {
                this.systemMessage = (error as Error).message
            } finally {
                this.clearMessages()
                this.hiddenSecret = ''
            }
        },
        clearMessages(timeout = 1500) {
            setTimeout(() => {
                this.systemMessage = ''
            }, timeout)
        },
        async deleteMetaSession() {
            this.systemMessage = 'Logout...'

            try {
                await deleteMetaSession()

                this.userLoggedIn = false;
                this.systemMessage = 'Bye bye!'

                this.clearMessages()

            } catch (error) {
                this.systemMessage = (error as Error).message
            } finally {
                this.clearMessages()
                this.hiddenSecret = ''
            this.userCreated = false;
            this.userLoggedIn = false;
            }
        },
        async checkSession() {
            try {
                await getMetaSession()

                this.userLoggedIn = true;
            } catch (error) {
                this.userLoggedIn = false;
                this.hiddenSecret = ''
            }
        },
        async getMetaSession() {
            this.systemMessage = 'Getting session...'
            try {
                await getMetaSession()

                this.userLoggedIn = true;
                this.systemMessage = 'Success!'
                this.hiddenSecret = 'This is the hidden secret'
            } catch (error) {
                this.systemMessage = (error as Error).message
                this.userLoggedIn = false;
                this.hiddenSecret = ''
            }
        },
        noop,
    }));

});
