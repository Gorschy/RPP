import React, { useState, useContext, Component } from 'react';
import { List, Row, Col, Modal, Button, Divider, Progress, Tooltip, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {listSolutions} from '../graphql/queries';
import {createSolutionBacked, updateSolution, createSolution} from '../graphql/mutations';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet';
import '../style.css';
import './solutions.css';
import 'leaflet/dist/leaflet.css';
import treeIcon from '../assets/treeIcon50x50.png';
import leafRed from '../assets/leaf-red.png';
import leafOrange from '../assets/leaf-orange.png';
import leafGreen from '../assets/leaf-green.png';

/* ========================================
COMMENTS BY: Zachary O'Reilly-Fullerton
======================================== */

const startingZoom = 2; 
var waypointList = [];
var pageUser={"given_name":""};
const startVariables = [
    0, //Start Latitude
    0, //Start Longitude
];
const waypointIcon = L.icon({ 
    iconUrl: treeIcon,
    iconSize: [50,50],
    iconAnchor: [25.5, 50],
    popupAnchor: [0, -50]
})
var greenIcon = L.icon({
    iconUrl: leafGreen,
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var orangeIcon = L.icon({
    iconUrl: leafOrange,
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var redIcon = L.icon({
    iconUrl: leafRed,
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var itemToPass = {
    "title"             : "",
    "desc"              : "",
    "Position"          : [0, 0],
    "filledP"           : 0,
    "totalP"            : 100
    
}
const updateCost = (inputVal) => {mainClass.setState({currentUnitsSelected: inputVal})}
const calcPercent = (CurrentPurchases, MaxPurchases) => { return Math.floor((CurrentPurchases / MaxPurchases)* 100); }
const calcRemainingSpots = (val1, val2) => { return (val1-val2); }



function Waypoints (props) {
    if (props.arrayToShow === 'trees') {
        return (
            // For clarification, LOI === Location of Interest.
            treesWaypointList.map((LOI) => (
                <React.Fragment key={LOI.title}>
                <Marker position={LOI.coords} icon={greenIcon}>
                    <Popup>
                        <div className="markerHeader"><b>{LOI.title}</b></div> 
                        <br/>
                        <div className="markerDescription">{LOI.desc}</div>
                    </Popup>
                </Marker>
                </React.Fragment>
            ))
        );
    }
    else if (props.arrayToShow === "land") {
        return (
            // For clarification, LOI === Location of Interest.
            landWaypointList.map((LOI) => (
                <React.Fragment key={LOI.title}>
                <Marker position={LOI.coords} icon={orangeIcon}>
                    <Popup>
                        <div className="markerHeader"><b>{LOI.title}</b></div> 
                        <br/>
                        <div className="markerDescription">{LOI.desc}</div>
                    </Popup>
                </Marker>
                </React.Fragment>
            ))
        );
    }
    else if (props.arrayToShow === "animal") {
        return (
            // For clarification, LOI === Location of Interest.
            animalWaypointList.map((LOI) => (
                <React.Fragment key={LOI.title}>
                <Marker position={LOI.coords} icon={redIcon}>
                    <Popup>
                        <div className="markerHeader"><b>{LOI.title}</b></div> 
                        <br/>
                        <div className="markerDescription">{LOI.desc}</div>
                    </Popup>
                </Marker>
                </React.Fragment>
            ))
        );
    }
    else {return(null);}

    
}

//setLoggedIn(true);

function CreateList () {
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (passedItem) => {
        mainClass.setState({selectedSoln: passedItem});
        itemToPass = passedItem;
        setIsModalVisible(true);
    };
    const handleCancel = () => {setIsModalVisible(false);}
    const getCost = () => { return (20* mainClass.state.currentUnitsSelected+ ".00"); }
    const calcSuccess = () => {return itemToPass.filledP + mainClass.state.currentUnitsSelected}
    return(
        <div>
        
        <List 
        rowKey = {"id"}
        id="solutionList"
        dataSource={waypointList}
        itemLayout={'vertical'}
        header={<div><h1>Solutions</h1><br/><h3>Click a solution to invest.</h3></div>}
        renderItem={item => (
            <List.Item className="solListItem" onClick={() => showModal(item)}>
                <List.Item.Meta
                    title={<h2>{item.title}</h2>}
                    description={<div className="standardText">{item.desc}</div>}
                />     
                <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{item.filledP} of {item.totalP} units purchased.</h3>}
                    color={"#ffffff"}>
                    <Progress   className="progressBar" showInfo={false} percent={calcPercent(item.filledP, item.totalP)} 
                                strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} />
                </Tooltip>
                
            </List.Item>
        )}
        ></List>
        

        <Modal className="purchaseModal" title={<h1>Invest in: {itemToPass.title}</h1>} centred visible={isModalVisible} width="90vw" closable={false}
            footer={[<Button className="cancelButton" onClick={handleCancel}>Back</Button>]} 
        >

            { loggedIn ? ( /* If the user is logged in... */
                <div>
                    <Row justify="space-around">
                    <Col span={12}>
                    <h3><b>{itemToPass.desc}</b></h3>
                    <br/>
                    <Row>
                        <Col span={6}><Progress type="circle" strokeColor="#4A7634" success={{percent: calcPercent(itemToPass.filledP, itemToPass.totalP), strokeColor:"#134A2C"}}
                            percent={calcSuccess()}/></Col>
                        <Col span={18}><h2>
                            {itemToPass.filledP} spaces have been filled out of the needed {itemToPass.totalP}.<br/>
                            {calcRemainingSpots(itemToPass.totalP, itemToPass.filledP)} spaces remain. <br/>
                            Each space represents 1 carbon tonne. <br/>
                            1 carbon tonne = $20 AUD.
                        </h2></Col>
                    </Row>
                    <br/>
                    <Row><Col span={14}>
                        <h3>How many carbon tonnes would you like to offset? </h3> </Col><Col span={10}>
                        <InputNumber id="purchaseNumberInput" min={1} max={calcRemainingSpots(itemToPass.totalP, itemToPass.filledP)} 
                            defaultValue = {1} onChange={updateCost} step={1}/>
                    </Col></Row>
                    <h3>Total Cost: ${getCost()}</h3>
                    <Button className="purchaseButton" onClick={mainClass.makePurchase}>Purchase</Button>
                    <br/><br/>
                    <h3 className="disclaimerText">DISCLAIMER: The project client has requested that we refrain from implementing a proper payment system. Pressing the "Purchase" button simulates a successful payment.</h3>

                    </Col>
                    <Divider type="vertical" id="solutionModalVertDivider"/>
                    
                    <Col span={11}>
                    
                    <Row>
                    <Col span={18}>
                        <h2>Hello, <b>{pageUser.given_name}</b>.<br/>
                        You have <b>{mainClass.state.carbonScore}</b> tonnes of excess carbon 
                        emission that hasn't been offset. <br/>
                        You have offset a total of <b>{mainClass.state.carbonOffset}</b> tonnes
                        of carbon.<br/></h2>
                    </Col>
                    <Col span={6}>
                        <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{mainClass.state.carbonOffset}/{mainClass.state.carbonOffset+mainClass.state.carbonScore} Carbon Tonnes offset.</h3>}
                            color={"#ffffff"}>
                        <Progress className="progressBar" percent={calcPercent(mainClass.state.carbonOffset, (mainClass.state.carbonOffset+mainClass.state.carbonScore))} 
                            strokeColor={{"0%" : "#4A7634","100%" : "#134A2C",}} type="circle"/>
                        </Tooltip>
                    </Col>
                    </Row>
                        
                    </Col>
                    </Row>
                </div>
            ) : ( /* If they arent logged in... */
                <div id="loginAndRegisterContainer">
                    <h2 id="loginAndRegisterText">Please log in or register to make a purchase.</h2>
                    <Link to="/login"><Button className="loginAndRegisterButtons">Log In</Button></Link>
                    <br/><br/>
                    <Link to="/register"><Button className="loginAndRegisterButtons">Register</Button></Link>
                </div>
            )}
        </Modal>

        </div>
    );

}
var treesWaypointList = [];
var landWaypointList = [];
var animalWaypointList = [];
function populateMarkers(solutionsArray) {
    solutionsArray.forEach(solutionItem => {
        waypointList.push(
        {
            "id"            : solutionItem.id,
            "title"         : solutionItem.title,
            "desc"          : solutionItem.desc,
            "coords"        : [parseFloat(solutionItem.coordY), parseFloat(solutionItem.coordX)],
            "filledP"       : parseFloat(solutionItem.filledP),
            "totalP"        : parseFloat(solutionItem.totalP),
            "type"          : solutionItem.type,
            "backerCount"   : solutionItem.backerCount,
            "goal"          : solutionItem.goal,
            "funding"       : solutionItem.funding

        })
    });

    waypointList.forEach(waypoint => {
        // Now we have a full list, lets also create sub lists for sorting based on type. There is a degree of user ease
        // in that we are kind to singular and plural versions of the type where applicable.
        if (waypoint.type === "trees" || waypoint.type === "tree"){ treesWaypointList.push(waypoint); }
        else if (waypoint.type === "land"){ landWaypointList.push(waypoint); }
        else if (waypoint.type === "animal" || waypoint.type === "animals"){ animalWaypointList.push(waypoint); } 
        else {console.log(waypoint.title + " is of type " + waypoint.type);}
    })
};

function makeSolnFromSelected() {
    console.log("Making New Solution From The Following Solution:")
    console.log(mainClass.state.selectedSoln);
    return {
        title: mainClass.state.selectedSoln.title,
        desc: mainClass.state.selectedSoln.desc,
        coordX: mainClass.state.selectedSoln.coords[1],
        coordY: mainClass.state.selectedSoln.coordY[0],
        filledP: mainClass.state.selectedSoln.filledP,
        totalP: mainClass.state.selectedSoln.totalP,
        type: mainClass.state.selectedSoln.type,
        goal: mainClass.state.selectedSoln.goal,
        funding: mainClass.state.selectedSoln.funding,
        backerCount: parseInt(mainClass.state.selectedSoln.backerCount),
        visibility: true,
        priority: false
    }

}

var mainClass;
// Finally, the actual section that renders the page.
class Solutions extends Component { 
    constructor(props) {
        super(props)
        this.deleteInput = null;
        mainClass = this;
    }

    state = {
        user: null,
        loaded: false,
        currentUnitsSelected: 1,
        carbonScore: 20,
        carbonOffset: 140,
        selectedSoln: null
    }

    async componentDidMount () {
        var currentUser = await Auth.currentAuthenticatedUser();
        this.setState({user: currentUser})
        pageUser = this.state.user.attributes
        console.log(pageUser);
        const getSols = await API.graphql(graphqlOperation(listSolutions));
        const returnArray = getSols.data.listSolutions.items;
        const sortArray = returnArray.sort((a, b) => {
            if (a.priority === b.priority) 
            {return (a.totalP - a.filledP) - (b.totalP - b.filledP)}
            return a.priority < b.priority ? 1 : -1 ;
        });
        
        populateMarkers(sortArray)
        this.setState({loaded: true})
    }

    

    async makePurchase () {
        console.log(mainClass.state.selectedSoln);
        try {
            /*
        //----- Create Solution [if user is login] -----
        const object = await API.graphql(graphqlOperation(createSolution, { input: {
            title: "String!",
            desc: "String!",
            coordX: "String!",
            coordY: "String!",
            filledP: "String!",
            totalP: "String!",
            type: "String!",
            goal: "String!",
            funding: "String!",
            backerCount: 0,
            visibility: true,
            priority: false
        }}));
        */
        console.log(mainClass.state.user.attributes.sub)
        mainClass.setState({carbonScore: mainClass.state.carbonScore - mainClass.state.currentUnitsSelected})
        mainClass.setState({carbonOffset: mainClass.state.carbonOffset + mainClass.state.currentUnitsSelected})
        
        // update soln
        //await API.graphql(graphqlOperation(updateSolution, {input: {
        //                                                            filter: mainClass.state.selectedSoln.id,
        //                                                            set: 
        //}, condition: }))

            console.log(Auth.currentUserInfo())
            //Auth.currentUserInfo().then((userInfo) => {
                // This shouldn't happen as the purchase button is inaccessible to users who are not logged in.
                //if(userInfo == null){console.error("User Is NULL?")}
            //})
            //User has just bought a solution
            //const object = await API.graphql(graphqlOperation(createSolutionBacked, { input:{backer: mainClass.state.user.username, solutionID: object.data.createSolutionBacked.id }}));
            }
        catch (e) { 
            console.error(e)}
    
    }
    
    render() {
        return(
            <div>
                <Row>
                    <MapContainer 
                    id="map" 
                    center={startVariables} 
                    zoom={startingZoom} 
                    scrollWheelZoom={true}
                    maxBounds={[[-90, -180],[90, 180]]}
                    >
                    <TileLayer  
                        attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        minZoom='2'
                        noWrap="true"
                        bounds={[[-90, -180],[90, 180]]}
                    />
                    <LayersControl position="topright">
                        <LayersControl.Overlay checked name="Tree Solutions">
                            <LayerGroup>
                            <Waypoints arrayToShow="trees"/>
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Land Solutions">
                            <LayerGroup>
                            <Waypoints arrayToShow="land"/>
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Animal Solutions">
                            <LayerGroup>
                            <Waypoints arrayToShow="animal"/>
                            </LayerGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                    
                    </MapContainer>
                
                <CreateList />
                </Row>
            </div>
        ); 

    }
    
}

export default Solutions;


