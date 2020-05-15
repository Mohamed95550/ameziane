// Import models
const Proxy = require ('../models/Proxy');
const Account = require ('../models/Account');

module.exports = (app) => {

    const accounts = [
        // Create accounts by user id user
        new Account({title: 'DARTY', accounts:['account 1','account 2','account 3','account 4','account 5','account 6','account 7','account 8','account 9','account 10','account 11','account 12'],_owner:'5e83468cd0350b21e4c561f8'}),
        new Account({title: 'FNAC', accounts:['account 1','account 2','account 3','account 4','account 5','account 6','account 7','account 8','account 9','account 10','account 11','account 12'],_owner:'5e83468cd0350b21e4c561f8'}),
        new Account({title: 'BOULANGER', accounts:['account 1','account 2','account 3','account 4','account 5','account 6','account 7','account 8','account 9','account 10','account 11','account 12'],_owner:'5e83468cd0350b21e4c561f8'})
    ]

    const proxies = [
         // Create Proxies by user id user
         new Proxy({title: 'DARTY', proxies:['proxy 1','proxy 2','proxy 3','proxy 4','proxy 5','proxy 6','proxy 7','proxy 8','proxy 9','proxy 10','proxy 11'],_owner:'5e83468cd0350b21e4c561f8'}),
         new Proxy({title: 'FNAC', proxies:['proxy 1','proxy 2','proxy 3','proxy 4','proxy 5','proxy 6','proxy 7','proxy 8','proxy 9','proxy 10','proxy 11'],_owner:'5e83468cd0350b21e4c561f8'})     
    ]

     // Add proxies to database
     const addProxies = async ()=>  {
        try{
            await Proxy.insertMany(proxies)          
        }
        catch(err){
            console.log(err);
        }
    }

     // Add accounts to database
     const addAccounts = async ()=>  {
        try{
            await Account.insertMany(accounts)          
        }
        catch(err){
            console.log(err);
        }
    }       

    // Dataset for database
    app.get('/api/dataset',(req,res)=>{
        addProxies()
        .then(console.log('proxies added'))
        .then(addAccounts)
        .then(console.log('accounts added')) 
    })

    // Reset Collections(Accounts , proxies)        
    /*app.get('/api/resetdb',(req,res)=>{

        Account.deleteMany({ _owner: '5e83468cd0350b21e4c561f8' }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion accounts");
          });
        
        Proxy.deleteMany({ _owner: '5e83468cd0350b21e4c561f8' }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion proxies");
        });
        
    })
    */
 };