import Profile from '../models/profile.model';

const VK = window.VK;

let users_get =  (list_ids) => {
    return new Promise((resolve, reject) => {
        VK.api("users.get", { "user_ids": list_ids, "v": "5.73" },
            function (data) {
                let createModel = (container) => new Profile(container.id, container.first_name, container.second_name);
                let result = data.response.map(createModel);
                resolve(result);
            },
            (rejected_resp) => reject(rejected_resp));
    })
};

export default {

    friends_get: (id) => {
        return new Promise((resolve, reject) => {
            VK.api("friends.get", { "user_id": id, "v": "5.73" },
                function (data) {
                    let result = users_get(data.response.items);
                    resolve(result);
                },  
                (rejected_resp) => reject(rejected_resp))
        })
    },


    
};
