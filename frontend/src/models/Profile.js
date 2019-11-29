class Profile {
    constructor(id, first_name, last_name, image, root) {
        this.id = id;
        this.label = `${first_name} ${last_name}`;
        this.color = '';
        this.image = image || '';
        this.isRoot = root || false;
    }
}

export {Profile};