//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-material-login-template'));
console.log('baw')

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

app.get('*', (request, response) => {
  console.log('ngehe')
  response.sendFile(path.join(__dirname + '/dist/angular-material-login-template/index.html'));
});

console.log('Console listening!');
