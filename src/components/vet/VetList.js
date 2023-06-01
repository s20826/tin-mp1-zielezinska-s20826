import React from 'react'
import {Link} from "react-router-dom";
import {getVetApiCall} from "../../apiCalls/vetApiCalls";
import VetListTable from "./VetListTable";
import {isAuthenticated } from "../../helpers/authHelper";
import {withTranslation} from 'react-i18next'


class VetList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            vets: []
        }
    }

    fetchVetList = () => {

        getVetApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    //console.log(data)
                    this.setState({
                        isLoaded: true,
                        vets: data

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
        this.fetchVetList()
    }

    render() {
        const { error, isLoaded, vets} = this.state
        let content;

        if(error){
            content=<p>Błąd: {error.toString()}</p>

        }
        else if(!isLoaded){
            content = <p>Ładowanie danych weterynarz</p>
        }
        else {
            content = <VetListTable vetsList={vets}/>
        }
        const {t} = this.props;

        return (
            <div className="container">
                <main>
                    <h2>{t('vet.pages.list')}</h2>

                    {content}

                    <div id="hideMe">{this.state.notice}</div>

                    <p>
                    {isAuthenticated()&&
                        <Link to={`../../vets/add`}>
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
    }
                    </p>
                </main>
                
            </div>
        )
    }
}
export default withTranslation() (VetList)