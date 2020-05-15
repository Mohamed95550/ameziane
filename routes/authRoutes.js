const passport = require('passport');
const keys = require('../config/keys');
const request = require('request');

module.exports = (app) => {
    
    app.get(
        '/auth/discord',
        passport.authenticate('discord', {
            scope: keys.scopes 
        })
    );
    
    app.get(
        '/auth/discord/callback',
        passport.authenticate('discord'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    });
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
    
    app.post('/static/9e0f7e221c018604b589af633b9fb5b',(req,res)=>{
        request('https://akamaieastkap.herokuapp.com/harvest',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({data:req.body,type:'site'})
        })
        console.log('sent sensor')
        res.sendStatus(200)
    })
};
