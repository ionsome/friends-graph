import { Profile } from './Profile'
import { users_get, friends_get } from '../api/Friends';


let users = [];
let relations = [];

/*
    Добавляет пользователя и всех его друзей.
*/
async function addRootUser(id, graph) {
    let rootUser = await createProfileById(id);
    addUser(rootUser, graph);

    let friends = await friends_get(id);
    console.log('got friends:');
    console.log(friends);
    for (const friend of friends) {
        let profile = createProfileByData(friend);
        addUser(profile, graph);
    };
    console.log('userlist:');
    console.log(users);
    await addUserRelations(rootUser, graph, friends);
    for (const friend of friends) {
        await addUserRelations(friend, graph);
    };
}

async function createProfileById(id) {
    let data = await users_get(id);
    if (!users.some((element) => data === undefined || element.id === data.id)) {
        return createProfileByData(data);
    }
};

function createProfileByData(data) {
    return new Profile(data.id, data.first_name, data.last_name);
}


function addUser(profile, graph) {
    users.push(profile);
    graph.addNodes([profile]);
};

/*
    Добавляет связи между текущим пользователем и теми, кто
    уже добавлен в users
*/
async function addUserRelations(profile, graph, friends) {
    friends = friends || false;
    if (!friends) {
        friends = await friends_get(profile.id, true);
    }
    else {
        friends = friends.map(elem => elem.id);
    }

    if (friends) {
        return;
    }
    let user_ids = users.map(elem => elem.id);
    for (const friend_id of friends) {
        if (friend_id in user_ids) {
            let relation = { from: profile.id, to: friend_id };
            if (isRelationPresent(relation)) {
                relations.push(relation);
                graph.addEdges([relation]);
            }
        }
    }
};

function isRelationPresent(relation) {
    for (const anotherRelation of relations)
        return JSON.stringify(relation) === JSON.stringify(anotherRelation);
}

export { users, relations, createProfileById, addUser, addRootUser };