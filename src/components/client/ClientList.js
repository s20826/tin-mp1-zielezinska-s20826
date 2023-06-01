import React from 'react'
import {Link} from "react-router-dom";
import {getClientApiCall} from "../../apiCalls/clientApiCalls";
import ClientListTable from "./ClientListTable";
import {withTranslation} from 'react-i18next'

class ClientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            clients: []
        }
    }

    fetchClientList = () => {

        getClientApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    //console.log(data)
                    this.setState({
                        isLoaded: true,
                        clients: data

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
        this.fetchClientList()
    }

    render() {

        const { error, isLoaded, clients} = this.state
        let content;
        const {t} = this.props;



        if(error){
            content=<p>Błąd: {error.toString()}</p>

        }
        else if(!isLoaded){
            content = <p>Ładowanie danych klientów</p>
        }
        else {
            content = <ClientListTable clientList={clients}/>
        }

        return (
            <div className="container">
                <main>
                    <h2>{t('client.pages.list')}</h2>

                    {content}  

                    <div id="hideMe">{this.state.notice}</div>

                    <p>

                        <Link to={`../../clients/add`}>
                            <svg className="button-add" xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                 fill="#000000" viewBox="0 0 256 256">
                                <rect width="256" height="256" fill="none"></rect>
                                <line className="details-icon-color" x1="40" y1="128" x2="216" y2="128" fill="none"
                                      stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="16"></line>
                                <line className="details-icon-color" x1="128" y1="40" x2="128" y2="216" fill="none"
                                      stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="16"></line>
                            </svg>
                        </Link>
                    </p>
                </main>
                
            </div>
        )
    }
}
export default withTranslation() (ClientList)