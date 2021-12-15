module.exports = app => {
    const goals = require("../controllers/app.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", goals.create);
  
    // Retrieve all Tutorials
    router.get("/", goals.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", goals.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", goals.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", goals.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", goals.delete);
  
    // Delete all Tutorials
    router.delete("/", goals.deleteAll);
  
    app.use('/api/goals', router);
  };