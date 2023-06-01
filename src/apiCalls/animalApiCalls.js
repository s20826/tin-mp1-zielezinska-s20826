const animalsBaseUrl = 'http://localhost:3000/api/animals'

export function getAnimalApiCall(){
    return fetch(animalsBaseUrl);
}

export function getAnimalByIdApiCall(idAnimal){
    const url = `${animalsBaseUrl}/${idAnimal}`;
    return fetch(url);
}
export function getAnimalByIdApiCall2(idAnimal){
    const url = `${animalsBaseUrl}/form/${idAnimal}`;
    return fetch(url);
}

export function addAnimalApiCall(animal){
    const animalString =JSON.stringify(animal)
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: animalString
    }

    return fetch(animalsBaseUrl,options)
}

export function updateAnimalApiCall(idAnimal, animal){
    const url = `${animalsBaseUrl}/${idAnimal}`;
    const animalString =JSON.stringify(animal)
    const options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: animalString
    }

    return fetch(url,options)
}
export function deleteAnimalApiCall(idAnimal){
    const url = `${animalsBaseUrl}/${idAnimal}`;
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        
    }

    return fetch(url,options)
}