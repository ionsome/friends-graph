const queue = require("async-delay-queue");
const VK = window.VK;

const API_VERSION = "5.73"




/*
    Возвращает promise со списком profile по списку id
*/
let users_get = async (list_ids) => {
    let api_request = (resolve, reject) => {
        VK.api("users.get", { "user_ids": list_ids, "v": API_VERSION },
            function (data) {
                resolve(data.response);
            },
            (rejected_resp) => reject(rejected_resp));
    }

    let result = await queue.delay(() => new Promise(api_request), 200)
    return result;
};

/*
    Возвращает promise со списком id друзей по id пользователя
*/
let friends_get = async (id) => {
    let api_request = (resolve, reject) => {
        VK.api("friends.get", { "user_id": id, "v": API_VERSION },
            function (data) {
                resolve(data.response.items);
            },
            (rejected_resp) => reject(rejected_resp))
    };
    let result = await queue.delay(() => new Promise(api_request), 200)
    return result;
};

export { users_get, friends_get };

