/**
 * Lightweight auth for the /admin area.
 *
 * NOT real security — the site is static, so anyone determined enough
 * could bypass this. It's a password-shaped speed bump that keeps the
 * editor out of the public navigation flow.
 *
 * To change the password: edit ADMIN_PASSWORD_HASH below. Generate a new
 * hash by running this in the browser console:
 *
 *   await crypto.subtle.digest("SHA-256", new TextEncoder().encode("yourPassword"))
 *     .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join(""))
 */

// SHA-256 of "letmewrite" — change this!
export const ADMIN_PASSWORD_HASH =
    "6d95874eee041ddb65ac93d0f0b3fb9499947ef90b6a28872d13b0cf8b91d83d";

const SESSION_KEY = "aris_admin_authed";

export const isAuthed = () =>
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem(SESSION_KEY) === "1";

export const setAuthed = () => sessionStorage.setItem(SESSION_KEY, "1");

export const clearAuthed = () => sessionStorage.removeItem(SESSION_KEY);

const hash = async (input: string) => {
    const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(input)
    );
    return Array.from(new Uint8Array(buf))
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
};

export const verifyPassword = async (input: string) => {
    const candidate = await hash(input);
    return candidate === ADMIN_PASSWORD_HASH;
};

// await crypto.subtle.digest("SHA-256", new TextEncoder().encode("letmewrite"))
//     .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join(""))
