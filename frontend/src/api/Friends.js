import { Profile } from '../models/Profile';

const queue = require("async-delay-queue");
const VK = window.VK;

const API_VERSION = "5.73";
const DELAY = 1000 / 3; // 20 запросов в секунду 



let async_queque_fetch = async (api_request) => {
    return await queue.delay(() => new Promise(api_request), DELAY);
};

/*
    Возвращает списком данных пользователей по списку id
*/
let users_get = async (list_ids) => {
    let api_request = (resolve, reject) => {
        VK.api("users.get",
            {
                "user_ids": list_ids,
                "v": API_VERSION,
                'fields': [
                    'photo_200', // для отображения на нодах и в профиле
                    'domain'     // для поиска и отображения в профиле
                ]
            },
            function (data) {
                resolve(data.response);
            },
            (rejected_resp) => reject(rejected_resp));
    };

    return await async_queque_fetch(api_request);
};

/*
    Возвращает друзей пользователя
*/
let friends_get = async (id, idsOnly) => {
    let params = { "user_id": id, "v": API_VERSION, "fields": [] };
    if (!idsOnly) {
        params['fields'].push('photo_200');
        params['fields'].push('domain');
    }
    let api_request = (resolve, reject) => {
        VK.api("friends.get", params,
            (data) => data.response ? resolve(data.response.items) : resolve([]),
            (rejected_resp) => reject(rejected_resp))
    };

    return await async_queque_fetch(api_request);
};


let vkscript_execute = async (code) => {
    let params = { "v": API_VERSION, "code": code };
    let api_request = (resolve, reject) => {
        VK.api("execute", params,
            (data) => data.response ? resolve(data.response) : resolve([]),
            (rejected_resp) => reject(rejected_resp))
    };

    return await async_queque_fetch(api_request);
};

async function createProfileById(id) {
    let data = await users_get([id]);
    data = data[0];
    return createProfileByData(data);
}


function createProfileByData(data) {
    return new Profile(
        data.id,
        data.first_name,
        data.last_name,
        data.photo_200,
        data.domain,
        data.is_closed
    );
}


export { users_get, friends_get, vkscript_execute, createProfileById, createProfileByData };
