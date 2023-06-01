import React from 'react'
import ClientsListTableRow from './ClientListTableRow'
import {useTranslation} from 'react-i18next'

function ClientsListTable(props){
    const clients = props.clientList
    const {t} = useTranslation();

    return(
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('client.fields.firstName')}</th>
                <th>{t('client.fields.lastName')}</th>
                <th>{t('client.fields.email')}</th>
                <th>{t('client.fields.phoneNumber')}</th>

            </tr>
            </thead>
            <tbody>
            {clients.map(client =>
                <ClientsListTableRow clientData={client} key={client.idClient} />
            )}
            </tbody>
        </table>

    )
}
export default ClientsListTable