const express = require('express')
const app = express()
const itemRoute = express.Router()

// Item model
let Item = require('../models/Item')

// Add Item
itemRoute.route('/create').post((req, res, next) => {
  Item.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Items
itemRoute.route('/').get((req, res) => {
  Item.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single item
itemRoute.route('/read/:id').get((req, res) => {
  Item.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update item
itemRoute.route('/update/:id').put((req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete item
itemRoute.route('/delete/:id').delete((req, res, next) => {
  Item.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = itemRoute
