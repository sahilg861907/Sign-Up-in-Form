const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.eMail;

  var data={
    members:[
      {
     email_address:email,
     status:"subscribed",
      merge_fields:{
        FNAME: firstName,
       	LNAME: lastName
      }
    }

  ]
};
var jsonData=JSON.stringify(data);

const url="https://us20.api.mailchimp.com/3.0/lists/0460f42218";
const options={
  method:"POST",
  auth:"sahil:399f146fa499e424a5ea3a5dd5865290-us20"
};



const request=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");

  }else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));

  });
});

request.write(jsonData);
request.end();

  console.log(firstName,lastName,email);
});

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server has started on port 3000");
});



//API Key
//399f146fa499e424a5ea3a5dd5865290-us20

//Audience
//0460f42218
