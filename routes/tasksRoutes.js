const Task = require('../models/Task');
const isLogin = require('../middlewares/ensureAuthentificate');

module.exports = (app) => {

    /* Create new task
    app.post('/api/tasks_create',isLogin, async (req,res) => {
        
        const {status,website,account} = req.body;
        const task = new Task ({ status, website, account, _owner:req.user.id,createdDate:Date.now() })

        try{
            await task.save();
            res.status(200).json({msg:"task added successfully"})
        }
        catch(err){
            res.status(500).json({err:"cannot add task"})
        }
    })
    */

    // Route to auto generate tasks
    app.post('/api/tasks_generatetasks',isLogin , async(req,res) => {
        const {website,status,profiles} = req.body

        // prepare tasks
        let tasks = []
        for(let i = 0; i < profiles.length;i++){
            tasks.push(new Task({   website,
                                    status,
                                    account:profiles[i],
                                    _owner:req.user.id,
                                    createdDate:Date.now()
                                }))
        }
        
        // function generate tasks
        const generateTasks =  async () =>  {
            try{
                await Task.insertMany(tasks) 
                res.status(200).json({msg:"tasks generated successfully"})    
            }
            catch(err){
                res.status(500).json({err:"cannot generatetasks"})
            }
        }
        // commit 
        generateTasks();

    })

    // Get all tasks
    app.get('/api/tasks',isLogin, async (req,res) => {
        try{
            const tasks = await Task.find({_owner:req.user.id });
            res.status(200).json(tasks)
        }
        catch(err){
            res.status(500).json({err:"cannot list tasks"})
        }
    })

    // Update one task
    app.put('/api/tasks_updateTask',isLogin, async (req,res) => {
            const {_id,status} = req.body;
        try{
            const tasks = await Task.updateOne({_id},req.body)
            res.status(200).json(tasks)
        }
        catch(err){
            res.status(500).json({err:"cannot update task"})
        }
    })
      // Delete one task ********************************************
      app.delete('/api/tasks_deleteTask:id',isLogin, async (req,res) => {      
        try{
            await Task.deleteOne({_id:req.params.id})
            res.send(200).json({msg:"account deleted succeffuly"})
        }
        catch(err){
            res.status(500).json({err:"cannot delete this account"})
        }
    }) // Delete one task ********************************************
    
    /* Delete tasks by user id
    app.delete('/api/tasks_deleteTasks', async (req,res) => {
        const {_owner}=req.body;
      try{
          await Task.deleteOne({_owner});
          res.send(200).json({msg:"account deleted succeffuly"})
      }
      catch(err){
          res.status(500).json({err:"cannot delete this account"})
      }
  })*/
};