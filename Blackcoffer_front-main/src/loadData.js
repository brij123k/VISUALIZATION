// const { MongoClient } = require("mongodb");
// // Replace the uri string with your connection string.
// const uri =
//   "mongodb+srv://Blackcoffer:Black2010@dashboard.gm2mtrv.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);
// export default async function getData() {
//   try {
//     const database = client.db("Blackcoffer");
//     const movies = database.collection("user");

//     const query = {};
//     const movie = await movies.find(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
