export function setCookie(name, value, days, path = '/') {
    let expires = '';

    if (typeof days === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=${path}; SameSite=Lax`;
}

export const getCookie = (name) => {
    const cookies = document.cookie.split("; ");

    const cookie = cookies.find((row) =>
        row.startsWith(`${encodeURIComponent(name)}=`)
    );

    return cookie
        ? decodeURIComponent(cookie.substring(cookie.indexOf("=") + 1))
        : null;
};

export function deleteCookie(name, path = '/') {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; SameSite=Lax`;
}