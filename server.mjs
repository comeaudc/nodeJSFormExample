// Imports
import express from 'express';
import bodyParser from 'body-parser';
import animalRoutes from './routes/animalRoutes.mjs';
import fs from 'fs';

// Initialize Express
const app = express();
let PORT = 3000;

// Servin static files
app.use(express.static('./styles'));

//Body Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//View Engine
app.engine('file', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    if (options.allAnimals) {
      let result = '';

      options.allAnimals.forEach((el) => {
        result += `<h2>Name: ${el.name}<h2><h3>Species: ${el.species}</h3><h3>Age: ${el.age}</h3><a href="/api/animal/${el.id}"><button>More Info</button></a><br><br>`;
      });

      const rendered = content.toString().replace('#content#', result);

      return callback(null, rendered);
    } else {
      const rendered = content
        .toString()
        .replaceAll('#name#', `${options.name}`)
        .replace('#species#', `${options.species}`)
        .replace('#age#', options.age)
        .replace('#id#', options.id);

      return callback(null, rendered);
    }
  });
});

app.set('views', './views'); // specify the views directory
app.set('view engine', 'file'); // register the template engine

// Routes
app.use('/api/animal', animalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
