import React, { Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './signin.styles.scss'

import { signInWithGoogle } from '../../firebase/firebase.utils';

class Signin extends Component{

    constructor(){
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an Account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        handleChange={this.handleChange} 
                        name='email' 
                        type='email' 
                        required
                        value = {this.state.email}
                        label = 'Email'
                    />
                    <FormInput 
                        handleChange={this.handleChange} 
                        name='password' 
                        type='password' 
                        required
                        value = {this.state.password}
                        label = 'Password'
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignin>Sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signin