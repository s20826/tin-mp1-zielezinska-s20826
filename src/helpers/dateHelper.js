export function getFormattedDate(dateSource){
    const dateObject = new Date(dateSource)
    return dateObject.getFullYear()+'-'+('0'+(dateObject.getMonth()+1)).slice(-2)+"-"+('0'+dateObject.getDate()).slice(-2)
    
}

export function getFormattedDate2(dateSource){
    const dateObject = new Date(dateSource)
    return dateObject.getFullYear()+'-'+
    ('0'+(dateObject.getMonth()+1)).slice(-2)
    +"-"+('0'+dateObject.getDate()).slice(-2)+' '+(dateObject.getHours())+':'+(dateObject.getMinutes())
    
}
export function getFormattedDate3(dateSource){
    const dateObject = new Date(dateSource)
    return dateObject.getFullYear()+'-'+
    ('0'+(dateObject.getMonth()+1)).slice(-2)
    +"-"+('0'+dateObject.getDate()).slice(-2)+'T'+(dateObject.getHours())+':'+(dateObject.getMinutes())
    
}