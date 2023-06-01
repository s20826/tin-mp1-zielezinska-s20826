import React from 'react';
import {Link} from "react-router-dom";
import {getFormattedDate2} from "../../helpers/dateHelper";


function HistoryListTableRow(props){
    const history = props.historyData
    return(
        <tr>
            <td>{history.comment}</td>
            <td>{getFormattedDate2(history.date)}</td>
       
        </tr>
    )
}
export default HistoryListTableRow