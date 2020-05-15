import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './DashboardHeader';
import Footer from './DashboardFooter';
import Tasks from './DashboardTasks';
import GenerateTasks from './DashboardGenerateTasks';
import Accounts from './DashboardAccounts';
import NewAccounts from './DashboardNewAccounts';
import Proxies from './DashboardProxies'
import NewProxies from './DashboardNewProxies';

class Menu extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      contentLayout:'tasks'   
    }
  }
    render() {
      const {auth} = this.props;
      let tagName = auth.discordTag;
    
        return (
          <div>
          <Header/>
         <aside className="main-sidebar sidebar-dark-primary elevation-4 " id="bgColor">
  {/* Brand Logo */}
  <a href="/dashboard" className="brand-link" style={{textDecoration:"none"}}>
    <span className="brand-text font-weight-light" style={{fontSize:"20px" ,fontWeight:"bold"}}>RAFFLES DASHBOARD</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar" id="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
      </div>
      <div className="info">
        <a href="#" className="d-block" style={{fontSize:"16px"}}>{tagName? tagName.substr(0,tagName.indexOf('#')).toUpperCase():null}</a>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        <li className="nav-item has-treeview ">
          <a  className="nav-link ">
            <i className="nav-icon fas fa-tasks" />
            <p>
              Tasks
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item"  onClick={()=>{
          this.setState({contentLayout:'generateTasks'})
        }}>
              <a  className="nav-link">
              <span className="right badge badge-info">New</span>
                <p>Generate Tasks</p>
              </a>
            </li>    
            <li className="nav-item" onClick={()=>{
          this.setState({contentLayout:'tasks'})
        }}>
              <a className="nav-link"> 
                <p> List of Tasks </p>
              </a>
            </li>    
          </ul>
        </li>
       
        <li className="nav-item has-treeview ">
          <a  className="nav-link ">
            <i className="nav-icon fas fa-users" />
            <p>
              Accounts
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item"  onClick={()=>{
          this.setState({contentLayout:'newaccounts'})
        }}>
              <a  className="nav-link">
              <span className="right badge badge-info">New</span>
                <p>Add List</p>
              </a>
            </li>    
            <li className="nav-item" onClick={()=>{
          this.setState({contentLayout:'accounts'})
        }}>
              <a className="nav-link"> 
                <p> List of accounts </p>
              </a>
            </li>    
          </ul>
        </li>


        <li className="nav-item has-treeview ">
          <a  className="nav-link ">
            <i className="nav-icon fas fa-eye" />
            <p>
              Proxies
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item "  onClick={()=>{
          this.setState({contentLayout:'newproxies'})
        }}>
              <a  className="nav-link">
              <span className="right badge badge-info">New</span>
                <p>Add List</p>
              </a>
            </li>    
            <li className="nav-item" onClick={()=>{
          this.setState({contentLayout:'proxies'})
        }}>
              <a className="nav-link"> 
                <p> List of proxies </p>
              </a>
            </li>    
          </ul>
        </li>

       </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>
{/*this.state.contentLayout === 'tasks' ? <Tasks/> :this.state.contentLayout === 'proxies' ? <Proxies/>:this.state.contentLayout === 'accounts' ? <Accounts/>:this.state.contentLayout === 'generateTasks' ? <GenerateTasks/>:null*/}
  {     this.state.contentLayout === 'tasks' 
        ? <Tasks/> :this.state.contentLayout === 'generateTasks' 
        ? <GenerateTasks/>:this.state.contentLayout === 'accounts' 
        ? <Accounts/>:this.state.contentLayout === 'newaccounts' 
        ? <NewAccounts/>:this.state.contentLayout === 'proxies' 
        ? <Proxies/>:this.state.contentLayout === 'newproxies'
        ? <NewProxies/>:null  
  }
         <Footer/>
      </div>
      
        )
    }
}
function mapStateToProps({ auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Menu) ;