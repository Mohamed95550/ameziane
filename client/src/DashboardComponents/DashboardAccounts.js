import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import spinner from '../assets/images/loading.gif';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEllipsisH } from 'react-icons/fa';
import {notify } from '../utils/scripts';

class Accounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth:this.props,
      loading:true,
      accounts:[] 
    };
  }

  componentDidMount(){
    try{
      axios.get('/api/accounts')
        .then(res=>{
          this.setState({
            accounts:res.data,
            loading:false
          })
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error);
        }) 
    }
    catch(err){
    }
  }

  accountsList(){
    return this.state.accounts.map(account =>{
      //console.log(account.title)
      return (
         <tr>
          <td>
            <b>{account.title}</b>
          </td>
          <td style={{width:"85%"}}>
            {account.accounts.map((row,index) => {
              return(
                row+" / "
              )
            })}
          </td>
          <td>
          <FaRegTrashAlt style={{fontSize:"16px",cursor:"pointer",float:"left",color:"red"}} 
                              onClick={() => {
                                const confirm = window.confirm("Sure to delete this list: < "+account.title+" >")
                                if(confirm === true){
                                  axios.delete('/api/accounts_deleteList'+account._id)
                                       .then(res=>res.data)
                                       .then(notify("warning","List deleted sucessffully"))
                                       .then( axios.get('/api/accounts')
                                                .then(res=>{
                                                    this.setState({
                                                            accounts:res.data
                                                    })
                                                })
                                                .catch((error) => {
                                                  console.log(error);
                                                }) 
                                       )
                                       .catch((error) => {
                                        console.log(error);
                                      })              
                                }  //end if
                              }}
                              
                />
          </td>
        </tr>
      )
    })   
  }

    render() {

        const {loading}=this.state;
        const {auth}=this.props;
    
        return (
          <div className="content-wrapper">            
          <section className="content">
              <div className="row">
                  <div className="col-12">
                      <div className="card">
                          <div className="card-header">
                              <h1 className="card-title">ACCOUNTS</h1>
                          </div>{/* /.card-header */}          
                          <div className="card-body">
                              {auth ? '': window.location='/'}
                              {loading? <img src={spinner} style={{width:"50%",marginLeft:"23%",marginRight:"auto" }} alt=""/>:
                            <table id="proxies" style={{marginTop:"5px",color:"black",textAlign: "left",fontSize:"13px"}}>
                            <thead>
              <tr style={{borderBottom:"0.1px solid #ccc", color:"black",fontWeight:"bold"}}>
                <th>TITLE</th>
            
                <th>ACCOUNTS</th>
                <th><FaEllipsisH style={{fontSize:"18px"}} /></th>            
                          </tr>
                          </thead>
                          <tbody>
                              {this.state.accounts.length > 0 ?this.accountsList():<tr style={{textAlign:"center",columnFill:"2"}}>Oops no records!</tr>} 
                          </tbody>    
        </table> }
                          </div> {/* /.card-body */}    
                      </div>{/* /.card */}   
                  </div>{/* /.col */}
              </div> {/* /.row */}
          </section>{/* /.content */}
      </div>       
        )
    }
}
function mapStateToProps({ auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Accounts) ;

