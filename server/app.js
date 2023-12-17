require('dotenv').config();
const express = require('express');
const session = require('express-session');
const jsforce = require('jsforce');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const request = require('request');

const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => console.log('Database connected successfully!')).catch(err => console.log(err));

app.use(session({
    secret: '2480BD481645073CF01D9FEF00A87AB747B00E3533A5427408DA8EA34C72EA69',
    resave: false,
    saveUninitialized: true
}));
    
// Your Salesforce Connected App credentials
const oauth2 = new jsforce.OAuth2({
    clientId: '3MVG9Ve.2wqUVx_azqQ9X_hV8qJR4RGoZ49k84IS9IbXvMcgrrK9_41kS42Rp9GbpUt5zE6kW5M0kdaVl9.TN',
    clientSecret: '2480BD481645073CF01D9FEF00A87AB747B00E3533A5427408DA8EA34C72EA69',
    redirectUri: `http://localhost:${port}/oauth2/callback`
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/proxy', (req, res) => {
    const url = oauth2.getAuthorizationUrl({ scope: 'full' })
    console.log('Received request for:', req.url);
    console.log('Forwarding request to:', url);

    const proxy = req.pipe(request(url));
    proxy.on('error', (error) => {
        console.error('Error in proxy:', error);
    });
    proxy.pipe(res);
});

app.get('/oauth2/auth-url', (req, res) => {
    const url = oauth2.getAuthorizationUrl({ scope: 'full' });
    res.send(url);
});

app.get('/oauth2/auth', (req, res) => {
    res.redirect(oauth2.getAuthorizationUrl({ scope: 'full' }));
});

app.get('/oauth2/callback', (req, res) => {
    const conn = new jsforce.Connection({ oauth2 });
    const code = req.query.code;
    conn.authorize(code, (err, userInfo) => {
    if (err) {
        return res.status(500).send('Error during authorization');
    }

    req.session.accessToken = conn.accessToken;
    req.session.instanceUrl = conn.instanceUrl;
    res.redirect('http://localhost:8080/connected');
    });
});

app.get('/thankyou', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
});

app.post('/send', (req, res) => {
    const conn = new jsforce.Connection({
    instanceUrl: req.session.instanceUrl,
    accessToken: req.session.accessToken
    });

    var apexBody = [
        "public class TestApex3 {",
        "  public string sayHello() {",
        "    return 'Hello3333';",
        "  }",
        "}"
    ].join('\n');

    console.log(apexBody);

    conn.tooling.sobject('ApexClass').create({
        body: apexBody
    }, function(err, res) {
        if (err) { return console.error(err); }
        console.log('Succeessfully created class!');
        console.log(res);
    });

    res.redirect('/thankyou');

});
  

// start server
app.listen(port, () => console.log(`Server is running on port: http://localhost:${port}`));