import express from 'express'
import Cors from 'cors'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
// App config
const app = express()
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://admin:3165651910lk@cluster0.lbct5.mongodb.net/tinderdb?retryWrites=true&w=majority`

// middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,

})

//API Endpoints
app.get('/',(req,res) => res.status(200).send("HELLO CLEVER PROGRAMMERS"));
app.post("/tinder/cards", (req,res)=>{
    const dbCard = req.body;

    Cards.create(dbCard, (err,data) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/cards', (req,res) =>{
    Cards.find((err,data) =>{
    if(err){
        res.status(500).send(err);
    }else{
        res.status(200).send(data);
    }

});
});


//Listener
app.listen(port, () => console.log(`listening on local host: ${port}`));