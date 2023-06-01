const clientsBaseUrl = 'http://localhost:3000/api/clients'

export function getClientApiCall(){
    return fetch(clientsBaseUrl);
}

export function getClientByIdApiCall(idClient){
    const url = `${clientsBaseUrl}/${idClient}`;
    return fetch(url);
}

export function addClientApiCall(client){
    const clientString =JSON.stringify(client)
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: clientString
    }

    return fetch(clientsBaseUrl,options)
}

export function updateClientApiCall(idClient, client){
    const url = `${clientsBaseUrl}/${idClient}`;
    const clientString =JSON.stringify(client)
    const options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: clientString
    }

    return fetch(url,options)
}

export function deleteClientApiCall(idClient){
    const url = `${clientsBaseUrl}/${idClient}`;
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        
    }

    return fetch(url,options)
}