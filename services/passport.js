const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const request = require('request-promise-native')
const User = mongoose.model('users');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new DiscordStrategy({
        clientID: keys.discordClientID,
        clientSecret: keys.discordClientSecret,
        callbackURL: '/auth/discord/callback',
        scope: keys.scopes,
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {

            //console.log(accessToken,refreshToken)
            
            var options = {
              method: 'PUT',
              url: `https://discordapp.com/api/guilds/623525695477252096/members/${profile.id}`,
              headers: {
                authorization: 'Bot NjEzMzg3NTEzNTkxMTAzNTU1.XYEakQ.pF8rjN9QGYTqt3dDCSjBIBNlOKY',
                'content-type': 'application/json'
              },
              body: {access_token: accessToken},
              json: true
            };
            
            request(options)
            const existingUser = await User.findOne({ discordId: profile.id });
            
            if (existingUser) {
                return done(null, existingUser);
            }
            
            const user = await new User({ discordId: profile.id,email:profile.email,discordTag: `${profile.username}#${profile.discriminator}` }).save()
            done(null, user);
        }
    )
);
