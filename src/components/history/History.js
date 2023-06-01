import React from 'react'
import {getHistoryApiCall} from "../../apiCalls/historyApiCall";
import HistoryListTable from "./HistoryListTable";
import {withTranslation} from 'react-i18next'


class HistoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            history: []
        }
    }

    fetchHistoryList = () => {

        getHistoryApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    //console.log(data)
                    this.setState({
                        isLoaded: true,
                        history: data

                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    componentDidMount() {
        this.fetchHistoryList()
    }

    render() {
        const { error, isLoaded, history} = this.state
        let content;
        //console.log(clients)

        if(error){
            content=<p>Błąd: {error.toString()}</p>

        }
        else if(!isLoaded){
            content = <p>Ładowanie danych klientów</p>
        }
        else {
            content = <HistoryListTable historyList={history}/>
        }
        const {t} = this.props;

        return (
            <div className="container">
                <main>
                    <h2>{t('history.main')}</h2>

                    {content}  
       
                </main>
                
            </div>
        )
    }
}
export default withTranslation() (HistoryList)