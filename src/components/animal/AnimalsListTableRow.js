import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation} from 'react-i18next'
import {isAuthenticated,isAdmin} from '../../helpers/authHelper'

function AnimalsListTableRow(props){
    const animal = props.animalData
    const {t} = useTranslation();
    return(
        <tr>
            
            <td>{animal.name}</td>
            <td>{animal.species}</td>
            <td>{animal.breed}</td>
            <td>{animal.weight} </td>
            <td>{getFormattedDate(animal.birthDate)}</td>

            <td>
                <ul className="list-actions">
                    <li>
                        <Link to={`../animals/details/${animal.idAnimal}`}>
                            <svg className="list-actions-button-details"
                                 xmlns="http://www.w3.org/2000/svg" width="192" height="192"
                                 fill="#000000" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none"></rect>
                                <g className="details-icon-color" opacity="0.1"></g>
                                <circle className="details-icon-color" cx="128" cy="128" r="96"
                                        fill="none" stroke="#000000" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="16"></circle>
                                <polyline className="details-icon-color"
                                          points="120 120 128 120 128 176 136 176" fill="none"
                                          stroke="#000000" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="16"></polyline>
                                <circle className="details-icon-color dot" cx="126" cy="84"
                                        r="12"></circle>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/animals/edit/${animal.idAnimal}`}>
                            <svg className="list-actions-button-edit" xmlns="http://www.w3.org/2000/svg"
                                 width="192" height="192" fill="#000000" viewBox="0 0 256 256">
                                <rect className="details-icon-color" width="256" height="256"
                                      fill="none"></rect>
                                <path className="details-icon-color"
                                      d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                      fill="none" stroke="#000000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="16"></path>
                                <line className="details-icon-color" x1="136" y1="64" x2="192" y2="120"
                                      fill="none" stroke="#000000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="16"></line>
                                <polyline className="details-icon-color"
                                          points="216 216 96 216 40.509 160.509" fill="none"
                                          stroke="#000000" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="16"></polyline>
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to={`../animals/ifDelete/${animal.idAnimal}`}>
                            <svg className="list-actions-button-delete"
                                 xmlns="http://www.w3.org/2000/svg" width="192" height="192"
                                 fill="#000000" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none"></rect>
                                <line className="details-icon-color" x1="215.99609" y1="56"
                                      x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                                      stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="16"></line>
                                <line className="details-icon-color" x1="104" y1="104" x2="104" y2="168"
                                      fill="none" stroke="#000000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="16"></line>
                                <line className="details-icon-color" x1="152" y1="104" x2="152" y2="168"
                                      fill="none" stroke="#000000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="16"></line>
                                <path className="details-icon-color"
                                      d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                      stroke="#000000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="16"></path>
                                <path className="details-icon-color"
                                      d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                      fill="none" stroke="#000000" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="16"></path>
                            </svg>
                        </Link>
                    </li>
                </ul>
            </td>

        </tr>
    )
}
export default AnimalsListTableRow