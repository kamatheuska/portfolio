const sanitizeHtml = require('sanitize-html');

async function sanitizeContent(next) {
    try {
        const sanitizedHtmlContent = sanitizeHtml(this.content);
        this.content = sanitizedHtmlContent;
        await this.validate(next);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    sanitizeContent,
};
