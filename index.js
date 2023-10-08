const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const app = express()
const methodOverride = require('method-override')
try{
mongoose.connect('mongodb+srv://AdithyaKrishnaVijay:thebatman@projectcluster.6ust34m.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
console.log("Database connection successful")
}catch(e){
    console.log(e)
}

app.set('view engine','ejs')
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res)=>{
    try{
    const articles =await Article.find().sort({createdAt:'desc'})
  res.render('articles/index',{ articles:articles});
    }catch(e)
    {
        console.log(e);
    }
})
app.get('/',(req,res)=>{
    res.render('articles/login');
})
app.use('/articles',articleRouter)
app.listen(4000, function (err){
    
    console.log("Server listening on port 4000")
});