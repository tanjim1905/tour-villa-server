const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
    const blogsCollecntion = database.collection("blogs");
    const allOrdersCollecntion = database.collection("allOrders");
    
    // SERVICES POST API
    app.post('/services', async (req, res) => {
      const service = req.body;
      const result = await servicesCollecntion.insertOne(service);
      res.json(result);
      console.log(service);
      console.log(result);
    })

    // SERVICES GET API
    app.get('/services', async (req, res) => {
      const result = await servicesCollecntion.find({}).toArray();
      res.json(result);
    })

    // SINGLE SERVICES GET API
    app.get('/services/details/:detailsId', async (req, res) => {
      const id = req.params.detailsId;
      const query = {_id: ObjectId(id)};
      const result = await servicesCollecntion.findOne(query);
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
    app.get('/destination', async (req, res) => {
      const result = await servicesCollecntion.find({}).toArray();
      res.json(result);
    })

    // BLOG POST API
    app.post('/blogs', async (req, res) => {
      const blog = req.body;
      const result = await blogsCollecntion.insertOne(blog);
      res.json(result);
      console.log(blog);
      console.log(result);
    })

    // BLOG GET API
    app.get('/blogs', async (req, res) => {
      const result = await blogsCollecntion.find({}).toArray();
      res.json(result);
    })

    // SINGLE BLOG GET API
    app.get('/blog/details/:blogId', async (req, res) => {
      const id = req.params.blogId;
      const query = {_id: ObjectId(id)};
      const result = await blogsCollecntion.findOne(query);
      res.json(result);
    })

    // All Orders POST API
    app.post('/allorders', async (req, res) => {
      const allorders = req.body;
      const result = await allOrdersCollecntion.insertOne(allorders);
      res.json(result);
      console.log(allorders);
      console.log(result);
    })

    // BLOG GET API
    app.get('/allorders', async (req, res) => {
      const result = await allOrdersCollecntion.find({}).toArray();
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