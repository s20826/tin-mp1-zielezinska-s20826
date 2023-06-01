import React from "react";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import FormInput from '../form/FormInput';
import { loginApiCalls } from "../../apiCalls/authApiCalls";
import { checkRequired } from "../../helpers/validationCommon";
import {formValidationKeys} from "../../helpers/formHelper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            },
            error: '',
            message: '',
            prevPath: '',
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const user = { ...this.state.user };
        user[name] = value;

        const errorMessage = this.validateField(user, name);
        const errors = { ...this.state.errors };
        errors[name]=errorMessage

        this.setState({
            user,
            errors,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validateForm();

        if(isValid){
            const user = this.state.user;
            let response;

            loginApiCalls(user)
            .then(res => {
                response = res;
                return response.json();
            }).then(data => {
                console.log(data)
                if(response.status == 200){
                    
                    if(data.token){
                        const userString = JSON.stringify(data);
                        this.props.handleLogin(userString);
                        // this.props.history.goBack();
                    }

                }                  
                 else if(response.status == 401){

                    console.log(401);
                    this.setState({
                        message: data.message,
                    });
                }
            }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            });
        }
    }


    validateField = (fieldName, value) => {
        let errorMessage = '';
        if(fieldName === 'email'){
            if(!checkRequired(value)){
                errorMessage = formValidationKeys.fieldRequired;
            }
        }

        if(fieldName == 'password'){
            if (!checkRequired(value)) {
                errorMessage = formValidationKeys.fieldRequired;                
            }
        }

        return errorMessage;
    }


    validateForm = () => {
        const user = this.state.user;
        const errors = this.state.errors;

        for(const fieldName in user){
            const fieldValue = user[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors,
        });

        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for(const errorField in errors){
            if(errors[errorField].lenght > 0){
                return true;
            }
        }
        return false;
    }


    render() {
        const { t } = this.props;
        const errorsSummary = this.hasErrors() ? "AAAAAA" : '';
        const fetchError = this.state.error ? `${t('error')}: ${this.state.error.message}` : '';
        const globalErrorMessage = errorsSummary || fetchError || this.state.message;

        return (
            <main>
                <div id="login">
                <h2>{t('auth.sign-in')}</h2>
                <form className="form" id="form" method="post"onSubmit={this.handleSubmit}  >

                <FormInput name="email" 
                value={this.state.user.email} 
                error={this.state.errors.email} 
                label="Login"
                onChange={this.handleChange} type="text"/>


                <FormInput name="password" 
                value={this.state.user.password}
                error={this.state.errors.password} 
                label={t('auth.password')}  
                onChange={this.handleChange} 
                type="password"/>

                <span>{globalErrorMessage}</span>
                    

                    <div class="form-buttons-auth">
                        <input class="log-button" type="submit"  value={t('auth.log-in')} ></input>
                        <Link to="../../vets/add"><input type="button"  value={t('auth.register')} ></input></Link>
                        <span></span>
                    </div>

                </form>
                </div>
            </main>
    
        );
    }

}

export default withRouter(withTranslation()(LoginForm));