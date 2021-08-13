import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { Route, Switch } from 'react-router-dom';
import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends Component{

  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, console.log(this.state)) 
        })
      }
      else{
        this.setState({currentUser: userAuth})
      }
    }) 
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return(
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInSignUpPage}/>
        </Switch>
      </div>
    );
  }

}
export default App;
