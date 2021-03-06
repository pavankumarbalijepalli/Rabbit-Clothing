import React, { Component } from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import Header from './components/header/header.component';

import { Route, Switch, Redirect } from 'react-router-dom';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import './App.css';

class App extends Component{
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          })
        })
      }
      else{
        setCurrentUser(userAuth)
      }
    }) 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return(
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={()=> this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage/>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
