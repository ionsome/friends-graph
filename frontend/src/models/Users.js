import { Profile } from './Profile'
import { users_get, friends_get } from '../api/Friends';


let users = [];
let relations = [];

let createProfile = (container) => new Profile(container.id, container.first_name, container.last_name);

async function addRootUser(id, graph) {
    users_get(id).then((result) => {
        let profile = createProfile(result[0]);
        users.push(profile);
        graph.addNodes([profile]);
        friends_get(id).then(async (result) => {
            for (const item of result) {
                addUser(item, graph);
                await wait(100);
            };
        });
    });
};

async function addUser(id, graph) {
    users_get(id).then((result) => {
        if (!users.some((element) => element.id == result.id))
            graph.addNodes([result[0]])
    });
};

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}


export { users, relations, addUser, addRootUser };