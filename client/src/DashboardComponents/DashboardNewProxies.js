import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { notify } from '../utils/scripts';

class NewProxies extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth:this.props,
      title:'',
      fields:[],
      proxies:[],
      proxiesFiles:[]
    };
  }
  
onChangeTilteHandler = e =>{
        this.setState({ title:e.target.value})
}

addFields = e => {
    this.setState({fields:[...this.state.fields,""]})
    console.log(this.state.fields)
}

addFile = (e) => {
    const input = document.getElementById('addFile');
    const reader =new FileReader();
    reader.readAsText(input.files[0])
    reader.onload = ()=>{   
        let lines = reader.result.split('\n').map(line => {
            return line
        })
        this.setState({
            proxiesFiles:lines
        })
    }
}

renderDynamiclyFields(){
    
    return this.state.fields.map((row , index)=>{
                                    return(
                                        <div key={index}> 
                                            <div className="row">
                                                <div className="form-group col-12"> 
                                                    <input 
                                                        required
                                                        className="form-control"
                                                        placeholder="add proxy"
                                                        name="proxy"
                                                        autoComplete="off"
                                                        minLength="10"
                                                        maxLength="15"
                                                        type="text"
                                                        id={'proxy'+index}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
}

onSubmit = (e) =>{
    e.preventDefault();
    try{
        axios.get('/api/proxies_verify'+this.state.title.trim())
        .then((response) => {
            if(response.data === true){
                notify('danger','title should be never used!')
            }
            else{
                let proxies =[]
                this.state.fields.forEach((row,index)=>{
                    proxies.push(  document.getElementById("proxy"+index).value)
                })
                this.state.proxiesFiles.forEach((row,index)=>{
                    proxies.push(row)
                })

                let obj = {title:this.state.title,proxies }
                console.log(obj);
                try{
                    axios.post('/api/proxies_create',obj)
                    .then(res=>console.log(res.data))
                    .then(notify('success','List added successfully!'));
                }catch(err){
                    console.log(err)
                }
               
            }
            
        })
    }catch(err){
        console.log(err)
    }
   
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
                              <h1 className="card-title">ADD PROXIES</h1>
                          </div>{/* /.card-header */}          
                          <div className="card-body">
                            {auth ? '': window.location='/'}
                            <form onSubmit={this.onSubmit}>
                                <div className="row error" >{this.state.titleError}</div>
                                <div className="row">
                                    <div className="form-group col-12"> 
                                        <input  type="text"
                                            required
                                            className="form-control"
                                            onChange={this.onChangeTilteHandler}
                                            placeholder="Enter a title for this list"
                                            name="title"
                                            autoComplete="off"
                                            minLength="4"
                                        />
                                    </div>  
                                </div> 
                                {this.renderDynamiclyFields()}
                                <div className="row " style={{margin:"10px"}}>
                                   <button className="btn btn-outline" onClick={(e)=>this.addFields(e)}>
                                         <FaPlus style={{ 
                                                    color:"green",
                                                    float:"left",
                                                    marginLeft:"10px",
                                                    cursor:"pointer",
                                                    ontSize:"16px"}} 
                                        />
                                    </button>
                                    <input type="file" id="addFile" onChange={(e)=>{this.addFile(e)}}/>
                                </div>
                                <div className="row"> 
                                    <div className="form-group col-3" >
                                        <input type="submit" value="Submit"  className="btn btn-outline-success btn-block" />
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

function mapStateToProps({ auth}) {
  return { auth };
}

export default connect(mapStateToProps)(NewProxies) ;