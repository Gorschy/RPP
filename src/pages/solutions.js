import React, { Component } from 'react';
import { List, Row, Col, Modal, Button, Divider, Progress, Tooltip, InputNumber, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {getUser, listSolutions} from '../graphql/queries';
import {createSolutionBacked, updateSolution, updateUser} from '../graphql/mutations';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import '../style.css';
import './solutions.css';
import 'leaflet/dist/leaflet.css';
//import treeIcon from '../assets/treeIcon50x50.png';
import leafRed from '../assets/leaf-red.png';
import leafOrange from '../assets/leaf-orange.png';
import leafGreen from '../assets/leaf-green.png';

/* ========================================
COMMENTS BY: Zachary O'Reilly-Fullerton
======================================== */
const nonNegativeUserCarbon = true;
const startingZoom = 2; 
var waypointList = [];
var pageUser={"given_name":" "};
var currentUnitsSelected = 1;
const startVariables = [
    0, //Start Latitude
    0, //Start Longitude
];
/*
const waypointIcon = L.icon({ 
    iconUrl: treeIcon,
    iconSize: [50,50],
    iconAnchor: [25.5, 50],
    popupAnchor: [0, -50]
})
*/
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
const updateCost = (inputVal) => {
    currentUnitsSelected = inputVal;
    mainClass.doUpdate();
}
const calcPercent = (currentPurchases, maxPurchases) => { 
    if (currentPurchases === 0 && maxPurchases === 0) {return 100;} else{
        return Math.floor((currentPurchases / maxPurchases)* 100); 
    }
}
const calcRemainingSpots = (val1, val2) => { return (val1-val2); }
const getCost = () => { return (20* currentUnitsSelected + ".00"); }
const calcSuccess = () => {return itemToPass.filledP + currentUnitsSelected}
const handleCancel = () => {mainClass.setState({modalVisible: false});}
const setModalVals = (passedItem) => {
    mainClass.setState({selectedSoln: passedItem});
    itemToPass = passedItem;
    if (passedItem.totalP <= passedItem.filledP) {mainClass.setState({purchaseButtonVisible:(false)})}
    else {mainClass.setState({purchaseButtonVisible:(true)})}
    mainClass.setState({modalVisible: true});
}

function CreateModal () {

    return (
        <Modal className="purchaseModal" title={<h1>Invest in: {itemToPass.title}</h1>} centred visible={mainClass.state.modalVisible} width="90vw" closable={false}
            footer={[<Button className="cancelButton" onClick={handleCancel}>Back</Button>]} 
        >

            { (mainClass.state.user != null) ? ( /* If the user is logged in... */
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
                    
                    
                    {mainClass.state.purchaseButtonVisible ? (
                        <React.Fragment>
                        <h3>Total Cost: ${getCost()}</h3>
                        <Row><Col span={14}>
                        <h3>How many carbon tonnes would you like to offset? </h3> </Col><Col span={10}>
                        <InputNumber id="purchaseNumberInput" min={1} max={calcRemainingSpots(itemToPass.totalP, itemToPass.filledP)} 
                            defaultValue = {1} onChange={updateCost} step={1}/>
                        </Col></Row>
                        <Button className="purchaseButton" onClick={mainClass.makePurchase}>Purchase</Button>
                        </React.Fragment>
                    ) : (
                        <h3>This solution has been completely funded.</h3>
                    )}
                    
                    <br/><br/>
                    <h3 className="disclaimerText">DISCLAIMER: The project client has requested that we refrain from implementing a proper payment system. Pressing the "Purchase" button simulates a successful payment.</h3>

                    </Col>
                    <Divider type="vertical" id="solutionModalVertDivider"/>
                    
                    <Col span={11}>
                    
                    <Row>
                    <Col span={18}>
                        <h2>Hello, <b>{pageUser.given_name}</b>.<br/>
                        You have <b>{pageUser.carbon_units}</b> tonnes of excess carbon 
                        emission that hasn't been offset. <br/>
                        You have offset a total of <b>{pageUser.offsetted_units}</b> tonnes
                        of carbon.<br/></h2>
                    </Col>
                    <Col span={6}>
                        <Tooltip autoAdjustOverflow = {true} className="progressTT" title={<h3>{pageUser.offsetted_units}/{pageUser.offsetted_units+pageUser.carbon_units} Carbon Tonnes offset.</h3>}
                            color={"#ffffff"}>
                        <Progress className="progressBar" percent={calcPercent(pageUser.offsetted_units, (pageUser.offsetted_units+pageUser.carbon_units))} 
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

    )
}

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
                        <br/>
                        <div className="centreInvestButton">
                        <Button className="investButton" onClick={() => setModalVals(LOI)}>Invest</Button>
                        </div>
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
                        <br/>
                        <div className="centreInvestButton">
                        <Button className="investButton" onClick={() => setModalVals(LOI)}>Invest</Button>
                        </div>
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
                        <br/>
                        <div className="centreInvestButton">
                        <Button className="investButton" onClick={() => setModalVals(LOI)}>Invest</Button>
                        </div>
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
    return(
        <div>
        
        <List 
        rowKey = {"id"}
        id="solutionList"
        dataSource={waypointList}
        itemLayout={'vertical'}
        header={<div><h1>Solutions</h1><br/><h3>Click a solution to invest.</h3></div>}
        renderItem={item => (
            <List.Item className="solListItem" onClick={() => setModalVals(item)}>
                <List.Item.Meta
                    title={<div><h2>{item.title}</h2><b><h3 className="backerCountText">Backed By: {item.backerCount} donors!</h3></b></div>}
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
        <CreateModal />

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

function CreateMap () {
    return (
        <MapContainer 
            attributionControl={false}
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
            ></TileLayer>
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
    );
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
        carbonScore: 20,
        carbonOffset: 140,
        selectedSoln: null,
        purchaseButtonVisible: true,
        modalVisible: false
    }

    doUpdate = () => {
        this.forceUpdate();
    }

    async componentDidMount () {
        try {
            var currentUser = await Auth.currentAuthenticatedUser();
        } catch {
            currentUser = null;
        }
        if (currentUser === null) {
            this.setState({user: null})
            pageUser = null;
        }
        else {
            const userID = currentUser.attributes.sub;
            const userForUpdate = await API.graphql(graphqlOperation(getUser,  {id: userID}))
            const userFinal = userForUpdate.data.getUser;
            if (userFinal.offsetted_units == null) {userFinal.offsetted_units = 0;}
            if (userFinal.carbon_units == null) {userFinal.carbon_units = 0;}
            this.setState({user: userFinal})
            pageUser = userFinal;
        }

        try {
        const getSols = await API.graphql(graphqlOperation(listSolutions));
        const returnArray = getSols.data.listSolutions.items;
        const sortArray = returnArray.sort((a, b) => {
            if (a.priority === b.priority) 
            {return (a.totalP - a.filledP) - (b.totalP - b.filledP)}
            return a.priority < b.priority ? 1 : -1 ;
        });
        
        populateMarkers(sortArray)
        this.setState({loaded: true})
        console.log("ag")
        console.log(mainClass.state.user);
        mainClass.forceUpdate();
        } catch (e) { console.error(e); }
    }

    async makePurchase () {
        try {
        mainClass.setState({carbonScore: mainClass.state.carbonScore - currentUnitsSelected})
        mainClass.setState({carbonOffset: mainClass.state.carbonOffset + currentUnitsSelected})
        var userObject;

        if (nonNegativeUserCarbon) {
            if (mainClass.state.user.carbon_units - currentUnitsSelected <= 0) {
                userObject = await API.graphql(graphqlOperation(updateUser, 
                    { input:{
                        id: mainClass.state.user.id, 
                        carbon_units: 0,
                        offsetted_units: mainClass.state.user.offsetted_units + currentUnitsSelected
                }}));
            }
            else {
                userObject = await API.graphql(graphqlOperation(updateUser, 
                { input:{
                    id: mainClass.state.user.id, 
                    carbon_units: mainClass.state.user.carbon_units - currentUnitsSelected,
                    offsetted_units: mainClass.state.user.offsetted_units + currentUnitsSelected
                }}));
            }
        }
        else {
            userObject = await API.graphql(graphqlOperation(updateUser, 
                { input:{
                    id: mainClass.state.user.id, 
                    carbon_units: mainClass.state.user.carbon_units - currentUnitsSelected,
                    offsetted_units: mainClass.state.user.offsetted_units + currentUnitsSelected
            }}));
        }
        
        const solnObject = await API.graphql(graphqlOperation(updateSolution, 
            { input:{
                id:mainClass.state.selectedSoln.id, 
                backerCount: mainClass.state.selectedSoln.backerCount+1, 
                filledP: mainClass.state.selectedSoln.filledP + currentUnitsSelected
        }}));
        //User has just bought a solution
        const backerObject = await API.graphql(graphqlOperation(createSolutionBacked, 
            { input:{
                backerID: mainClass.state.user.id, 
                solutionID: mainClass.state.selectedSoln.id,
                money_amount: currentUnitsSelected*20,
                credits: currentUnitsSelected
        }}));
        console.log("User " + userObject + " has updated solution " + solnObject + " and has created " + backerObject);
        window.location.reload();
        
        } catch (e) { console.error(e) }
            
    
    }
    
    render() {
        return(
            <div>
                {(mainClass.state.user != null ) ? 

                <Row>
                <CreateMap />
                <CreateList />
                </Row>
             : (
                <Card>
                <div id="loginAndRegisterContainer">
                    <h2 id="loginAndRegisterText">Please log in or register to view solutions.</h2>
                    <Link to="/login"><Button className="loginAndRegisterButtons">Log In</Button></Link>
                    <br/><br/>
                    <Link to="/register"><Button className="loginAndRegisterButtons">Register</Button></Link>
                </div>
                </Card>


             )}

            </div>
        ); 

    }
    
}

export default Solutions;


