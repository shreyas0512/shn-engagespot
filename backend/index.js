const express = require('express');
const app = express();
const cors = require('cors');
const EngagespotClient = require('@engagespot/node').EngagespotClient;
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());
const client = EngagespotClient({
  apiKey:'cq6lc6s7vifzotpky6zmp9',
  apiSecret:'9g7eh66cbato5d07k7h27pfbha4fe8b6j5ajic59hj7j502'
});

app.get('/', (request, response) => {
    response.json(
      {
        "message": "ENGAGESPOT API",
        "routes": [
          {
            "route": "/sentmail",
            "methods": [
              "POST"
            ]
          },
          {
            "route": "/adduser",
            "methods": [
              "POST"
             
            ]
          },          
        ]
      }
    )
  });

app.post('/adduser', (req, res) => {
    console.log(client);
    const { email, phoneNumber } = req.body;
    client.createOrUpdateUser(email,{
        "email": email,
        "phoneNumber": phoneNumber
    })
    res.send("User added successfully")
});

app.post('/sentmail', (req, res) => {
  console.log(client);
  console.log(req.body);
  client.send({
    notification:{
        title: "FALL DETECTED",
        message: "ALERT:  Fall Detected",
        url: "https://github.com/shreyas0512/shn-engagespot",
        icon: "https://user-images.githubusercontent.com/64391274/230778611-64589571-eaaa-4677-b115-7626978dd856.png"
    },
    recipients:[req.body.email]
    });
    res.send('MAIL SENT!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
module.exports = app;