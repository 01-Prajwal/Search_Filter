const Movie = require("../models/Movie");


exports.AllWorking=async(req,res)=>{
try {
    const page  = parseInt(req.query.page)-1||0;
    const limit  = parseInt(req.query.limit)||5;
    const search  = parseInt(req.query.search)||"";
    let sort  = parseInt(req.query.sort)||"rating";
    // const genre  = parseInt(req.query.genre)||"All";
    let genre = req.query.genre || "All";

    const genreOptions = [
        "Action",
        "Romance",
        "Fantasy",
        "Drama",
        "Crime",
        "Adventure",
        "Thriller",
        "Sci-fi",
        "Music",
        "Family",
    ];
    genre === "All"
    ? (genre = [...genreOptions])
    : (genre = req.query.genre.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

let sortBy = {};
if (sort[1]) {
    sortBy[sort[0]] = sort[1];
} else {
    sortBy[sort[0]] = "asc";
}

const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
    .where("genre")
    .in([...genre])
    .sort(sortBy)
    .skip(page * limit)
    .limit(limit);

const total = await Movie.countDocuments({
    genre: { $in: [...genre] },
    name: { $regex: search, $options: "i" },
});

const response = {
    error: false,
    total,
    page: page + 1,
    limit,
    genres: genreOptions,
    movies,
};

res.status(200).json(response);


    
} catch (error) {
    console.log(error);
    res.status(404).json(error)
    
}
}

