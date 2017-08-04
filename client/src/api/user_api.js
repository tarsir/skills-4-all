function getUsers() {
    return window.fetch('/users');
}

export {
    getUsers
};