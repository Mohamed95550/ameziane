import React, { Component } from 'react';
import imgNotFound from '../assets/images/notfound.jpg'
class NotFound extends Component {
   
    redirectToHome (){
        setTimeout(()=>{
            window.location='/';
        },1500)
    }
    
    render() {
      
        return(
            <div style={{paddingTop:"10%",fontWeight:'bold',width:'100%',height:'900px',textAlign:'center'}}>
                <img style={{paddingLeft:'41%'}} src={imgNotFound} alt=""/>
                <h4>We Redirect you to home..</h4>
                {this.redirectToHome()}
            </div>                   
        );
    }
}

export default NotFound;
