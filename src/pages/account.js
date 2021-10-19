import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Form, Input, Button, Divider, Select} from 'antd';
import { UserContext } from './UserContext';
import { Auth,API, graphqlOperation, Storage  } from 'aws-amplify';
import "./account.css";
import "../style.css";
import { Redirect } from 'react-router';
import {updateUser} from '../graphql/mutations';
import {getUser} from '../graphql/queries';

Storage.configure({ track: false, level: "public" });


const Account = () => { 
    //const { Option } = Select;
    const {loggedIn, setLoggedIn} = useContext(UserContext);

    const [givenName, setGivenName] = useState('Test');
    const [familyName, setFamilyName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState('');

    const [image, setImage] = useState();
    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
      fileInput.current.click();
    };
  
    const onProcessFile = async e => {
        
        let user = await Auth.currentAuthenticatedUser();
        let temp = user.attributes.sub + ".png";
        
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        try {
        reader.readAsDataURL(file);
        } catch (err) {
        console.log(err);
        }
        reader.onloadend = () => {
        setImage(reader.result);
        };
        //Need to change profilePicture.png into userSub Id
        Storage.put(temp, file, {
        contentType: "image/png"
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };
    
      const onPageRendered = async () => {
        getProfilePicture();
      };
    
      const getProfilePicture = async () => {
        //Need to change profilePicture.png into userSub Id
        let user = await Auth.currentAuthenticatedUser();
        let temp = user.attributes.sub + ".png";

        Storage.get(temp)
          .then(url => {
            var myRequest = new Request(url);
            fetch(myRequest).then(function(response) {
              if (response.status === 200) {
                setImage(url);
              }
            });
          })
          .catch(err => console.log(err));
      };

    const displayUserDetails = async () => {
        //Capture current authed user
        try {  
            const data = await Auth.currentUserPoolUser();
            const userInfo = { ...data.attributes };
            const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.sub }));
            setGivenName(userData.data.getUser.given_name);
            setFamilyName(userData.data.getUser.family_name);
            setEmail(userData.data.getUser.email);
            setPhoneNumber(userData.data.getUser.phone_number);

        } catch (err) {
            console.log("error: ", err);
        } 
    };

    useEffect(() => {
        displayUserDetails();
        onPageRendered();
    }, []);

    const updateUserDetails = async () => {
        
        //Dont let them change email.
        let user = await Auth.currentAuthenticatedUser();
        console.log(user);
        console.log(user.attributes.sub);
        await Auth.updateUserAttributes(user, {
            'email': email,
            'given_name': givenName,
            'family_name': familyName,
            'phone_number': phoneNumber
        });
        await API.graphql(graphqlOperation(updateUser,{input: {id: user.attributes.sub, email: email, given_name: givenName, family_name: familyName, phone_number:phoneNumber }} )); // Execute Delete
    };

    return(
    <div> 
    { loggedIn ? (
    <div>

        <Card className="accountCard" title={<h1>Account Details</h1>} bordered={false} >
            
            <br/>
            <h2 id="label" >First Name</h2>
            <input className="inputFieldShort"
            id="firstName"
            label="firstName" 
            value={givenName}
            maxLength="30"
            onChange={e => setGivenName(e.target.value)}
            />
      
            <br/><br/>
            <h2 id="label">Last Name</h2>
            <input className="inputFieldShort" 
            id='lastName'
            label="lastName" 
            value={familyName}
            maxLength="30"
            onChange={e => setFamilyName(e.target.value)}
            />

            <h2 id="label" >Email</h2>
            <input className="inputFieldShort" 
                id="email"
                label="email" 
                value={email}
                maxLength="40"
                onChange={e => setEmail(e.target.value)}
            />
            
            <h2 id="label" >Phone Number</h2>
            <input className="inputFieldShort" 
                id='phoneNumber'
                label="phoneNumber" 
                value={phoneNumber}
                maxLength="12"
                onChange={e => setPhoneNumber(e.target.value)} 
                /*addonBefore={prefixSelector} style={{ width: '100%' }}*/
            />

        <Divider orientation="left"><h2>Change Password</h2></Divider>

            <input className="inputFieldLong" 
                id='currentPassword'
                label="currentPassword" 
                value={currentPassword}
                maxLength="30"
                onChange={e => setCurrentPassword(e.target.value)} 
                /*addonBefore={prefixSelector} style={{ width: '100%' }}*/
            />

            <a href="#">
            <input
                type="file"
                onChange={onProcessFile}
                ref={fileInput}
            />
            </a>
            <img src={image} onClick={onOpenFileDialog} />

            <span className="errorLabel">{errors}</span>
            <br/><br/>
            <Button className="loginButton"  type="primary" onClick={updateUserDetails} > Update Account Details </Button>
        </Card> 
        

        
       


      
    </div>
    ) : (<Redirect to="/home"/>) }
    </div>
); }

export default Account