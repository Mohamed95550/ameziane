const Account = require('../models/Account');
const isLogin = require('../middlewares/ensureAuthentificate');

module.exports = (app) => {
  
    // Create new account
    app.post('/api/accounts_create',isLogin, async (req,res)=>{
        const {title,accounts} = req.body;
        /*const usedTitle = await Account.findOne({title});
        if(usedTitle){
            res.status(404).json({err:"title should be never used!"})
        }
        else{
          */  const account = new Account ({ title,accounts, _owner:req.user._id})
            try{
                const newAccount = await account.save();
                res.status(200).json(newAccount)
            }
            catch(err){
                 res.status(500).json({err:"cannot add account"})
            }
        //}     
    })

    // verify title
    app.get('/api/accounts_verify:title',isLogin, async (req,res)=>{
       try{
           const usedTitle = await Account.findOne({title:req.params.title});
        if(!usedTitle){
            res.status(200).send("false")
        } else{ res.status(200).send('true'); }            
       } 
       catch(err){
           console.log(err);
       }
    })

    // Get all accounts
    app.get('/api/accounts',isLogin, async (req,res)=>{
        try{
            const accounts = await Account.find({_owner:req.user._id});
            res.status(200).json(accounts)
        }
        catch(err){
            res.status(500).json({err:"cannot list accounts"})
        }
    })

     // Delete one list by title 
     app.delete('/api/accounts_deleteList:id',isLogin, async (req,res) => {
        try{
            await Account.deleteOne({_id:req.params.id});
            res.send(200).json({msg:"account deleted succeffuly"})
        }
        catch(err){
            res.status(500).json({err:"cannot delete this account"})
        }
    })
};
