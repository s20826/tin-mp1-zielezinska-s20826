const visitsBaseUrl = 'http://localhost:3000/api/visits'

export function getVisitApiCall(){
    return fetch(visitsBaseUrl);
}

export function getVisitByIdApiCall(idVisit){
    const url = `${visitsBaseUrl}/${idVisit}`;
    return fetch(url);
}


export function getVisitByIdApiCall2(idVisit){
    const url = `${visitsBaseUrl}/form/${idVisit}`;
    return fetch(url);
}
export function addVisitApiCall(visit){
    const visitString =JSON.stringify(visit)
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: visitString
    }

    return fetch(visitsBaseUrl,options)
}

export function updateVisitApiCall(idVisit, visit){
    const url = `${visitsBaseUrl}/${idVisit}`;
    const visitString =JSON.stringify(visit)
    const options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: visitString
    }

    return fetch(url,options)
}
export function deleteVisitApiCall(idVisit){
    const url = `${visitsBaseUrl}/${idVisit}`;
    const options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        
    }

    return fetch(url,options)
}