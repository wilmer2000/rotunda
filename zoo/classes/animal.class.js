export class AnimalClass {
    name = "";
    species = "";
    family = "";
    habitat = "";
    placeFound = "";
    diet = "";
    description = "";
    weight = 0;
    height = 0;
    image = "";

    constructor(animal) {
        this.name = animal.name ?? '';
        this.species = animal.species ?? '';
        this.family = animal.family ?? '';
        this.habitat = animal.habitat ?? '';
        this.placeFound = animal.place_of_found ?? '';
        this.diet = animal.diet ?? '';
        this.description = animal.description ?? '';
        this.weight = animal.weight_kg ?? 0;
        this.height = animal.height_cm ?? 0;
        this.image = animal.image ?? '';
    }

    speak(message) {
        return message;
    }
}
