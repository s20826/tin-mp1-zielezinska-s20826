import React from 'react'
import VisitListTableRow from './VisitListTableRow'
import {useTranslation} from 'react-i18next'

function VisitListTable(props){
    const visits = props.visitList
    const {t} = useTranslation();

    return(
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('visit.fields.animal')}</th>
                <th>{t('visit.fields.vet')}</th>
                <th>{t('visit.fields.date')}</th>


            </tr>
            </thead>
            <tbody>
            {visits.map(visit =>
                <VisitListTableRow visitData={visit} key={visit.idVisit} />
            )}
            </tbody>
        </table>

    )
}
export default VisitListTable