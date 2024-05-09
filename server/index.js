const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify jwt middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  // if (!token) return res.status(401).send({ message: 'Access Denied!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: 'Not Authorized' });
    }
    console.log('values in the token: ', decoded);
    req.decodedUser = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.chn7ebi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const jobsCollection = client.db('soloSphereDB').collection('jobs');
    const bidsCollection = client.db('soloSphereDB').collection('bids');

    // Generate JWT
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '365d' });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    app.post('/logout', async (req, res) => {
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: 0,
        })
        .send({ success: true });
    });

    // Get all jobs data
    app.get('/jobs', async (req, res) => {
      const jobs = await jobsCollection.find().toArray();
      res.send(jobs);
    });

    // get a job by _id
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const job = await jobsCollection.findOne(query);
      res.send(job);
    });

    // get jobs by email
    app.get('/my-jobs', verifyToken, async (req, res) => {
      // console.log('user from the valid token, inside /my-jobs api', req.decodedUser);
      if (req.query?.email !== req.decodedUser?.email) return res.status(403).send({ message: 'Forbidden Access' });
      const email = req.query?.email;
      const query = { 'buyer.email': email };
      const jobs = await jobsCollection.find(query).toArray();
      res.send(jobs);
    });

    // save a job in db
    app.post('/add-job', async (req, res) => {
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    });

    // Delete a job by id.
    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });

    // update a job by id
    app.put('/update-job/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const jobData = req.body;
      const result = await jobsCollection.updateOne(filter, { $set: jobData }, { upsert: true });
      res.send(result);
    });

    // save a bid data in db
    app.post('/bid', async (req, res) => {
      const bidData = req.body;
      console.log(bidData);
      const result = await bidsCollection.insertOne(bidData);
      res.send(result);
    });

    // get all bids data by email
    app.get('/my-bids', verifyToken, async (req, res) => {
      if (req.query?.email !== req.decodedUser?.email) return res.status(403).send({ message: 'Forbidden Access' });
      const email = req.query?.email;
      const query = { email };
      const bids = await bidsCollection.find(query).toArray();
      res.send(bids);
    });

    //get all bid-requests data by email
    app.get('/bid-requests', verifyToken, async (req, res) => {
      if (req.query?.email !== req.decodedUser?.email) return res.status(403).send({ message: 'Forbidden Access' });
      const email = req.query?.email;
      const query = { 'buyer.email': email };
      const bids = await bidsCollection.find(query).toArray();
      res.send(bids);
    });

    // patch a bid by id
    app.patch('/bids/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const bidData = req.body;
      const updateDoc = { $set: bidData };
      const result = await bidsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World SoloSphere Here!');
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
