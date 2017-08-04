function getUsers() {
    return window.fetch('/users');
}

function getUserById(userId) {
    return window.fetch('/users/' + userId);
}

export {
    getUsers,
    getUserById
};