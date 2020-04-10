module.exports = app => {
    const nlp = require("../controllers/nlp.controller.js");

    // Create a new Customer
    app.post("/process", nlp.process);

    // Retrieve all Customers
    app.get("/words/:filename/:sort?/:order?", nlp.find);

};
