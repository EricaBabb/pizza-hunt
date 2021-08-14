const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    // callback function for the GET /api/pizzas rout
    getAllPizza(req, res) {
        // uses the Mongoose .find() method, much like the Sequelize .findAll() method
        Pizza.find({})
        //we dont want to just see the id of the comments
        .populate({
          path: 'comments',
          //tells mongoose we don't care about the __v field on comments
          select: '-__v'
        })
        //-__v for field on the pizza as well
        .select('-__v')
        //Newest pizza returns first
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one pizza by id
    getPizzaById({ params }, res) {
        //uses the Mongoose .findOne() method to find a single pizza by its _id
        // Instead of accessing the entire req, we've destructured params out of it
        Pizza.findOne({ _id: params.id })
        //also want to return comments when GET
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },


    // createPizza
    //we destructure the body out of the Express.js req object because we don't any previous data
createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },


  // update pizza by id
updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    //Setting new: true we are telling Mongoose to return the new version of the document
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
  // delete pizza
deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
  }

module.exports = pizzaController;