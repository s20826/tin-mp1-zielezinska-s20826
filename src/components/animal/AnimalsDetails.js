import React from 'react'
import { getAnimalByIdApiCall} from '../../apiCalls/animalApiCalls';
import AnimalDetailsData from "./AnimalDetailsData";
import {withTranslation} from 'react-i18next'


class AnimalsDetails extends React.Component {

    constructor(props) {
        super(props)
        let {idAnimal} = this.props.match.params
        this.state = {
            idAnimal: idAnimal,
            animal: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }



    fetchAnimalDetails = () => {

        getAnimalByIdApiCall(this.state.idAnimal)

            .then(res => res.json())

            .then(
                (data) => {
                    //console.log(data)

                    if(data.message){
                        this.setState({
                            animal: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            animal: data,
                            message: null
                        })

                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded:true,
                        error
                    })
                }

            );

    }

    componentDidMount() {
        this.fetchAnimalDetails()

    }

    render() {
        const { animal, error, isLoaded, message} = this.state
        let content;
        console.log(animal)

        if(error){
            content=<p>Błąd: {error.toString()}</p>

        }
        else if(!isLoaded){
            content = <p>Ładowanie danych pacjenta</p>
        }
        else {
            content = <AnimalDetailsData animalData={animal}/>
        }
        const {t} = this.props;

        return (
            <main>
                <h2>{t('animal.pages.detail.details')}</h2>

                {content}


            </main>
        )
    }
}
export default withTranslation() (AnimalsDetails)