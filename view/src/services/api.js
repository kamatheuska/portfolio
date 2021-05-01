async function createShortUrl(url) {
    const body = JSON.stringify({ url });
    debugger; // tslint:disable-line
    const response = await fetch('/api/shorturl/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    return response.json();
}

export default {
    createShortUrl,
};
