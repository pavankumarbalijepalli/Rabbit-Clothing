import React from 'react';
import SignUp from '../../components/sign-up/sign-up.component';
import Signin from '../../components/signin/signin.component';
import './signin-signup.styles.scss';


const SignInSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <Signin/>
        <SignUp/>
    </div>
)

export default SignInSignUpPage