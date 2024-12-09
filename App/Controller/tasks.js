const path=require('path')
const modelPath=require(path.join(__dirname,'..','Model','tasks.js'))
exports.createTask=(req,res)=>{
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a modelPath
    const Data = {
        content: req.body.content,         
        description: req.body.description, 
        due_date: req.body.due_date,       
        is_completed: req.body.is_completed || false, 
        project_id: req.body.project_id  
    };

    // Save modelPath in the database
    modelPath.createTask(Data, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the project."
        });
        else res.send(data);
    });


};  
exports.updateById=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    } 
    const Data={ 
        content: req.body.content,
        description: req.body.description,
        due_date: req.body.due_date,
        is_completed: req.body.is_completed,
        id:req.params.id
    }
    console.log(req.body);

  modelPath.updateById(Data,(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found modelPath with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating modelPath with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );

} 
exports.getById=(req,res)=>{
    const Id=req.params.id
    // console.log(req.body);
    if (!Id) {
        return res.status(400).send({
            message: "ID is required!",
        });
    }

    modelPath.getById(Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found modelPath with id ${Id}.`,
                });
            } else {
                return res.status(500).send({
                    message: `Error retrieving modelPath with id ${Id}.`,
                });
            }
        }
        res.send(data);  // Return success response
    });
} 
exports.deleteById=(req,res)=>{
    const Id=req.params.id
    // console.log(req.body);
    if (!Id) {
        return res.status(400).send({
            message: "ID is required!",
        });
    }

    modelPath.deleteById(Id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found modelPath with id ${Id}.`,
                });
            } else {
                return res.status(500).send({
                    message: `Error retrieving modelPath with id ${err}.`,
                });
            }
        }
        res.send(data);  // Return success response
    });
} 
exports.deleteAllData=(req,res)=>{
    

    modelPath.deleteAllData(Id, (err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving modelPath."
            });
          else res.send(data);
        // });
       // Return success response
    });
} 

