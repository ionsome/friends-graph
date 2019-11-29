class Profile {
    constructor(id, first_name, last_name, image) {
        this.id = id;
        this.label = `${first_name} ${last_name}`;
        this.color = '';
        this.image = image;
        this.isRoot = false;
    }
}

export {Profile};