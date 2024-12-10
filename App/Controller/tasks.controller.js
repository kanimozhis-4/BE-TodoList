const path = require("path");
const modelPath = require(path.join(__dirname, "..", "Model", "tasks.model.js"));
exports.createTask = (req, res) => {
  const requiredKeys = ["content", "description", "due_date", "project_id"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }
  const Data = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || false,
    project_id: req.body.project_id,
  };
  modelPath.createTask(Data, (err, data) => {
    if (err)
      res.status(500).send({
        message:`error in createTask :${err}`,
      });
    res.send(data);
  });
};
exports.updateById = (req, res) => {
  const requiredKeys = ["content", "description", "due_date", "project_id"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }
  const Data = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || false,
    project_id: req.body.project_id,
    id:req.params.id
  };
  modelPath.updateById(Data, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found id: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `error in updateById : ${err}`,
        });
      }
    } 
    res.send(data);
  });
};
exports.getById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  modelPath.getById(Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found id: ${Id}.`,
        });
      } else {
        return res.status(500).send({
          message: `Error in getById :${err}`,
        });
      }
    }
    res.send(data); 
  });
};
exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  modelPath.deleteById(Id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found with id: ${Id}.`,
        });
      } else {
        return res.status(500).send({
          message: `Error deleteById in ${err}.`,
        });
      }
    }
    res.send(data); 
  });
};
exports.deleteAllData = (req, res) => {
  modelPath.deleteAllData((err, data) => {
    if (err)
      res.status(500).send({
        message:`error in deleteAllData : ${err}`,
      });
    else res.send(data);
  });
};
const validatePayload = (payload, requiredKeys) => {
  const payloadKeys = new Set(Object.keys(payload));
  const missingKeys = requiredKeys.filter(key => !payloadKeys.has(key));
  return missingKeys.length > 0 ? missingKeys : null;
};
