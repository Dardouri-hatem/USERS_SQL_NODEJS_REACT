import React,{useEffect} from 'react'
import Table from './Table';
import Header from "../header/header"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {getUsers,logout,deleteUser} from '../../JS/actions/usersAction'
import Modal from "../modal/modal"


function UsersList({getUsers,usersList,logout,deleteUser,token}) {
    useEffect(() => {
       getUsers()
    }, [getUsers])
    return ( 
        <div>
            {token?null:<Redirect to = '/' />}
           <Header />
           <div className ="mb-2 mt-2 d-flex justify-content-center">
           <Modal />
           </div>
            <Table
            deleteUser = {deleteUser}
            data={usersList}
            header={[
              {
                name: "First name",
                prop: "name"
              },
              {
                name: "Family name",
                prop: "family_name"
              },
              {
                name: "Creation date",
                prop: "created_at"
              }
            ]}
          />
          
          </div>
    )
}
const mapStateToProps = state =>{
    return{usersList : state.users.usersList,
    token : state.users.token}
}
export default connect(mapStateToProps,{getUsers,logout,deleteUser})(UsersList)