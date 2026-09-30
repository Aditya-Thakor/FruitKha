import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://adityagithub27x:Aditya%4027x@cluster0.uenvt9n.mongodb.net/FruitkhaDB').then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


const fruitSchema = new mongoose.Schema({
  name: String,
  id: Number,
  family: String,
  order: String,
  genus: String,
  image: String,
  description: String,
  nutritions: {
    calories: Number,
    fat: Number,
    sugar: Number,
    carbohydrates: Number,
    protein: Number
  }
});

const Fruit = mongoose.model("Fruit", fruitSchema);


app.get("/fruitkha/fruits", async (req, res) => {
  const fruits = await Fruit.find();
  res.json(fruits);
});

app.post('/fruitkha/fruits/add-fruit', async(req,res)=>{
    console.log(req.body);
    
    const add = await Fruit(req.body);
    await add.save();
    res.json(add);
})

app.get('/fruitkha/api/fruits', async (req, res) => {
    try {
        await fetch('https://www.fruityvice.com/api/fruit/all').then(response => response.json()).then((data) => {
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).json({ message: "Error at getting fruits data ", error })
    }
})

app.listen(5200, () => {
    console.log("server started on localhost: 5200");
})