import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (

            <footer class="main-footer ">
                Copyright &copy; 2019 <a href="https://platformraffles.herokuapp.com/">Raffles platform</a>.
                    All rights reserved.
                <div class="float-right d-none d-sm-inline-block">
                    <b>v0</b> 
                </div>
                {/* Menu animated fix top right*/ }
                <aside className="control-sidebar " style={{backgroundColor:"none"}}>
                    <div className="navProfile"> 
                        <ul>
                            <li><a href="/logout">Profile</a></li>
                            <li><a href="/api/logout">Log out</a></li>
                            <li><a href="/logout">Settings</a></li>
                        </ul>
                    </div>
           
                 </aside>
            </footer>
            

        )
    }
}
