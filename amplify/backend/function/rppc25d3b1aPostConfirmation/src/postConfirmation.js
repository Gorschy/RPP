var aws = require('aws-sdk')
var dynamoDB = new aws.DynamoDB() // creating a new instance of DB
var firstName = false;
var lastName = false;
var phone = false;

exports.handler = async (event, context) => {
  let date = new Date()
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
    // User Paramaters
       params = {
        Item:{
          'id':{S: event.request.userAttributes.sub},
          '__typename':{S:'User'},
          'email':{S:email},
          'family_name':{S:family_name}, 
          'phone_number':{S:phone_number},
          'given_name':{S:given_name}, 
          'admin':{BOOL:false}, 
          'createdAt': {S: date.toISOString()},
          'updatedAt': {S: date.toISOString()},
        },
        TableName: process.env.USERTABLE
      }

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

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }
        }else if(phone == true){ // Lname + phone

           params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},

              'family_name':{S:family_name}, // Checked
              'phone_number':{S:phone_number}, // checked
              'admin':{BOOL:false}, 

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }
        }else{ // Just Lname
           params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},

              'family_name':{S:family_name}, // Checked
              'admin':{BOOL:false}, 

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }        
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

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }
        }else if(phone == true){ // firstName + phone
           params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},

              'phone_number':{S:phone_number}, // checked
              'given_name':{S:given_name},  // Checked
              'admin':{BOOL:false}, 

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }
        }else{ // Just first Name exists
           params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},

              'given_name':{S:given_name},  // Checked
              'admin':{BOOL:false}, 

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }  
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

              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }

        }else if(firstName == true){// phone + first name
           params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},

              'phone_number':{S:phone_number}, // checked
              'given_name':{S:given_name},  // Checked
              
              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }
        }else{// just phone exists
           params = {
            Item:{
              'id':{S: event.request.userAttributes.sub},
              '__typename':{S:'User'},
              'email':{S:email},

              'phone_number':{S:phone_number}, // checked
              
              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.USERTABLE
          }
        }

      }else{// Condition 4: None are true
         params = {
          Item:{
            'id':{S: event.request.userAttributes.sub},
            '__typename':{S:'User'},
            'email':{S:email},
            'createdAt': {S: date.toISOString()},
            'updatedAt': {S: date.toISOString()},
          },
          TableName: process.env.USERTABLE
        }  
      }
       
    }

    
   
    try{
      await dynamoDB.putItem(params).promise() // Call DynamoDB and parse the new user details to the DB
      console.log("Success")

    }catch(err){
      console.log("Error in postConfirmation.js ", err) // Failed to Send to DynamoDB
    }
    return null

  }else{
    //Log out the error
    console.log("Error: Nothing was written to DynamoDB")
    context.done(null,event)
  }
}
