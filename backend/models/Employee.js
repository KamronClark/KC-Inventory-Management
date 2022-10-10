const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Item = new Schema({
   id: {
      type: Number
   },
   qty: {
      type: Number
   },
   name: {
      type: String
   }
}, {
   collection: 'items'
})

module.exports = mongoose.model('Item', Item)