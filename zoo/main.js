(async () => {
    const {ANIMALS_LIST, DESCRIPTION_TEXT} = await import('./data/animals.data.js');
    const {LionClass} = await import("./classes/lion.class.js");
    const {TigerClass} = await import("./classes/tiger.class.js");
    const {AnimalClass} = await import("./classes/animal.class.js");

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

    const ids = [
        "animal-list",
        "speak-button",
        "input-speak-text",
        "speak-text-content",
        "speak-text",
        "animal-viewer"
    ];
    const [
        animalListContent,
        speakButton,
        inputSpeakText,
        speakTextContent,
        speakText,
        animalViewer
    ] = ids.map(id => document.getElementById(id));


    function setAnimalList() {
        animalListContent.innerHTML = ANIMALS_LIST.map(animal =>
            `
            <div id="${animal.id}" class="card pointer-cursor">
                ${animal.name}
            </div>
        `
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
                speakText.innerHTML = `<h4 class="speak-text">${currentAnimal.speak(textToSpeak)}</h4>`;
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
            let list = [];
            for (let key in currentAnimal) {
                list.push(
                    `
                    <li>
                        <p><b class="d-block">${DESCRIPTION_TEXT[key]}:</b>
                        <span class="list-block" id="${currentAnimal[key].id || ''}">${currentAnimal[key]}</span></p>
                    </li>
                `
                );
            }
            animalViewer.innerHTML = list.join('\n');
            speakTextContent.style.display = 'flex';
            speakText.innerHTML = '';
            inputSpeakText.value = '';
        }
    }


    function main() {
        setAnimalList();
        setEventListeners();
    }

    main();
})();

