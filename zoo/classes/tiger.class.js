import {AnimalClass} from "./animal.class.js";

export class TigerClass extends AnimalClass {
    constructor(animal) {
        super(animal);
    }

    speak(message) {
        let words = message.split(' ');
        return `${words.join(' grrr ')} grrr`;
    }
}
