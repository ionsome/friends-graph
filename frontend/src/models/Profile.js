class Profile {
    constructor(id, first_name, last_name, image, is_closed) {
        this.id = id;
        this.label = `${first_name} ${last_name}`;
        this.color = '';
        this.image = image || '';
        this.root = false;
        this.isClosed = is_closed
    }
}

export { Profile };