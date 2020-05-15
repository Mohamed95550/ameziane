import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
                 <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{height:"80px"}}>
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" style={{fontSize:"16px"}}/></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="/" className="nav-link"><i className="fa fa-home" style={{fontSize:"16px"}}/></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link"><i className="fa fa-user-plus" style={{fontSize:"16px"}}/></a>
    </li>
  </ul>
  {/* SEARCH FORM 
  <form className="form-inline ml-3">
    <div className="input-group input-group-sm">
      <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
      <div className="input-group-append">
        <button className="btn btn-navbar" type="submit">
          <i className="fas fa-search" />
        </button>
      </div>
    </div>
  </form>*/}
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Messages Dropdown Menu */}
    <li className="nav-item dropdown">
        {/* add others functions */}
    </li>
    {/* Notifications Dropdown Menu */}
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="far fa-bell" style={{fontSize:"16px"}} />
        {/*<span className="badge badge-warning navbar-badge">15</span>*/}
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">15 Notifications</span>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-envelope mr-2" style={{fontSize:"16px"}}/> 4 new messages
          <span className="float-right text-muted text-sm">3 mins</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <i className="fas fa-users mr-2" style={{fontSize:"16px"}}/> 8 friend requests
          <span className="float-right text-muted text-sm">12 hours</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item" >
          <i className="fas fa-file mr-2" style={{fontSize:"16px"}}/> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a>
        <div className="dropdown-divider" />
        <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="#">
        <i className="fa fa-power-off" style={{fontSize:"16px"}}/>
        {/*<span className="badge badge-warning navbar-badge">15</span>*/}
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header"><i className="fa fa-unlock-alt" style={{fontSize:"16px"}}/>  <a href="/api/logout">Logout</a></span>
        <div className="dropdown-divider" />
       
     </div>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button"><i className="fa fa-cog" style={{fontSize:"16px"}}/></a>
    </li>
  </ul>
</nav>
        )
    }
}
