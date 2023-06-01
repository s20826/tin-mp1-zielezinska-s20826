import React from 'react'
import {getVisitByIdApiCall2,addVisitApiCall,updateVisitApiCall} from '../../apiCalls/visitApiCalls'
import {Redirect} from "react-router-dom"
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import formMode from "../../helpers/formHelper";
import {checkRequired, checkNumberRange, checkTextLengthRange,checkNumber} from "../../helpers/validationCommon";
import {getFormattedDate3} from "../../helpers/dateHelper";
import {getVetApiCall} from '../../apiCalls/vetApiCalls';
import {getAnimalApiCall} from '../../apiCalls/animalApiCalls'
import {formValidationKeys} from "../../helpers/formHelper";
import {withTranslation }from "react-i18next"
import ErrorSelect from "../form/ErrorSelect"

class VisitForm extends React.Component
{
    
    constructor(props) {
        super(props);

        const paramsIdVisit = props.match.params.idVisit
        const currentFormMode = paramsIdVisit ? formMode.EDIT : formMode.NEW
        const { t } = this.props;
        
        this.state = {
            idVisit: paramsIdVisit,
            visit: {
                date: null,
                service: '',
                price: null,
                idAnimal: null,
                idVet: null
              },
            errors:  {
                date: '',
                service: '',
                price: '',
                idAnimal: '',
                idVet: ''
                
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            vets:[],
            animals:[]
        }
    }

    fetchVisitDetails = () => {

        getVisitByIdApiCall2(this.state.idVisit)

            .then(res => res.json())
            .then(
                
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            visit: data,
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

    fetchVetsList = () => {

        getVetApiCall()

            .then(res => res.json())
            .then(
                (data) => {
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
    fetchAnimalsList = () => {

        getAnimalApiCall()

            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        animals: data

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
            this.fetchVisitDetails()
        }
        this.fetchAnimalsList()
        this.fetchVetsList()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const visit = {...this.state.visit}
        visit[name] = value

        

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            visit: visit,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {

        let errorMessage = '';
        if (fieldName === 'date') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            }

        }
        if (fieldName === 'service') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            } else if (!checkTextLengthRange(fieldValue, 2, 500)) {
                errorMessage = formValidationKeys.len_2_500
            }

        }
        if (fieldName === 'price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired

            } 
            else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.filedNumber

            }else if (!checkNumberRange(fieldValue,0.01, 10_000)) {
                errorMessage = formValidationKeys.len_digit

            }

        }
        

        if (fieldName === 'idVet') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            }

        }
        if (fieldName === 'idAnimal') {
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
                visit = this.state.visit,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addVisitApiCall(visit)

            } else if (currentFormMode === formMode.EDIT) {
                const idVisit = this.state.idVisit
                promise = updateVisitApiCall(idVisit, visit)
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
                            if (!response.ok && response.status === 500) {

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
        const visit = this.state.visit
        const errors = this.state.errors

        for (const fieldName in visit) {
            const fieldValue = visit[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        console.log(errors)
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

    render(){

        const {redirect} = this.state

        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Dodano nowa wizita :)' : 'Edytowano wizytę :)'
            return (
                <Redirect to={{
                    pathname: "/visits/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowa wizyta' : 'Edycja wizyty'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        const { t } = this.props;

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                <FormInput
                        type="datetime-local"
                        label={t('visit.fields.date')}
                        required
                        error={this.state.errors.date}
                        name="date"
                        placeholder=""
                        onChange={this.handleChange}
                        value={getFormattedDate3(this.state.visit.date)}
                    />
                   
                    <FormInput
                        type="text"
                        label={t('visit.fields.service')}
                        required
                        error={this.state.errors.service}
                        name="service"
                        placeholder="2-500 znaków"
                        onChange={this.handleChange}
                        value={this.state.visit.service}
                    />
                    <FormInput
                        type="number"
                        label={t('visit.fields.price')}
                        required
                        error={this.state.errors.price}
                        name="price"
                        placeholder="0.00 zł"
                        onChange={this.handleChange}
                        value={this.state.visit.price}
                    />

                    <label htmlFor='idVet'>{t('visit.fields.vet')}:<abbr className="symbol-required" title="required" aria-label="required">*</abbr></label>
                    <select datatype='number' name='idVet' onChange={this.handleChange} className={this.state.errors.idVet === ''? '' : 'error-input'} >
                        <option value="" label={t('form-placeholder.choose-vet')}></option>
                        { 
                         this.state.vets.map(vet => (
                            <option selected={this.state.visit.idVet === vet.idVet} value={vet.idVet}>{vet.firstName+ " "+vet.lastName}</option>
                            ))
                        }
                    </select>
                    
                    <ErrorSelect
                    name="idAnimal"
                    error={this.state.errors.idAnimal}
                    />       

                    <label htmlFor='idAnimal'>{t('visit.fields.animal')}:<abbr className="symbol-required" title="required" aria-label="required">*</abbr></label>
                    <select  name='idAnimal' onChange={this.handleChange} className={this.state.errors.idAnimal === ''? '' : 'error-input'} >
                        <option value="" label={t('form-placeholder.choose-client')}></option>
                        { 
                         this.state.animals.map(animal => (
                            <option selected={this.state.visit.idAnimal === animal.idAnimal}  value={animal.idAnimal}>{animal.name}</option>
                            ))
                        }
                    </select>
                    <ErrorSelect
                    name="idAnimal"
                    error={this.state.errors.idAnimal}
                    />
                    
                   
                    <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/visits"
                    />

                </form>
            </main>
        )
    }
}
export default withTranslation() (VisitForm)