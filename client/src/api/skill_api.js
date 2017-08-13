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

    let req = new Request('/skills/vote', config);
    console.log(config);

    // return window.fetch(req);
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

    let req = new Request('/skills/vote', config);
    console.log(config);

    // return window.fetch(req);
}

export {
    addNewSkill,
    addVote,
    removeVote
};
