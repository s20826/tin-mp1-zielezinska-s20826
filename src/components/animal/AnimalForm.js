import React from 'react'
import {getClientApiCall} from '../../apiCalls/clientApiCalls'
import {Redirect} from "react-router-dom"
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import formMode from "../../helpers/formHelper";
import {formValidationKeys} from "../../helpers/formHelper";
import {getAnimalByIdApiCall2, addAnimalApiCall,updateAnimalApiCall} from "../../apiCalls/animalApiCalls";
import {checkRequired, checkTextLengthRange, checkNumber, checkNumberRange,checkDateIfAfter } from "../../helpers/validationCommon";
import {getFormattedDate} from "../../helpers/dateHelper"
import ErrorSelect from "../form/ErrorSelect"
import {withTranslation} from 'react-i18next'

class AnimalForm extends React.Component {
    constructor(props) {
        super(props);

        const paramsIdAnimal = props.match.params.idAnimal
        const currentFormMode = paramsIdAnimal ? formMode.EDIT : formMode.NEW

        

        this.state = {
            idAnimal: paramsIdAnimal,
            animal: {
                name: '',
                species: '',
                breed: '',
                weight: null,
                birthDate: null,
                idClient: null,
         
          },
            errors:  {
                name: '',
                species: '',
                breed: '',
                weight: '',
                birthDate: '',
                idClient: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            clients:[]
        }
    }

    fetchAnimalDetails = () => {

        getAnimalByIdApiCall2(this.state.idAnimal)

            .then(res => res.json())
            .then(
                
                (data) => {
                   
                    if (data.message) {
                        this.setState({
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
                        isLoaded: true,
                        error
                    })
                }
            );

    }
    fetchClientList = () => {

        getClientApiCall()
            .then(res => res.json())
            .then(
                (data) => {
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

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchAnimalDetails()
        }
        this.fetchClientList()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const animal = {...this.state.animal}
        animal[name] = value


        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        console.log(errors)


        this.setState({
            animal: animal,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {

        let errorMessage = '';
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }

        }
        if (fieldName === 'species') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }

        }
        if (fieldName === 'weight') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired

            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.filedNumber

            } else if (!checkNumberRange(fieldValue, 0.1, 10_000)) {
                errorMessage = formValidationKeys.len_digit
            }

        }
        if (fieldName === 'birthDate') {

            let nowDate = new Date(),
                month = '' + (nowDate.getMonth() + 1),
                day = '' + nowDate.getDate(),
                year = nowDate.getFullYear();


            if (month.length < 2) {
                month = '0' + month;
            }
            if (day.length < 2) {
                day = '0' + day;
            }
            const nowString = [year, month, day].join('-')

            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired

            } else if (!checkDateIfAfter(fieldValue, nowString)) {

                errorMessage = formValidationKeys.fieldDate
            }

        }
        if (fieldName === 'idClient') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired

            }

        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()

        if (isValid) {
            const
                animal = this.state.animal,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
                console.log(animal)
            if (currentFormMode === formMode.NEW) {
                promise = addAnimalApiCall(animal)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(animal)
                const idAnimal = this.state.idAnimal
                promise = updateAnimalApiCall(idAnimal, animal)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            console.log(data)
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({redirect: true})
                            }
                        },
                        (error) => {
                            this.setState({error})
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const animal = this.state.animal
        const errors = this.state.errors

        for (const fieldName in animal) {
            const fieldValue = animal[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }
  
    hasErrors = () => {
        const errors = this.state.errors
        
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const {redirect} = this.state
        const {t} = this.props;



        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('animal.comment.added') : t('animal.comment.edited')
            return (
                <Redirect to={{
                    pathname: "/animals/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }


        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('animal.pages.new') : t('animal.pages.edit')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message



        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('animal.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.animal.name}
                    />
                    <FormInput
                        type="text"
                        label={t('animal.fields.species')}
                        required
                        error={this.state.errors.species}
                        name="species"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.animal.species}
                    />
                    <FormInput
                        type="text"
                        label={t('animal.fields.breed')}
                        error={this.state.errors.breed}
                        name="breed"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.animal.breed}
                    />
                    <FormInput
                        type="number"
                        label={t('animal.fields.weight')}
                        required
                        error={this.state.errors.weight}
                        name="weight"
                        placeholder="0.1 - 10 000"
                        onChange={this.handleChange}
                        value={this.state.animal.weight}
                    />
                    <FormInput
                        type="date"
                        label={t('animal.fields.birthDate')}
                        required
                        error={this.state.errors.birthDate}
                        name="birthDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={getFormattedDate(this.state.animal.birthDate)}
                    />

                    <label htmlFor='idClient'>{t('animal.fields.owner')}<abbr className="symbol-required" title="required" aria-label="required">*</abbr></label>
                    <select datatype='number' name='idClient' onChange={this.handleChange} className={this.state.errors.idClient === ''? '' : 'error-input'} >
                        <option value="" label="---Wybierz właściciela---"></option>
                        { 
                         this.state.clients.map(client => (
                            <option selected={this.state.animal.idClient === client.idClient} value={client.idClient}>{client.firstName+ " "+client.lastName}</option>
                            ))
                        }
                    </select>
                    <ErrorSelect
                    name="idClient"
                    error={this.state.errors.idClient}
                    />   
                    <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/animals"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation() (AnimalForm)