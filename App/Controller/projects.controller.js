const path = require("path");
const modelPath = require(path.join(__dirname, "..", "Model", "projects.model.js"));
exports.createProject = (req, res) => {
  const requiredKeys = ["name", "color"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }
  const Data = {
    name: req.body.name,
    color: req.body.color,
    is_favorite: req.body.is_favorite || false,
  };
  modelPath.createProject(Data, (err, data) => {
    if (err)
      res.status(500).send({
        message:`error in createProject : ${err}`,
      });
    else res.send(data);
  });
};
exports.getAllData = (req, res) => {
  modelPath.getAllData((err, data) => {
    if (err)
      res.status(500).send({
        message:`error in getAllData : ${err}`,
      });
    else res.send(data);
  });
};
exports.updateById = (req, res) => {
  const requiredKeys = ["name", "color"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }
  const Data = {
    name: req.body.name,
    color: req.body.color,
    is_favorite: req.body.is_favorite || false,
    id: req.params.id,
  };

  modelPath.updateById(Data, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found id : ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error in updateById as ${err}`,
        });
      }
    } else res.send(data);
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
            message: `Not found id : ${req.params.id}.`
        });
      } else {
        return res.status(500).send({
          message: `Error retrieving ID ${Id}: ${err}`,
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
            message: `Not found id : ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          message: `Error in deleteById: ${err}.`,
        });
      }
    }
    res.send(data); 
  });
};
exports.deleteAllData = (req, res) => {
  modelPath.deleteAllData((err, data) => {
    if (err){
      res.status(500).send({
        message:`error in deleteAllData : ${err}`,
      }); 
    }
    res.send(data);
   
  });
};
const validatePayload = (payload, requiredKeys) => {
  const payloadKeys = new Set(Object.keys(payload));
  const missingKeys = requiredKeys.filter(key => !payloadKeys.has(key));
  return missingKeys.length > 0 ? missingKeys : null;
};