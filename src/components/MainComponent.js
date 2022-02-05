//IMPORT DEPENDENCIES
import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//IMPORT COMPONENTS
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { ReactReduxContext } from 'react-redux';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

//SET STATE FOR MAIN COMPONENT
class Main extends Component {

    //RENDER HOME PAGE COMPONENT
    render() {
        const HomePage = () => {
            return (
                <Home 
                    campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            ); 
        };

        //MAKE DIRECTORY CAMPSITE DETAILS DISPLAY DYNAMICALLY
        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        };   

        //ROUTING FOR NAVIGATION MENU
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps)(Main));