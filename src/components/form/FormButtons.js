import React from 'react'
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";

function FormButtons(props){

    return(
        <div className="form-buttons">

            <button className="form-actions-button-submit" type="submit">
                <svg className="form-actions-button-submit" xmlns="http://www.w3.org/2000/svg" width="50"
                     height="50" fill="#000000" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <polyline className="details-icon-color" points="216 72.005 104 184 48 128.005" fill="none"
                              stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="16"></polyline>
                </svg>
            </button>
            <Link to={props.cancelPath}>
                <svg className="form-actions-button-cancel" xmlns="http://www.w3.org/2000/svg" width="50"
                     height="50" fill="#000000" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <line className="details-icon-color" x1="200" y1="56" x2="56" y2="200" stroke="#000000"
                          stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                    <line className="details-icon-color" x1="200" y1="200" x2="56" y2="56" stroke="#000000"
                          stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
                </svg>
            </Link>
        </div>
    )
}
export default FormButtons