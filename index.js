const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());
// tourVillaDb
// IDMLIRlNob4MxbNe


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vj9mo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
  try {
    await client.connect();
    const database = client.db("tourVillaDb");
    const servicesCollecntion = database.collection("services");
    const destinationCollecntion = database.collection("destination");
    const blogCollecntion = database.collection("blog");
    
    // SERVICES POST API
    app.post('/services', async (req, res) => {
      const service = req.body;
      const result = await servicesCollecntion.insertOne(service);
      res.json(result);
      console.log(service);
      console.log(result);
    })

    // SERVICES GET API
    app.get('/destination', async (req, res) => {
      const result = await servicesCollecntion.find({}).toArray();
      res.json(result);
    })

    // DESTINATION POST API
    app.post('/destination', async (req, res) => {
      const destination = req.body;
      const result = await destinationCollecntion.insertOne(destination);
      res.json(result);
      console.log(destination);
      console.log(result);
    })

    // DESTINATION GET API
    app.get('/services', async (req, res) => {
      const result = await servicesCollecntion.find({}).toArray();
      res.json(result);
    })

    // BLOG POST API
    app.post('/destination', async (req, res) => {
      const blog = req.body;
      const result = await blogCollecntion.insertOne(blog);
      res.json(result);
      console.log(blog);
      console.log(result);
    })

    // BLOG GET API
    app.get('/blog', async (req, res) => {
      const result = await blogCollecntion.find({}).toArray();
      res.json(result);
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})