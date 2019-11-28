import { Profile } from './Profile'
import { users_get, friends_get } from '../api/Friends';


let users = [];
let relations = [];

let createProfile = (container) => new Profile(container.id, container.first_name, container.last_name);

async function addRootUser(id, graph) {
    let root_user = await users_get(id);

    let profile = createProfile(root_user[0]);
    users.push(profile);
    graph.addNodes([profile]);

    let friends = await friends_get(id);
    for (const friend of friends) {
        await addUser(friend, graph);
    };
}

async function addUser(id, graph) {
    let result = await users_get(id);
    if (!users.some((element) => result === undefined || element.id === result.id))
        graph.addNodes([createProfile(result[0])])
};


export { users, relations, addUser, addRootUser };