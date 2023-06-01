import React from 'react'
import { useTranslation } from 'react-i18next'
import {getValidationErrorKey} from "../../helpers/formHelper";


function ErrorSelect(props){
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    
    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const {t} = useTranslation();
    const translatedErrorMessage = props.error ? t(errorKey) : ""

    return(
        <>
            <span id={errorSpanId} className="errors-text">{translatedErrorMessage}</span>
        </>
    )
}
export default ErrorSelect