import React from 'react';
import { withRouter, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import * as actions from './actions';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import LayoutSignin from './layouts/LayoutSignin';

//Components
import NotFound from './components/NotFound.component';
import Dashboard from './DashboardComponents/DashboardMenu';

// Views 
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';

import { connect } from 'react-redux';


toast.configure();
class App extends React.Component {

  componentDidMount() {
    document.body.classList.add('is-loaded')
    //this.refs.scrollReveal.init();
    this.props.fetchUser();
    //this.props.fetchUsers();

  }

  // Route change
 componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.refs.scrollReveal.init();
    }
  }

  render() {
    return (

      <ScrollReveal
        ref="scrollReveal"
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />           
            <AppRoute exact path="/login" component={Login} layout={LayoutSignin} />
            <AppRoute exact path="/signup" component={Signup} layout={LayoutSignin} />
            <AppRoute exact path="/dashboard" component={Dashboard}/>
            {/* Add here others routes*/}
            <AppRoute exat path="*" component={NotFound} />     
          </Switch>
        )} />
    );
  }
}

export default connect(null,actions)((withRouter(props => <App {...props} />)));