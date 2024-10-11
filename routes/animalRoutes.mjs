import express from 'express';
import animals from '../data/data.mjs';
const router = express.Router();

// Create / Read
//  /api/animal - POST
router
  .route('/')
  .post((req, res) => {
    if (req.body.name && req.body.species && req.body.age) {
      let newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age,
      };

      animals.push(newAnimal);

      res.render('show', newAnimal);
    } else {
      res.send(`Incorrect Info`);
    }
  })
  .get((req, res) => {
    let options = {
      allAnimals: animals,
    };
    res.render('showAll', options);
  });

//   New Animal Form
router.get('/new', (req, res) => {
  res.render('newAnimal');
});

// Update / Delete /Show
router
  .route('/:id')
  .patch((req, res) => {
    console.log(req.body);
    const animal = animals.find((a, i) => {
      if (a.id == req.params.id) {
        for (const key in req.body) {
          animals[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (animal) res.json(animal);
    else res.send('Incorrect ID');
  })
  .delete((req, res) => {
    const animal = animals.find((a, i) => {
      if (a.id == req.params.id) {
        animals.splice(i, 1);
        return true;
      }
    });

    if (animal) res.json(animal);
    else res.send('Incorrect ID');
  })
  .get((req, res) => {
    const animal = animals.find((a, i) => {
      if (a.id == req.params.id) {
        return true;
      }
    });

    let options = {
      id: animal.id,
      name: animal.name,
      species: animal.species,
      age: animal.age,
    };

    if (animal) res.render('show', options);
    else res.send('Incorrect ID');
  });

export default router;
