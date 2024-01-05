const express  = require("express")

const router  = express.Router()
const movies = require('../movies.json')
const Movie  = require('../models/Movie')
const { AllWorking } = require("../Controller/Movie")


router.get('/movies',AllWorking);

// const insertMovies = async () => {
//     try {
//         const docs = await Movie.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
// };

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

module.exports = router