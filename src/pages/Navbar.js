import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import { Menu, Button, Image, Dropdown, Row, Col } from 'antd';
import './Navbar.css';
import '../style.css';
import logo from '../assets/LOTT rd.png';
import { Auth, Storage, graphqlOperation } from 'aws-amplify';
import Avatar from '../assets/avatar.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {getUser} from '../graphql/customQueries';
import { API } from 'aws-amplify'; // Used for sending DynamoDB

const { Item } = Menu;
const { SubMenu } = Menu;
/* TODO:
    - add light dark mode functionality
    - route page tabs
    - style according to style guide
    - remove hover border
*/
const Navbar = () => {
    const [isAdmin, setAdmin] = useState(false);
   
    //Not sure if this needs to be braces vs brackets???
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    if(loggedIn == true){
        GetUserData();
    }


    async function GetUserData(){
        if(loggedIn == true){
            const data = await Auth.currentUserPoolUser();
            const userInfo = { ...data.attributes };
            const uData = await API.graphql(graphqlOperation(getUser, { id: userInfo.sub })); // Only looking at Users not admins
            if(uData.data.getUser.admin == true){
               console.log(uData.data.getUser.admin); 
                setAdmin(true);
            }else{
                setAdmin(false);
            }
            
        }
    }
    const [image, setImage] = useState(Avatar);

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
 
    const signOut = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
        } catch (error) {
            console.log('error signing out: ', error);
        }
        window.location.reload();
    };

    useEffect(() => {
        getProfilePicture();
    }, []);

    

    return (
        <React.Fragment>
            {/* The Hidden Burger Model */}
            
            <Menu className="burgerList" mode="horizontal" defaultSelectedKeys={["Home"]}>
                <Item key="Home"><Link to='/home'><Image src={logo} id="LOTTLogo" preview={false}/></Link></Item>
                <SubMenu mode="vertical" title={<h3 className="navbarHeaders"><FontAwesomeIcon icon={faBars} /></h3>}>
                {loggedIn ? ( <Item key="Dashboard"> <Link to='/dashboard'><h3 className="navbarHeadersBurger">Dashboard</h3></Link> </Item>) : null }   
                <Item key="Calculator"> <Link to='/calculator'><h3 className="navbarHeadersBurger">Calculator</h3></Link> </Item>
                {loggedIn ? (<Item key="Profile"> <Link to='/profile'><h3 className="navbarHeadersBurger">Profile</h3></Link> </Item>) : null }
                {loggedIn ? (<Item key="Projects"> <Link to='/projects'><h3 className="navbarHeadersBurger">Projects</h3></Link> </Item>) : null }
                <Item key="Solutions"> <Link to='/solutions'><h3 className="navbarHeadersBurger">Solutions</h3></Link> </Item>
                <Item key="ContactUs"> <Link to='/contactUs'><h3 className="navbarHeadersBurger">Contact Us</h3></Link> </Item>
                {loggedIn && isAdmin ? <Item key="Admin"> <Link to='/admin'><h3 className="navbarHeadersBurger">Admin</h3></Link> </Item> : null }

                </SubMenu>
                
            </Menu>

            <Menu theme="light" mode="horizontal" defaultSelectedKeys={["Home"]} className="leftStyle">
                <Item key="Home"><Link to='/home'><Image src={logo} id="LOTTLogo" preview={false}/></Link></Item>
                {loggedIn ? ( <Item key="Dashboard"> <Link to='/dashboard'><h3 className="navbarHeaders">Dashboard</h3></Link> </Item>) : null }   
                <Item key="Calculator"> <Link to='/calculator'><h3 className="navbarHeaders">Calculator</h3></Link> </Item>
                {loggedIn ? (<Item key="Profile"> <Link to='/profile'><h3 className="navbarHeaders">Profile</h3></Link> </Item>) : null}
                {loggedIn ? (<Item key="Projects"> <Link to='/projects'><h3 className="navbarHeaders">Projects</h3></Link> </Item>) : null }
                <Item key="Solutions"> <Link to='/solutions'><h3 className="navbarHeaders">Solutions</h3></Link> </Item>
                <Item key="ContactUs"> <Link to='/contactUs'><h3 className="navbarHeaders">Contact Us</h3></Link> </Item>
                {loggedIn && isAdmin ? <Item key="Admin"> <Link to='/admin'><h3 className="navbarHeaders">Admin</h3></Link> </Item> : null }

                 

            </Menu>

            <Menu theme="light" mode="horizontal" className="rightStyle">
            { loggedIn ? (<Item key="profileImage"> <Link to='/account'><img className = "profile-pic" src={image} /></Link></Item> ) : null }  
            { loggedIn ? (<Item><Link to="/"><Button onClick={signOut} className="loginButtonNav" type="primary">Sign out</Button></Link></Item>) : null }
                
            { !loggedIn ? (<Item><Link to='/register'><Button type="link" ><div className="standardTextLink">Need an Account?</div></Button></Link></Item>) : null }
            { !loggedIn ? (<Item><Link to="/login"><Button  className="loginButtonNav" type="primary">Login</Button></Link></Item>) : null }

            </Menu>
        </React.Fragment>
    );
}

export default Navbar;

