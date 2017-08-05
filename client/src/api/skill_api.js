function addNewSkill(skillDescription) {
    let headers = new Headers();

    headers.append('Content-Type','application/json');

    let config = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            skill: {
                description: skillDescription
            }
        })
    };

    let req = new Request('/skills', config);

    return window.fetch(req);
}

export {
    addNewSkill
};