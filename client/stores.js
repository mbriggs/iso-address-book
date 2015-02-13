import { Store } from 'flummox';

export class ContactStore extends Store {
    constructor(flux) {
        Store.call(this);
        let actions = flux.getActionIds('contacts');

        this.register(actions.load, this.load);
        this.register(actions.save, this.save);

        this.state = [];
    }

    load(contacts){
        this.setState(contacts)
    }
}