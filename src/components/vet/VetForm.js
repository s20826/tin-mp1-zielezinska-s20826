import React from 'react'
import {getVetByIdApiCall,addVetApiCall,updateVetApiCall} from '../../apiCalls/vetApiCalls'
import {Redirect} from "react-router-dom"
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import formMode from "../../helpers/formHelper";
import {checkRequired, checkTextLengthRange, checkEmail} from "../../helpers/validationCommon";
import {formValidationKeys} from "../../helpers/formHelper";
import {withTranslation} from 'react-i18next'


class VetForm extends React.Component
{
    constructor(props) {
        super(props);

        const paramsIdVet = props.match.params.idVet
        const currentFormMode = paramsIdVet ? formMode.EDIT : formMode.NEW

        //console.log()

        this.state = {
            idVet: paramsIdVet,
            vet: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
                
          },
            errors:  {
                firstName: '',
                lastName: '',
                email: '',
                password:''
                
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchVetDetails = () => {

        getVetByIdApiCall(this.state.idVet)

            .then(res => res.json())
            .then(
                
                (data) => {
                    console.log(data)
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            vet: data,
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

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchVetDetails()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const vet = {...this.state.vet}
        vet[name] = value

        console.log(vet)

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            vet: vet,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {

        let errorMessage = '';
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }

        }
        if (fieldName === 'lastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = formValidationKeys.len_2_30
            }

        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired

            } 
            else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.fieldEmail

            }

        }
        if (fieldName === 'password') {
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
                vet = this.state.vet,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addVetApiCall(vet)

            } else if (currentFormMode === formMode.EDIT) {
                const idVet = this.state.idVet
                promise = updateVetApiCall(idVet, vet)
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
        const vet = this.state.vet
        const errors = this.state.errors

        for (const fieldName in vet) {
            const fieldValue = vet[fieldName]
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

    render(){
        const {redirect} = this.state
        const {t} = this.props;

        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('vet.comment.added') : t('vet.comment.edited')
            return (
                <Redirect to={{
                    pathname: "/vets/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('vet.pages.new') : t('vet.pages.edit')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message


        return (
            <main>
                 <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                <FormInput
                        type="text"
                        label={t('vet.fields.firstName')}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.vet.firstName}
                    />
                    <FormInput
                        type="text"
                        label={t('vet.fields.lastName')}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.vet.lastName}
                    />
                    <FormInput
                        type="text"
                        label={t('vet.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.vet.email}
                    />
                       <FormInput
                        type="text"
                        label={t('vet.fields.password')}
                        required
                        error={this.state.errors.password}
                        name="password"
                        placeholder="hasło"
                        onChange={this.handleChange}
                        value={this.state.vet.password}
                    />
                    <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/vets"
                    />

                </form>
            </main>
        )
    }
}
export default withTranslation() (VetForm)