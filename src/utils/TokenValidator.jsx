import { jwtDecode } from "jwt-decode";

export function TokenValidator(token) {
    if (!token || token === "null" || token === "undefined" || token.trim() === "") return false;

    try {
        const decoded = jwtDecode(token);
        return !!decoded?.uuid;
    } catch (e) {
        return false;
    }
}