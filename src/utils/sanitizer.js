import DOMPurify from 'dompurify';

export const sanitizeHtml = (content) => {
    return DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
            'p', 'br', 'b', 'i', 'em', 'strong', 'u', 'h1', 'h2', 'h3',
            'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a'
        ],
        ALLOWED_ATTR: ['href', 'target']
    });
};