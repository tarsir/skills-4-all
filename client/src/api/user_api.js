function saveAuthToken(token) {
    sessionStorage.setItem('authentication', token);
}

function getAuthToken() {
    return sessionStorage.getItem('authentication');
}

function buildHeaders() {
    return {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : getAuthToken()
    }
}

function getUsers() {
    let headers = buildHeaders();
    return window.fetch('/users', {headers});
}

function getUserById(userId) {
    let headers = buildHeaders();
    return window.fetch('/users/' + userId, {headers});
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

    let req = new Request('/users/' + userId, config);

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

    let req = new Request('/users', config);

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

    let req = new Request('/login', config);

    return window.fetch(req);
}

export {
    getUsers,
    getUserById,
    login,
    updateUser,
    addNewUser,
    saveAuthToken
};
