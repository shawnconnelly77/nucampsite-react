//IMPORT DEPENDENCIES
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//IMPORT COMPONENTS
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
//IMPORT OBJECTS/DATA
import { CAMPSITES } from '../shared/campsites';
import {PARTNERS} from '../shared/partners';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';

//SET STATE FOR MAIN COMPONENT
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    //RENDER HOME PAGE COMPONENT
    render() {
        const HomePage = () => {
            return (
                <Home 
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        //ROUTING FOR NAVIGATION MENU
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route exact path='/aboutus' render={() => <About partners={this.state.partners} />} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;