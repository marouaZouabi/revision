var express = require('express');
var router = express.Router();
var P = require('../model/productSchema.js');

/* GET product listing. */
router.get('/', function(req, res, next) {
    P.find(function(err,data){
        if(err) throw err;
        res.render("product-liste.twig", {data});
    })
});

/*Delate product by ID*/
router.get('/delete/:id', function(req,res){
    var idp = req.params.id;
    // console.log.id;
    P.findOneAndRemove ({_id : idp}, function(err){
      res.redirect('/product/')
  
    })
  });

  /*show from user */
router.get('/showform', function(req, res){
    res.render("productAdd.twig");
  
    });

  /*ajouter dans bd */
router.post('/addproduct', function(req,res){
    //console.log(req.body.nom)
      prod= new P (req.body);
      prod.save(()=>{
      res.redirect('/product/')
      })
      // res.end;
  
    });

//     /*update product by ID*/
// router.get('/update/:id', function(req,res){
//     var idp = req.params.id;
//     // console.log.id;
//     P.findOneAndUpdate ({_id : idp}, function(err){
//       res.send('/showform/')
  
//     })
//   });

  //update produit
  router.post('/updateaction',(req,res)=>{
    var id=req.body.id;
    P.findById(id,(err,data)=>{
 
        data=Object.assign(data,req.body)
       // res.json(data);
        data.save(()=>{
           res.redirect('/product')
        })
    })
})

router.get('/update/:id',(req,res)=>{
    // res.json(req.params.id);
    var idp=req.params.id;
     P.find({_id : idp}, function(err,data){
         res.render('update.twig',{data})
     })
 });



   //detail produit
  
 router.get('/detail/:id',function(req,res){
    var idp=req.params.id;
  //console.log(idp);
P.find({_id:idp},function(err,data){
        res.render("detailproduct.twig",{data})
})


})

module.exports = router;
