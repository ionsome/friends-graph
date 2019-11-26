import {Profile} from './Profile'
import { users_get, friends_get } from '../api/Friends';


let users = [];
let relations = [];

let createProfile = (container) => new Profile(container.id, container.first_name, container.last_name);

function addRootUser(id) {
    users_get(id).then((result) => {
        let profile = createProfile(result[0]);
        users.push(profile);
        friends_get(id).then((result) => {
            for (const item of result) {
                addUser(item);
            };
        });
    });
};

function addUser(id) {
    users_get(id).then((result) => {console.log(result[0])});
};


export { users, relations, addUser, addRootUser };