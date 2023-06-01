const historyBaseUrl = 'http://localhost:3000/api/animals/history'

export function getHistoryApiCall(){
    return fetch(historyBaseUrl);
}
