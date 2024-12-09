const path=require('path')
const modelPath=require(path.join(__dirname,'..','Model','projects.js'))
exports.createProject=(req,res)=>{ 
    console.log("in controller task")
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a modelPath
    const Data ={
        name: req.body.name,
        color: req.body.color,
        is_favorite: req.body.is_favorite || false
    };

    // Save modelPath in the database
    modelPath.createProject(Data, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the project."
        });
        else res.send(data);
    });


};  
exports.getAllData=(req,res)=>{ 
    modelPath.getAllData((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving modelPath."
          });
        else res.send(data);
      });
    
}
exports.updateById=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    } 
    const Data={ 
        name: req.body.name,
        color: req.body.color,
        is_favorite: req.body.is_favorite,
        id:req.params.id
    }
    // console.log(req.body);

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

