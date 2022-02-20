const express = require('express')
const router = express.Router()
const Product = require('../model/chapter')
const UserCtrl = require('../controllers/user')


router.get('', function(req, res) {
  Product.find({}, function(err, foundChapters) {
    return res.json(foundChapters)

  })
})

router.get('/:productId', UserCtrl.authMiddleware, function(req, res) {
  const productId = req.params.productId
  
  Product.findById(productId, function(err, foundChapter) {
    if(err) {
      return res.status(422).send({errors: [{title: 'Chapter error', detail: 'Chapter not found!'}]})
    }

    return res.json(foundChapter)
  })
})

module.exports = router