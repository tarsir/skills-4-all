function getUsers() {
    return window.fetch('/users');
}

function getUserById(userId) {
    return window.fetch('/users/' + userId);
}

function addNewUser(userData) {
    let headers = new Headers();

    headers.append('Content-Type','application/json');

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

export {
    getUsers,
    getUserById,
    addNewUser
};