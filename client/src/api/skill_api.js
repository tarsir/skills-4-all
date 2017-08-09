import { buildHeaders, getUserId } from './auth_methods';

function addNewSkill(skillDescription, userId) {
    let headers = buildHeaders();

    let config = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            skill: {
                description: skillDescription
            },
            voter: getUserId(),
            receiver: userId
        })
    };

    let req = new Request('/skills', config);

    return window.fetch(req);
}

export {
    addNewSkill
};
