import React from 'react'
import {getClientByIdApiCall,addClientApiCall,updateClientApiCall} from '../../apiCalls/clientApiCalls'
import {Redirect} from "react-router-dom"
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import formMode from "../../helpers/formHelper";
import {checkRequired, checkTextLengthRange,checkNumber, checkEmail} from "../../helpers/validationCommon";
import {formValidationKeys} from "../../helpers/formHelper";
import {withTranslation} from 'react-i18next'

class ClientForm extends React.Component
{
    constructor(props) {
        super(props);

        const paramsIdClient = props.match.params.idClient
        const currentFormMode = paramsIdClient ? formMode.EDIT : formMode.NEW
        //console.log()

        this.state = {
            idClient: paramsIdClient,
            client: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: ''
                
          },
            errors:  {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchClientDetails = () => {

        getClientByIdApiCall(this.state.idClient)

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
                            client: data,
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
            this.fetchClientDetails()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const client = {...this.state.client}
        client[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            client: client,
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
        
        if (fieldName === 'phoneNumber') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.fieldRequired
            }
                else if (!checkNumber(fieldValue)) {
                    errorMessage = formValidationKeys.filedNumber
    
                }else if (!checkTextLengthRange(fieldValue, 0, 9)) {
                errorMessage = formValidationKeys.fieldPhone
            }

        }

        return errorMessage
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()

        if (isValid) {
            const
                client = this.state.client,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addClientApiCall(client)

            } else if (currentFormMode === formMode.EDIT) {
                const idClient = this.state.idClient
                promise = updateClientApiCall(idClient, client)
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
        const client = this.state.client
        const errors = this.state.errors

        for (const fieldName in client) {
            const fieldValue = client[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('client.comment.added') : t('client.comment.edited')
            return (
                <Redirect to={{
                    pathname: "/clients/",
                    state: {
                        notice: notice
                    }
                }}/>
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('client.pages.new') : t('client.pages.edit')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>

                <FormInput
                        type="text"
                        label={t('client.fields.firstName')}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.client.firstName}
                    />
                    <FormInput
                        type="text"
                        label={t('client.fields.lastName')}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder="2-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.client.lastName}
                    />
                    <FormInput
                        type="text"
                        label={t('client.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.client.email}
                    />
                    <FormInput
                        type="text"
                        label={t('client.fields.phoneNumber')}
                        required
                        error={this.state.errors.phoneNumber}
                        name="phoneNumber"
                        placeholder="9 znaków"
                        onChange={this.handleChange}
                        value={this.state.client.phoneNumber}
                    />

                   
                    <FormButtons
                    formMode={this.state.formMode}
                    error={globalErrorMessage}
                    cancelPath="/clients"
                    />

                </form>
            </main>
        )
    }
}
export default withTranslation() (ClientForm)