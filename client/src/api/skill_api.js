import { buildHeaders, getUserId } from './auth_methods';

function getSkill(skillId) {
    let headers = buildHeaders();
    return window.fetch('/api/skills/' + skillId, {headers});
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

    let req = new Request('/api/skills', config);

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

    let req = new Request('/api/votes/add', config);

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

    let req = new Request('/api/votes/remove', config);

    return window.fetch(req);
}

export {
    getSkill,
    addNewSkill,
    addVote,
    removeVote
};
