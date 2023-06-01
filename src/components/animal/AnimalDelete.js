import React from 'react'
import {Link, useParams} from "react-router-dom";
import {getAnimalByIdApiCall,deleteAnimalApiCall} from '../../apiCalls/animalApiCalls';
import {useTranslation} from 'react-i18next'

function AnimalDelete(){
    let {idAnimal} = useParams()
    idAnimal = parseInt(idAnimal)
    const animal = getAnimalByIdApiCall(idAnimal)
    const {t} = useTranslation();

    const deleteAnimal = () => {
        deleteAnimalApiCall(idAnimal)
        
    }

    return(
<div className="container">
    <main>
        <div>
            <h1>{t('animal.pages.delete')}</h1>
                <input type="hidden" name="animalId" value={animal.idAnimal}/>

                <Link className="form-actions-button-submit" to={`../../animals`}  onClick={() => deleteAnimal()} >
                    <svg className="form-actions-button-submit" xmlns="http://www.w3.org/2000/svg"  width="50" height="50" fill="#000000" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <polyline className="details-icon-color" points="216 72.005 104 184 48 128.005" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                    </svg>
                </Link>

                <Link className="form-button-cancel"  to={`../../animals`} >
                    <svg className="form-actions-button-cancel" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#000000" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <line className="details-icon-color" x1="200" y1="56" x2="56" y2="200" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                        <line className="details-icon-color" x1="200" y1="200" x2="56" y2="56" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                    </svg>
                </Link>
            </div>
        </main>
    <div className="loggedButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"></rect>
            <circle cx="128" cy="96" r="64" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle>
            <path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
        </svg>
        <span></span>
    </div>
</div>
    )
}
export default AnimalDelete