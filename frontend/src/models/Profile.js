class Profile {
    constructor(id, first_name, last_name) {
        this.id = id;
        this.label = `${first_name} ${last_name}`;
        this.color = '';
        this.isRoot = false;
    }
}

export {Profile};