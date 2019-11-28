const queue = require("async-delay-queue");
const VK = window.VK;

const API_VERSION = "5.73"


/*
    Возвращает списком данных пользователей по списку id
*/
let users_get = async (list_ids) => {
    let api_request = (resolve, reject) => {
        VK.api("users.get", { "user_ids": list_ids, "v": API_VERSION },
            function (data) {
                resolve(data.response);
            },
            (rejected_resp) => reject(rejected_resp));
    }

    let result = await queue.delay(() => new Promise(api_request), 300)
    return result;
};

/*
    Возвращает друзей пользователя
*/
let friends_get = async (id, idsOnly) => {
    let params = { "user_id": id, "v": API_VERSION, "fields": [] };
    if (!idsOnly) {
        params['fields'].push('photo_100');
    }
    let api_request = (resolve, reject) => {
        VK.api("friends.get", params,
            (data) => data.response ? resolve(data.response.items) : resolve([]),
            (rejected_resp) => reject(rejected_resp))
    };
    let result = await queue.delay(() => new Promise(api_request), 300)
    return result;
};

export { users_get, friends_get };
