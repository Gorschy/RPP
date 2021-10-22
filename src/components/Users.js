import React, {Component} from 'react';
import '../pages/admin.css';

import { API, graphqlOperation } from 'aws-amplify'; // Used for sending DynamoDB
import {deleteUser} from '../graphql/mutations'; // For removing User
import {getUser} from '../graphql/queries'; // For getting User ID
import {listUsers} from '../graphql/queries'; // For getting All Users
import { withRouter } from 'react-router-dom'    
import { Tag, Divider,Badge,Modal,Button, Form } from 'antd';
//import 'bootstrap/dist/css/bootstrap.css';
import defProfile from '../assets/default_profile.jpg';





export class Users extends Component {

    state = {
        userShow: false, // Showing User Modal
        offsetShow: false, // Showing Offset Modal
        userID: "", // Showing UserID for User Modal
        validated: true, // Display Error Message for User Modal
        filter: [], // Array of deleted ID's
modal1Visible: false,
            modal2Visible: false
    }
 
    constructor(props) {
        super(props)
        this.deleteInput = null;
    
      }


     // Remove id item
     async remove(email){
        const {users, loading} = this.props;
        const UID = await API.graphql(graphqlOperation(listUsers, {filter: {email: {eq: email}, admin: {eq: false}, hasRegistered: {eq: true}  }})); // Get the id of the email address
console.log(email);
              //  await API.graphql(graphqlOperation(deleteUser,{input: {id: UID.data.listUsers.items[0].id}} )); // Execute Delete

                //update state & close modal
                this.setState({userShow:false});
                this.setState({validated:true});
                 
                //Add to filter list
                this.setState({ filter: [...this.state.filter, UID.data.listUsers.items[0].id] });
                this.setModal2Visible(false)
          
    }

    handleClose(){
        // Close modal & Remove Warning message
        this.setState({userShow:false,validated:true});
    }

    handleShow(email){

        // Show modal
        this.setState({userShow:true,userID:email});
    }

    UserView(user){
        //remove local storage
        localStorage.removeItem('user_key');
        // add local storage
        localStorage.setItem('user_key',JSON.stringify(user,null,2))
        //open new page
        this.props.history.push('/details');

    }

     changeBackground(e) {
        e.target.style.background = 'var(--color_green)';
        e.target.style.colour = 'white';

      }
        
          setModal2Visible(modal2Visible,email) {
            this.setState({ modal2Visible });
            this.setState({userShow:true,userID:email});

          }


    render(){
    
        
       
        const {loading,users} = this.props;
        const filter = this.state.filter;
        // users go through filter

        const user_list = users.filter(i => !filter.includes(i.id));
        /* User Modal */
        // Closing User Modal
        const userShow = this.state.userShow;
        const handleClose = () =>  this.setState({userShow:false,validated:true});
        

        const user_email = this.state.userID;        // displays email to the admin in the header of the modal
        const validated = this.state.validated; // Validating that the typed in "Delete User"

        const changeBackground = (e) => {
;
            e.target.style.background = 'white';
            e.target.style.color = 'red';
          };

        const changeBackgroundNormal = (e) => {
            e.target.style.background = 'red';
            e.target.style.color = 'white';
    
          };
        const setTime = (createdAt) =>{
            var temp = createdAt.split("-");
            // [0]Year [1]Month [2]DayT
            temp[2] = temp[2].split("T");
            // [0]Year [1]Month [2][0]Day [2][1]Time

            const time = temp[2][0]+"/"+temp[1]+"/"+temp[0];            
            const now = new Date()
            
           if(temp[0] == now.getFullYear() && temp[1]== (now.getMonth()+1)){
                return (
                        <>
                        <span> <Tag color="var(--color_green)">New</Tag></span> | Registered: {time}
                        </>
                    );
                    
           }else{
            return (
                <>
                <span><tag color="geekblue" >Recurring</tag></span> | Registered: {time}
                </>
            );
           }
       // document.getElementById("userBadge").value = (<Badge bg="success">Success</Badge>);

         
        }

        /* End of User Modal */

        if(loading){
            return <h2>Loading..</h2>
        }
    return(
        <>

{user_list.length === filter.length || user_list.length === 0  ? <td colSpan="8">No Users can be found!</td>: user_list.map(user => (
                      <tr key = {user.id}>   
                      <td className="text-center">
                          <div className="c-avatar">
                              <img width="40"src={defProfile} className="c-avatar-img" alt="Profile Pic" />
                              <span className="c-avatar-status bg-success"></span>
                          </div>
                      </td>
                      <td>
                          <div>{user.email}</div>
                          <div className="small text-muted">
                              {setTime(user.createdAt)}
                          </div>
                      </td>
                      <td>
                          <div>{user.given_name}</div>
                      </td>
                      <td>
                          <div>{user.family_name}</div>
                      </td>
                      <td >
                          <div>{user.phone_number}</div>
                      </td>
                    
                </tr>
            ))} 

            </>
    )

    }
   

}
export default withRouter (Users);