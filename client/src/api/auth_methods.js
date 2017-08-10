const AUTH_TOKEN_KEY = 'authentication';
const USER_ID_KEY = 'userId';

function saveAuthToken(auth_data) {
    sessionStorage.setItem(AUTH_TOKEN_KEY, auth_data['auth_token']);
    sessionStorage.setItem(USER_ID_KEY, auth_data['user_id']);
}

function isLoggedIn(token) {
    return sessionStorage.getItem(AUTH_TOKEN_KEY) !== null;
}

function clearAuth() {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(USER_ID_KEY);
}

function getAuthToken() {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

function getUserId() {
    return parseInt(sessionStorage.getItem(USER_ID_KEY));
}

function buildHeaders() {
    return {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : getAuthToken()
    }
}

export {
    isLoggedIn,
    buildHeaders,
    saveAuthToken,
    getUserId,
    clearAuth
};
