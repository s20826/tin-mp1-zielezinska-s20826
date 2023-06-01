import React from 'react'
import HistoryListTableRow from './HistoryListTableRow'
import {useTranslation} from 'react-i18next'

function HistoryListTable(props){
    const history = props.historyList
    const {t} = useTranslation();

    return(
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('history.comment')}</th>
                <th>{t('history.date')}</th>
                

            </tr>
            </thead>
            <tbody>
            {history.map(history =>
                <HistoryListTableRow historyData={history} key={history.idHistory} />
            )}
            </tbody>
        </table>

    )
}
export default HistoryListTable