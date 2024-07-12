import {AnimalClass} from "./animal.class.js";

export class LionClass extends AnimalClass {
    constructor(animal) {
        super(animal);
    }

    speak(message) {
        let words = message.split(' ');
        return `${words.join(' roar ')} roar`;
    }
}
