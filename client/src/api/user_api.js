import { clearAuth, buildHeaders } from './auth_methods';

function logout() {
    console.log("Logging out");
    clearAuth();

    let headers = buildHeaders();

    let config = {
        method: 'POST',
        headers
    };

    let req = new Request('/api/logout', config);

    return window.fetch(req);
}

function getUsers() {
    let headers = buildHeaders();
    return window.fetch('/api/users', {headers});
}

function getUserById(userId) {
    let headers = buildHeaders();
    return window.fetch('/api/users/' + userId, {headers});
}

function updateUser(userId, userData) {
    let headers = buildHeaders();

    let config = {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            user: userData
        })
    };

    let req = new Request('/api/users/' + userId, config);

    return window.fetch(req);
}

function addNewUser(userData) {
    let headers = buildHeaders();

    let config = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            user: userData
        })
    };

    let req = new Request('/api/users', config);

    return window.fetch(req);
}

function login(loginData) {
    let headers = buildHeaders();

    let config = {
        method: 'POST',
        headers,
        body: JSON.stringify({
        user_login : {
            email: loginData.email,
            password: loginData.password
        }})
    };

    let req = new Request('/api/login', config);

    return window.fetch(req);
}

export {
    getUsers,
    getUserById,
    login,
    logout,
    updateUser,
    addNewUser
};
