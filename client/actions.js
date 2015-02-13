import { Actions } from 'flummox';

const key = "contacts";

export class ContactActions extends Actions {
    load(){
        return localStorage[key];
    }

    save(contacts){
        localStorage[key] = contacts;
    }
}