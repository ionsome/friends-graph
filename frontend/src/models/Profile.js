class Profile {
    constructor(id, first_name, last_name, image, domain, is_closed) {
        this.id = id;
        this.label = `${first_name} ${last_name}`;
        this.color = '';
        this.image = image || '';
        this.domain = domain;
        this.isClosed = is_closed;

        this.root = false;
    }
}

export { Profile };