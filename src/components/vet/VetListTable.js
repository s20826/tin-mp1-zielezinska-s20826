import React from 'react'
import VetsListTableRow from './VetListTableRow'
import {useTranslation} from 'react-i18next'

function VetsListTable(props){
    const vets = props.vetsList
    const {t} = useTranslation();

    return(
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('vet.fields.firstName')}</th>
                <th>{t('vet.fields.lastName')}</th>
                <th>{t('vet.fields.email')}</th>

            </tr>
            </thead>
            <tbody>
            {vets.map(vet =>
                <VetsListTableRow vetData={vet} key={vet.idVet} />
            )}
            </tbody>
        </table>

    )
}
export default VetsListTable