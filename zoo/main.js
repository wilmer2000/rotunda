import {ANIMALS_LIST} from './data/animals.data.js';
import {LionClass} from "./classes/lion.class.js";
import {TigerClass} from "./classes/tiger.class.js";
import {AnimalClass} from "./classes/animal.class.js";

let currentAnimal = null;
let textToSpeak = null;

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
const inputSpeakText = document.getElementById('input-speak-text');
const speakTextContent = document.getElementById('speak-text-content');

function setAnimalList() {
    animalListContent.innerHTML = ANIMALS_LIST.map(animal =>
        `<li id="${animal.id}" class="card">${animal.name}</li>`
    ).join('');
}

function setEventListeners() {
    animalListContent.addEventListener('click', (event) => {
        // Event delegation is used to capture click events on animalListContent.
        // The id attribute is expected from the element clicked.
        // However, if a child (without id) within the parent is clicked,
        // the event target becomes the child, returning null/undefined for id.
        // Solution: Find the clicked element's nearest parent (with id) or the element itself.
        let element = event.target;
        while (element && element !== animalListContent) {
            if (element.hasAttribute('id')) {
                break;
            }
        }

        if (element !== animalListContent) {
            const animalId = element.getAttribute('id');
            setAnimalToViewer(animalId);
        }
    });

    speakButton.addEventListener('click', () => {
        if (currentAnimal && textToSpeak) {
            speakTextContent.textContent = currentAnimal.speak(textToSpeak);
        }
    });

    inputSpeakText.addEventListener('keyup', (event) => {
        if (event.target.value) {
            textToSpeak = event.target.value;
        }
    })
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


function main() {
    setAnimalList();
    setEventListeners();
}

main();
