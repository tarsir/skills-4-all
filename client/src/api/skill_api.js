import { buildHeaders, getUserId } from './auth_methods';

function getSkill(skillId) {
    let headers = buildHeaders();
    return window.fetch('/skills/' + skillId, {headers});
}

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

function addVote(skillId, receiverId) {
    let headers = buildHeaders();

    let config = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            skillId,
            voter: getUserId(),
            receiver: receiverId
        })
    };

    let req = new Request('/votes/add', config);

    return window.fetch(req);
}

function removeVote(skillId, receiverId) {
    let headers = buildHeaders();

    let config = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            skillId,
            voter: getUserId(),
            receiver: receiverId
        })
    };

    let req = new Request('/votes/remove', config);

    return window.fetch(req);
}

export {
    getSkill,
    addNewSkill,
    addVote,
    removeVote
};
