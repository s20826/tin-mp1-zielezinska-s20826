const vetsBaseUrl = 'http://localhost:3000/api/vets'

export function getVetApiCall(){
    return fetch(vetsBaseUrl);
}

export function getVetByIdApiCall(idVet){
    const url = `${vetsBaseUrl}/${idVet}`;
    return fetch(url);
}
export function addVetApiCall(vet){
    const vetString =JSON.stringify(vet)
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: vetString
    }

    return fetch(vetsBaseUrl,options)
}

export function updateVetApiCall(idVet, vet){
    const url = `${vetsBaseUrl}/${idVet}`;
    const vetString =JSON.stringify(vet)
    const options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: vetString
    }

    return fetch(url,options)
}
export function deleteVetApiCall(idVet){
    const url = `${vetsBaseUrl}/${idVet}`;
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        
    }

    return fetch(url,options)
}