import React, { Component } from 'react';
import { connect } from 'react-redux';
import spinner from '../assets/images/loading.gif';
import Pagination from './Pagination.component';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEllipsisH } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
//import { FaPlus } from 'react-icons/fa';
import { convertDate, notify } from '../utils/scripts';

class Tasks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth:this.props,
      tasks:[],
      tmpTasks:[],
      status:true,
      currentPage:1,
      tasksPerPage:10,
      loading:true,   
      numberSortType:'asc',
      profileSortType:'asc',
      websiteSortType:'asc',
      infoSortType:'asc',
      infoSortType:'asc'
    };
  }

  componentDidMount() {   
      // Fetch all tasks by id user
      axios.get('/api/tasks')
        .then(response => {
        this.setState({ tasks: response.data ,tmpTasks:response.data,loading:false})
      })
      .catch((error) => {
        console.log(error); 
      })
  }
onSearching = (e) =>
{ 
  let searchedTasks = this.state.tmpTasks.filter(
                                            task=>JSON.stringify(task)
                                            .toLocaleLowerCase()
                                            .includes(e.target.value)
                                          );

    this.setState({tasks : searchedTasks,currentPage:1})
    return this.state.tasks.map(task => {
    //return <Task tasks={this.state.tasks} status={this.state.status}  task={currentTask}  key={currentTask.id}/>;  
    return(
      this.getTask(task)
          )
  })
}

getTask(task){
  return(
    <tr>
   <td>{task._id}</td>
   <td>{task.account}</td>
   <td>{task.status}</td>
   <td>{convertDate(task.createdDate) }</td>
   <td>{task.website}</td>
  <td > 
                <FaRegTrashAlt style={{fontSize:"16px",cursor:"pointer",float:"left",color:"red"}} 
                              onClick={() => {
                                const confirm = window.confirm("sure to delete this task profile: < "+task.account+" >")
                                if(confirm === true){
                                  axios.delete('/api/tasks_deleteTask'+task._id)
                                       .then(res=>res.data)
                                       .then(notify("warning","task deleted sucessffully"))
                                       .then( axios.get('/api/tasks')
                                                .then(res=>{
                                                    this.setState({
                                                            tasks:res.data
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
                { task.status === 'STARTED'?
                      <FaStop   style={{
                                  color:"red",
                                  float:"left",
                                  marginLeft:"10px",
                                  cursor:"pointer",
                                  fontSize:"16px"}} 
                                  onClick={() =>{
                                    const confirm = window.confirm("Are you sure to stop this task: < "+task.account+" >");
                                    if(confirm === true){
                                       let status='STOPPED';
                                       let _id = task._id;
                                       axios.put('/api/tasks_updateTask',({_id,status}))
                                           .then(res =>res.data)  
                                           .then(notify("basic","Task stopped succeffully"))
                                           .then( axios.get('/api/tasks')
                                                    .then(res=>{
                                                        this.setState({
                                                                tasks:res.data
                                                        })
                                                    })
                                           )             
                                    }  //end if
                                  }}
                      />
                :
                      <FaPlay  style={{ 
                                  color:"green",
                                  float:"left",
                                  marginLeft:"10px",
                                  cursor:"pointer",
                                  fontSize:"16px"}} 
                                  onClick={() =>{
                                    const confirm = window.confirm("Are you sure to start this task");
                                    if(confirm === true){ 
                                       let status='STARTED';
                                       let _id = task._id;
                                      axios.put('/api/tasks_updateTask',({_id,status}))
                                           .then(res =>res.data)  
                                           .then(notify("basic","Task started succeffully"))
                                           .then( axios.get('/api/tasks')
                                                    .then(res=>{
                                                        this.setState({
                                                                tasks:res.data
                                                        })
                                                    })
                                           )             
                                    }  //end if
                                  }}
                      />
                }

    </td>
    <td></td>
</tr>

  )
}
handleSort = (e) => {
 this.tasksList(e.target.id)
}

tasksList(sortParam) {
  var indexOfLastTask = this.state.currentPage * this.state.tasksPerPage;
  var indexOfFirstTask = indexOfLastTask - this.state.tasksPerPage;
  var sortedTasks = [];

    if(sortParam){
      //console.log(sortParam)
      switch(sortParam){
        case 'number':
          if(this.state.numberSortType === 'asc'){
             sortedTasks = this.state.tasks.sort((x, y) => {
            return y._id - x._id; }); 
            this.setState({
              tasks : sortedTasks,
              numberSortType:'desc'
            })
          }else{
              sortedTasks = this.state.tasks.sort((x, y) => {
              return x._id - y._id; }); 
              this.setState({
                tasks : sortedTasks,
                numberSortType:'asc'
              })
            }       
         break;

         case 'profile':
          if(this.state.profileSortType === 'asc'){
            sortedTasks = this.state.tasks.sort((x, y) => {
              if( y.account.toLowerCase() < x.account.toLowerCase()) return -1;
            });
   
           this.setState({
             tasks : sortedTasks,
             profileSortType:'desc'
           })
          }else{
            sortedTasks = this.state.tasks.sort((x, y) => {
              if( y.account.toLowerCase() > x.account.toLowerCase()) return -1;
            });
   
           this.setState({
             tasks : sortedTasks,
             profileSortType:'asc'
           })
          }      
         break;

         case 'website':
          if(this.state.websiteSortType === 'asc'){
            sortedTasks = this.state.tasks.sort((x, y) => {
              if( y.website.toLowerCase() < x.website.toLowerCase()) return -1;
            });
   
           this.setState({
             tasks : sortedTasks,
             websiteSortType:'desc'
           })
          }else{
            sortedTasks = this.state.tasks.sort((x, y) => {
              if( y.website.toLowerCase() > x.website.toLowerCase()) return -1;
            });
   
           this.setState({
             tasks : sortedTasks,
             websiteSortType:'asc'
           })
          }      
         break;
         case 'info':
          if(this.state.infoSortType === 'asc'){
            sortedTasks = this.state.tasks.sort((x, y) => {
              if( y.info.toLowerCase() < x.info.toLowerCase()) return -1;
            });
   
           this.setState({
             tasks : sortedTasks,
             infoSortType:'desc'
           })
          }else{
            sortedTasks = this.state.tasks.sort((x, y) => {
              if( y.info.toLowerCase() > x.info.toLowerCase()) return -1;
            });
   
           this.setState({
             tasks : sortedTasks,
             infoSortType:'asc'
           })
          }      
         break;
         
         default:
           break;
      }
      
    }  
       const currentTasks = this.state.tasks.slice(indexOfFirstTask, indexOfLastTask);
       
      return currentTasks.map(task => {
           // return <Task  status={this.state.status}  task={currentTask}  key={currentTask.id}/>;
           return(
            this.getTask(task)
           )
      })  
}

paginate = pageNumber => {
  this.setState({
      currentPage : pageNumber
  })
};

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
                    <h1 className="card-title">TASKS</h1>
              </div>
              {/* /.card-header */}
              <div className="card-body">
             {auth ? '': window.location='/'}

    <b className="show">Show by  </b><select className="selectNbPages" id="nbTasksByPage" onChange={()=>{
               this.setState({
                tasksPerPage:document.getElementById("nbTasksByPage").value,
                currentPage:1
               });
             }}>
         
              <option value="10" selected>10</option>
              <option>20</option>
              <option >50</option>
              <option >100</option>
            </select>
            <input className="searchInput"  type="search" 
                            placeholder="Searching.."
                            autoComplete="false"                
                            onChange={this.onSearching}                  
                    />
            
           
            <FaStop   style={{ color:"rgb(1, 75, 187)",
                              marginLeft:"10px",
                              float:"right",
                              cursor:"pointer",
                              fontSize:"18px"}} 
                              onClick={() =>{
                                const confirm = window.confirm("Are you sure to stop all tasks");
                                if(confirm === true){
                                  this.setState({status:false})
                                }                              
                              }}
            />

            <FaPlay  style={{ color:"rgb(1, 75, 187)",
                              marginLeft:"10px",
                              float:"right",
                              cursor:"pointer",
                              fontSize:"18px"}} 
                              onClick={() =>{
                                const confirm = window.confirm("Are you sure to start all tasks");
                                if(confirm === true){
                                  this.setState({status:true})
                                }                              
                              }}
            />

            {/*<FaPlus  style={{color:"rgb(1, 75, 187)",
                              float:"right",
                              cursor:"pointer",
                              fontSize:"18px"}} 
                              onClick={() =>{
                               window.location='/tasks/new';}}
            />*/}
            
            {loading? <img src={spinner} style={{width:"50%",marginLeft:"23%",marginRight:"auto" }} alt=""/>:
           <div style={{textAlign:"center"}}>
              <Pagination tasksPerPage={this.state.tasksPerPage} 
            totalTasks={this.state.tasks.length} 
            paginate={this.paginate}
            currentP={this.state.currentPage}
            />
              <table id="taches" style={{marginTop:"5px",color:"black",textAlign: "center",fontSize:"13px"}}>
                <thead>
  <tr style={{borderBottom:"0.1px solid #ccc", color:"black",fontWeight:"bold"}}>
    <th id="number" style={{textAlign:"center", cursor:"pointer"}} onClick={this.handleSort}>NUMBER {this.state.idSortType === 'asc'? '(ASC)':'(DESC)'}</th>

     <th  id="profile" style={{textAlign:"center", cursor:"pointer"}} onClick={this.handleSort}>PROFILE  {this.state.emailSortType === 'asc'? '(ASC)':'(DESC)'}</th>

     <th style={{textAlign:"center"}} >STATUS</th>

      <th  id="info" style={{textAlign:"center", cursor:"pointer"}} onClick={this.handleSort}>INFO  {this.state.compagnySortType === 'asc'? '(ASC)':'(DESC)'}</th>

       <th id="website" style={{textAlign:"center", cursor:"pointer"}} onClick={this.handleSort}>WEBSITE  {this.state.websiteSortType === 'asc'? '(ASC)':'(DESC)'}</th>

        <th style={{textAlign:"center"}}> <FaEllipsisH style={{fontSize:"18px"}} /></th>
          
              </tr>
              </thead>
              <tbody>
                  {this.state.tasks.length > 0 ?this.tasksList():<b style={{alignSelf:"center"}}>Oops no records!</b>}     
              </tbody>    
            </table> 
            <Pagination tasksPerPage={this.state.tasksPerPage} 
            totalTasks={this.state.tasks.length} 
            paginate={this.paginate}
            currentP={this.state.currentPage}
            />
              </div>} 
       </div> 
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
  </section>
{/* /.content */}
</div>       
)
}
}
function mapStateToProps({auth}) {
  return {auth };
}

export default connect(mapStateToProps)(Tasks) ;
