const Proxy = require('../models/Proxy');
const isLogin = require('../middlewares/ensureAuthentificate');

module.exports = (app) => {
  
    // Create new list of proxies
    app.post('/api/proxies_create',isLogin, async (req,res)=>{
        const {title,proxies} = req.body;
        
        /*const usedTitle = await Proxy.findOne({title});
        if(usedTitle){
            res.status(404).json({err:"title must be never used!"})
        }
        else{
           */ const proxy = new Proxy ({ title,proxies, _owner:req.user._id})
            try{
                const newProxy = await proxy.save();
                res.status(200).json(newProxy)
            }
            catch(err){
                 res.status(500).json({err:"cannot add proxies"})
            }
        //}     
    })

     // verify title
     app.get('/api/proxies_verify:title',isLogin, async (req,res)=>{
        try{
            const usedTitle = await Proxy.findOne({title:req.params.title});
         if(!usedTitle){
             res.status(200).send("false")
         } else{ res.status(200).send('true'); }            
        } 
        catch(err){
            console.log(err);
        }
     })

    // Get all proxies by user id
    app.get('/api/proxies',isLogin, async (req,res)=>{
        try{
            const proxies = await Proxy.find({_owner:req.user._id});
            res.status(200).json(proxies)
        }
        catch(err){
            res.status(500).json({err:"cannot list proxies"})
        }
    })

    // Delete one list by title 
    app.delete('/api/proxies_deleteList:id',isLogin, async (req,res) => {
        try{
            await Proxy.deleteOne({_id:req.params.id});
            res.send(200).json({msg:"proxy deleted succeffuly"})
        }
        catch(err){
            res.status(500).json({err:"cannot delete this proxy"})
        }
    })
};
