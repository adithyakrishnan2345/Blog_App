const express = require('express')
const router = express.Router()
const Article = require('./../models/article')


router.get('/new',(req,res)=>{
res.render('articles/new',{article: new Article()})
})
router.get('/login',async(req,res)=>{
    res.render("articles/login")
})

router.get('/edit/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article: article})
})

router.get('/:slug',async (req,res)=>{
    const Articlex = await Article.findOne({slug :req.params.slug})
   
   if(Articlex == null) res.redirect('/')

    res.render('articles/show',{article:Articlex})
})

router.post('/',async (req,res,next)=>{
   req.article = new Article()
   next()
},saveArticles('new'))

router.put('/:id',async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
},saveArticles('edit'))
router.post('/login',async(req,res)=>{
    res.render("/articles/login")
})

router.delete('/:id',async (req,res)=>{
    req.article = await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
function saveArticles(path){
    return async (req,res)=>{
        let article = req.article
            article.title = req.body.title,
            article.description = req.body.description,
            article.markdown = req.body.markdown
          
          try{
          article = await article.save()
          res.redirect(`/articles/${article.slug}`)
          }catch(e){
            console.log(e)
            res.render(`articles/${path}`,{article:article})
          }
    }
}
module.exports = router