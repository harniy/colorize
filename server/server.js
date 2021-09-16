const { MongoClient } = require('mongodb');
const express         = require('express')
const cors            = require('cors')

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(express.json())

// Connection URL
const url = 'mongodb+srv://garniy:lucifer11@cluster0.py12x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);


// Database Name
const dbName = 'colorsDb';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = await client.db(dbName);
  const collection = await db.collection('colors');

  const info = await collection.findOne({name: 'Kirik'})
console.log(info)
  // the following code examples can be pasted here...

  return 'done.';
}

app.post('/save', async (req, res) => {
    const user = req.body.user || 'anonymous'
    const colors = req.body.colors


   try {
    await client.connect();
    const db = await client.db(dbName)
    const collection = await db.collection('colors')
    
    collection.insertOne({user: user, colors: colors})
   } catch (err) {
     console.log(err.message)
   }
})

app.get('/colors', async ( req, res ) => {

    try{
      await client.connect() 

      const db = await client.db(dbName)
      const collection = await db.collection('colors')
  
      const colors = await collection.aggregate([{ $sample: { size: 15 } }]).toArray()
  
      res.json(colors)
    } catch(err) {
      console.log(err.message)
    }
})

app.get('/', (req, res)=> {
  res.send('working GOOD')
})

app.listen(PORT, ()=>{
    console.log(`PORT: ${PORT}`)
})