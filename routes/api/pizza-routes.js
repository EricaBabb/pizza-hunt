const router = require('express').Router();
const {
    //Instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destructure the method names out of the imported object and use those names directly.
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
  } = require('../../controllers/pizza-controller');

// Set up GET all and POST at /api/pizzas
// /api/pizzas
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);
  //We set up the callback functions to accept req and res as parameters; that way we can just use the controller method name of the callback function

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
// /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;