var aws = require('aws-sdk');
var dynamoDB = new aws.DynamoDB(); // creating a new instance of DB
var firstName = false;
var lastName = false;
var phone = false;

exports.handler = async (event, context) => {
  let date = new Date();
// if it is pass a string equal to "NULL"

// check the db for emails and compare entry
// if that email exists delete that entry and add a new entry

// initalise varables
var email = event.request.userAttributes.email;
var given_name = event.request.userAttributes.given_name;
var family_name = event.request.userAttributes.family_name;
var phone_number = event.request.userAttributes.phone_number;

//ensure they're all lower case & removes whitespace
email = email.replace(/ /g,'').toLowerCase();
var doesExisit = false;
var deleteUserID;

var projectIDs = [] // List of projectIDs
var deleteIDs = [] // List of ProjectEditor's to copy and delete

// See if user exisits as a temp user
const data = await getUsers();
data.Items.forEach(function(user) {
  var uEmail = JSON.stringify(user.email.S);
  var uid = JSON.stringify(user.id.S);  

  uEmail = uEmail.replace(/\"/g,'').toLowerCase();
  uid = uid.replace(/\"/g,'').toLowerCase();

  if(uEmail == email){
      doesExisit = true;
      deleteUserID = uid;
  }
});

// Copy what projects the temp user has been added to
const editor = await getProjectEditors();
editor.Items.forEach(function(ed){
  if(deleteUserID == ed.editorID.S){
    projectIDs.push(ed.projectID.S);
    deleteIDs.push(ed.id.S);
  }
});

let params;

  // Event request - When a user is created
  if(event.request.userAttributes.sub){
     if(event.request.userAttributes.family_name != null){
        lastName = true;
        family_name =family_name.replace(/ /g,'');

      }

      if(event.request.userAttributes.given_name != null){
        firstName = true;
        given_name = given_name.replace(/ /g,'');

      }

      if(event.request.userAttributes.phone_number != null){
        phone = true;
        phone_number = phone_number.replace(/ /g,'');

      }

      if(lastName == true && firstName == true && phone == true){ // All are true

       


        
          
        
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},
                'family_name':{S:family_name}, 
                'phone_number':{S:phone_number},
                'given_name':{S:given_name}, 
                'admin':{BOOL:false}, 
                'hasRegistered':{BOOL:true}, 
                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
            TableName: process.env.USERTABLE
          };
        
      }else{
        
        if(lastName == true){ // Condition 1: Lname exists 
          if(firstName == true){ //Lname + firstName
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'family_name':{S:family_name}, // Checked
                'given_name':{S:given_name},  // Checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
            
          }else if(phone == true){ // Lname + phone
            
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'family_name':{S:family_name}, // Checked
                'phone_number':{S:phone_number}, // checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
          
          }else{ // Just Lname
           
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'family_name':{S:family_name}, // Checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
                 
          }
        }else if(firstName == true){ //Condition 2: firstName exisits
          if(lastName == true){ // firstName +  lastName
             
              params = {
                Item:{
                  'id':{S: event.request.userAttributes.sub},
                  '__typename':{S:'User'},
                  'email':{S:email},

                  'family_name':{S:family_name}, // Checked
                  'given_name':{S:given_name},  // Checked
                  'admin':{BOOL:false}, 

                  'hasRegistered':{BOOL:true}, 

                  'createdAt': {S: date.toISOString()},
                  'updatedAt': {S: date.toISOString()},
                },
                TableName: process.env.USERTABLE
              };
            
          }else if(phone == true){ // firstName + phone
           
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'phone_number':{S:phone_number}, // checked
                'given_name':{S:given_name},  // Checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
            
            
          }else{ // Just first Name exists
            
              params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'given_name':{S:given_name},  // Checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
            
            
          }



        }else if(phone == true){ // Condition 3: phone exisits
          if(lastName == true){// phone + last name (family name)
            
              params = {
                Item:{
                  'id':{S: event.request.userAttributes.sub},
                  '__typename':{S:'User'},
                  'email':{S:email},

                  'family_name':{S:family_name}, // Checked
                  'phone_number':{S:phone_number}, // checked
                  'admin':{BOOL:false}, 

                  'hasRegistered':{BOOL:true}, 

                  'createdAt': {S: date.toISOString()},
                  'updatedAt': {S: date.toISOString()},
                },
                TableName: process.env.USERTABLE
              };
            
          }else if(firstName == true){// phone + first name
            
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'phone_number':{S:phone_number}, // checked
                'given_name':{S:given_name},  // Checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
          
          }else{// just phone exists
           
            params = {
              Item:{
                'id':{S: event.request.userAttributes.sub},
                '__typename':{S:'User'},
                'email':{S:email},

                'phone_number':{S:phone_number}, // checked
                'admin':{BOOL:false}, 

                'hasRegistered':{BOOL:true}, 

                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
              },
              TableName: process.env.USERTABLE
            };
          }

        }else{// Condition 4: None are true
        

         
          params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},
              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
              'admin':{BOOL:false}, 
              'hasRegistered':{BOOL:true}

            },
            TableName: process.env.USERTABLE
          };
        }
       
    }
    try{
        // Create new user
        await dynamoDB.putItem(params).promise(); // Call DynamoDB and parse the new user details to the DB
        if(doesExisit == true){

        // Delete Old Project Editor
        for(var i = 0; i < projectIDs.length; i++){
          params = {
            TableName:process.env.PROJECTEDITOR,
            Key:{
                "id":{S: deleteIDs[i]},
            }
          };

          await dynamoDB.deleteItem(params).promise();
          
          
          // Create New Project Editor
          params = {
            Item:{
              'id':{S: deleteIDs[i]},
              'projectID':{S:projectIDs[i]},
              '__typename':{S:'ProjectEditor'},
              'editorID':{S:event.request.userAttributes.sub},
              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()}
            },
            TableName: process.env.PROJECTEDITOR
          };
      
          await dynamoDB.putItem(params).promise();
        }
        // Delete Pre made Account
        params = {
          TableName:process.env.USERTABLE,
          Key:{
            "id":{S: deleteUserID},
          }
        };
          await dynamoDB.deleteItem(params).promise();
        }
        
      console.log("Success");

    }catch(err){
      console.log("Error in postConfirmation.js | Failed to Send Data to DynamoDB ", err); // Failed to Send to DynamoDB
    }
  
   
    
    return null

  }else{
    //Log out the error
    console.log("Error: Nothing was written to DynamoDB");
    context.done(null,event);
  }
}


function getUsers(){
  try{
    const params = {
    TableName: process.env.USERTABLE,
    };
    return dynamoDB.scan(params).promise();
  }catch(e){
    console.error("Error in readMessage @ postConfirmation.js "+ e);
  }
  
}


function getProjectEditors(){
  try{
    const params = {
    TableName: process.env.PROJECTEDITOR,
    };
    return dynamoDB.scan(params).promise();
  }catch(e){
    console.error("Error in getProjectEditors @ postConfirmation.js "+ e);
  }
  
}