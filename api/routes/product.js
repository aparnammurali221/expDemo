const Product = require('../../models/product')

module.exports = function(router){
  
    router.get('/product', function(req, res){
      //  res.send("Hello Dhivya")

        Product.find({}, (err, product) =>{
            //check if error was found or not
            if(err){
                res.json({success: false, message: err}) // returns error message
            }
            else {
                // check if product were found in database
                if(!product){
                    res.json({success: false, message: 'No Product Found'})
                }
                else{
                    res.json({success: true, product: product}) // return success message
                }
            }
        })
    })

    //POST
    router.post('/product', function(req, res){
        let note = new Product(req.body)
        note.save(function(err, note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })

    // Put
    router.put('/updateProduct', (req, res)=>{
        if(!req.body._id){
            res.json({success: false, message: 'No Product id provided'})
        }
        else{
            Product.findOne({_id: req.body._id}, (err, product)=>{
                if(err){
                    res.json({sucess: false, message: 'Not a valid product id'})
                }
                else{
                    product.Name = req.body.Name;
                    product.Desc = req.body.Desc;
                    product.Price = req.body.Price;
                    product.ManuDate = req.body.ManuDate;
                    product.ExpirDate = req.body.ExpirDate;
                    product.save((err)=>{
                        if(err){
                            res.json({success: false, message: err})
                    }else{
                        res.json({success: true, message: 'Product Updated'})
                    }
                    })

                }
            })
        }
    })

    //Delete
    router.delete('/deleteProduct/:id', (req, res)=>{
        //check id id was provided in parameters
        if(!req.params.id){
            res.json({success: false, message: 'No id provided'})
        }
    else{
        //check if id is found in database
        Product.findOne({_id: req.params.id}, (err, product)=>{
            //check if error was found
            if(err){
                res.json({success: false, message: 'Invalid id'})// return error message

            }
            else{
                // remove the details
                product.remove((err)=>{
                    if(err){
                        res.json({success: false, message: err}) // return error message
                    }
                    else{
                        res.json({success: true, message: 'Product Deleted'})  // return success message
                    }
                })
            }
        })
        
    }    
})
}