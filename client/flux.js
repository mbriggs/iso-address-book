import { Flummox } from 'flummox';
import { ContactActions } from './actions';
import { ContactStore } from './stores';

export default class Flux extends Flummox {
    constructor(){
        super();
        this.createActions('contact', ContactActions);
        this.createStore('contact', ContactStore, this);
    }
}