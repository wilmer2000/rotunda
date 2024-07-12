import {ANIMALS_LIST} from './data/animals.data.js';
import {LionClass} from "./classes/lion.class.js";
import {TigerClass} from "./classes/tiger.class.js";
import {AnimalClass} from "./classes/animal.class.js";

let currentAnimal = null;

function animalFactory(animalData) {
    switch (animalData.name) {
        case "Lion":
            return new LionClass(animalData);
        case "Tiger":
            return new TigerClass(animalData);
        default:
            return new AnimalClass(animalData);
    }
}


const animalListContent = document.getElementById('animal-list');
const speakButton = document.getElementById('speak-button');

function setAnimalList() {
    animalListContent.innerHTML = ANIMALS_LIST.map(animal =>
        `<li id="${animal.id}">${animal.name}</li>`
    ).join('');
    setEventListeners();
}

function setEventListeners() {
    animalListContent.addEventListener('click', (event) => {
        const animalId = event.target.getAttribute('id');
        setAnimalToViewer(animalId);
    });

    speakButton.addEventListener('click', () => {
        if (currentAnimal) {
            console.log(currentAnimal.speak("I am speaking"));
        }
    });
}

function setAnimalToViewer(id) {
    const animalData = ANIMALS_LIST.find(animal => animal.id.toString() === id);
    currentAnimal = animalFactory(animalData);

    if (currentAnimal) {
        for (let key in currentAnimal) {
            const fieldElement = document.getElementById(key);
            if (fieldElement) {
                fieldElement.innerText = currentAnimal[key];
            }
        }
    }
}

setAnimalList();

