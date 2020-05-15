import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import { notify } from '../utils/scripts';

const Proxies = props => (
      <option value={props.proxies.title}>{props.proxies.title}</option> 
 )
 
const Accounts = props => (
  <option value={props.accounts.title}>{props.accounts.title}</option> 
)
class GenerateTasks extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        auth:this.props,
        proxiesList:[],
        accountsList:[],
        proxyLength:0,
        accountLength:0,
        proxyIndex:0,
        accountIndex:0,
        status:'',
        website:''
      };
    }
  
    componentDidMount() {
     
      // Fetch all proxies by id user
      axios.get('/api/proxies')
        .then(response => {
          this.setState({ proxiesList: response.data })
        })
        .catch((error) => {
          console.log(error);
        }) 
        
        actions.fetchAccountsByUser();
  
      // Fetch all accounts by id user
      axios.get('/api/accounts')
        .then(response => {
          this.setState({ accountsList: response.data })
        })
        .catch((error) => {
          console.log(error);
        }) 
  }
  
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  onSubmit = (e) =>{
   
    e.preventDefault();
    const {accountsList,proxiesList,website,status} = this.state;
   
    let profiles = [];
    
    if((proxiesList.length > 0) && (accountsList.length > 0)){

      proxiesList.forEach((proxy, index) => {
        if(proxy.title ===  document.getElementById("proxy").value){
           this.state.proxyLength = proxy.proxies.length;
           this.state.proxyIndex = index;
        }
      })
  
      accountsList.forEach((account, index) => {
        if(account.title ===  document.getElementById("account").value){
           this.state.accountLength = account.accounts.length;
           this.state.accountIndex = index;
        }
      })

      if(this.state.proxyLength < this.state.accountLength) {      
        profiles = proxiesList[this.state.proxyIndex].proxies;
      } else {
        profiles = accountsList[this.state.accountIndex].accounts;
      } 
    } 
    else{
        if(accountsList.length > 0){
        accountsList.forEach((account, index) => {
          if(account.title ===  document.getElementById("account").value){
            this.state.accountLength = account.accounts.length;
            this.state.accountIndex = index;
          }
        })
        profiles = accountsList[this.state.accountIndex].accounts;
      }
        if(proxiesList.length > 0){
          proxiesList.forEach((proxy, index) => {
            if(proxy.title ===  document.getElementById("proxy").value){
              this.state.proxyLength = proxy.proxies.length;
              this.state.proxyIndex = index;
            }
          })
          profiles = proxiesList[this.state.proxyIndex].proxies;
        }
    }

      const tasks = {website, status ,profiles}  
      //console.log(tasks)
        //commit 
          axios.post('/api/tasks_generatetasks',tasks)
          .then(res => res.data)
          .then(notify("success","Tasks generated successfully"))
          .then(window.location = './dashboard')
          .catch((error) => {
            console.log(error);
          }) 
  }
  accountsList() {
    return this.state.accountsList.map(currentAccounts => {
      return <Accounts  accounts={currentAccounts}  key={currentAccounts._id}/>;
    })
  }
  
  proxiesList() {
    return this.state.proxiesList.map(currentProxies => {
      return <Proxies  proxies={currentProxies}  key={currentProxies._id}/>;
    })
  }
  
  render() {

        const {auth}=this.props;
        return (      
    
            <div className="content-wrapper">            
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h1 className="card-title">GENERATE TASKS</h1>
                                </div>{/* /.card-header */}          
                                <div className="card-body">
                                    {auth ? '': window.location='/'}
                                    <form onSubmit={this.onSubmit}>
            <div className="row">
                    <div className="form-group col-6"> 
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangeHandler}
                        placeholder="Enter a website"
                        name="website"
                        />
                    </div>
                
            </div>
            {this.state.accountsList.length <  1 ? null 
            : 
            <div className="row">
                    <div className="form-group col-6"> 
                        <select className="form-control"  onChange={this.onChangeHandler} name="accountTitle" id="account"required>
                            <option value="">Choose list of accounts</option>
                        {this.accountsList()}           
                        </select>
                    </div>         
            </div>}

            {this.state.proxiesList.length < 1  ? null 
            :
            <div className="row">
                    <div className="form-group col-6"> 
                    <select className="form-control"  onChange={this.onChangeHandler} name="proxyTitle" id="proxy" required>
                            <option value="">Choose list of proxies</option>
                        {this.proxiesList()}         
                        </select>
                    </div>         
            </div>}

            <div className="row">
                    <div className="form-group col-6"> 
                    <select className="form-control"  onChange={this.onChangeHandler} name="status" required>
                            <option value="">Set status</option>
                            <option value="STOPPED">STOPPED</option>
                            <option value="STARTED">STARTED</option>
                        </select>
                    </div>         
            </div>
  
            <div className="row"> 
                
                    <div className="form-group col-3" >
                        <input type="submit" value="Generate Tasks" className="btn btn-outline-success btn-block" />
                    </div>
                    <div className="form-group col-3" >
                        <input type="reset" value="Reset" className="btn btn-outline-warning btn-block" />
                    </div>
                    <div className="form-group col-6"></div>
            </div>              
        </form>
                                </div> {/* /.card-body */}    
                            </div>{/* /.card */}   
                        </div>{/* /.col */}
                    </div> {/* /.row */}
                </section>{/* /.content */}
            </div>       
        )
    }
}

function mapStateToProps({ auth,accounts}) {
    return { auth };
  }
  export default connect(mapStateToProps)(GenerateTasks) ;
