import { Profile } from './Profile'
import { users_get, friends_get, vkscript_execute } from '../api/Friends';


let users = [];
let relations = [];

/*
    Добавляет рутового юзера
*/
async function addRootUser(id, graph) {
    let user = isUserPresentWithId(id);
    if (!user) {
        user = await createProfileById(id);
        addUser(user, graph);
    }

    changeToRoot(user, graph);
}

/*
    Меняет тип юзера на рутовый и добавляет всех его друзей
*/
async function changeToRoot(rootUser, graph) {
    // Проверка, если юзер уже рутовый
    if (rootUser.root) {
        return;
    }
    rootUser.root = true;

    let friends = await friends_get(rootUser.id);

    for (const friend of friends) {
        let profile = createProfileByData(friend);
        addUser(profile, graph);
    }
    console.log('userlist:');
    console.log(users);
    await addUserRelationsWithProfiles(rootUser, graph, friends);
    await connectFriends(friends, graph);
    console.log('rels:');
    console.log(relations);
}

async function createProfileById(id) {
    let data = await users_get([id]);
    data = data[0];
    if (!users.some((element) => data === undefined || element.id === data.id)) {
        return createProfileByData(data);
    }
}

function createProfileByData(data) {
    return new Profile(data.id, data.first_name, data.last_name, data.photo_200);
}


function addUser(profile, graph) {
    if (!isUserPresentWithId(profile.id)) {
        users.push(profile);
        graph.addNodes([profile]);
    }
}

/*
    Соединяет друзей между собой и добавленными юзерами 
*/
async function connectFriends(friends, graph) {
    for (let index = 0; index < friends.length; index += 25) {
        let lastIndex = Math.min(friends.length, index + 25);
        let requestedUsers = friends.slice(index, lastIndex);
        let usersPayload = requestedUsers
            .map(elem => { return `{id: ${elem.id},rels: API.friends.get({user_id: ${elem.id}})}` });

        let respond = await vkscript_execute(`return [${usersPayload}];`);
        console.log(respond);
        for (let n = 0; n < respond.length; n++) {
            let relations = respond[n].rels;
            if (relations)
                await addUserRelationsWithIds(friends[index + n], graph, relations.items);
        }
    }
}


/*
    Добавляет связи между текущим пользователем и теми, кто
    уже добавлен в users.

    Также, можно передать список id друзей через параметр friends. 
*/
async function addUserRelations(profile, graph, friends) {
    friends = friends || [];
    if (!friends.length) {
        friends = await friends_get(profile.id, true);
        if (!friends.length) return;
    }

    let user_ids = users.map(elem => elem.id);
    let new_relations =
        friends
            .filter(n => user_ids.indexOf(n) > -1)
            .map(n => profile.id < n ? { from: profile.id, to: n } : { from: n, to: profile.id })
            .filter(rel => !isRelationPresent(rel));
    relations = relations.concat(new_relations);
    graph.addEdges(new_relations);
}

/*
    Тоже, что и addUserRelations, но параметр friends принимает профили.
*/
async function addUserRelationsWithProfiles(profile, graph, friends) {
    friends = friends || [];
    if (!friends.length) {
        friends = friends.map(elem => elem.id);
    }
    await addUserRelations(profile, graph, friends);
}


/*
    Тоже, что и addUserRelations.
*/
async function addUserRelationsWithIds(profile, graph, friends) {
    await addUserRelations(profile, graph, friends)
}

function isRelationPresent(relation) {
    for (const anotherRelation of relations)
        if (relation.from === anotherRelation.from &&
            relation.to === anotherRelation.to) {
            return true;
        }
    return false;
}

/*
    Возвращает профиль юзера, если
    соответствующий был найден
*/
function isUserPresentWithId(userId) {
    for (const anotherUser of users)
        if (userId === anotherUser.id) {
            return anotherUser;
        }
    return false;
}

export { users, relations, createProfileById, addUser, addRootUser };