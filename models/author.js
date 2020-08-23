const mongoose = require('mongoose');
const BOOK = require('./book');

const authorSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }
});

authorSchema.pre('remove',function(next){
    BOOK.find({author: this.id},(err,books)=>{
        if(err) next(err);
        else if(books.length > 0){
            next(new Error('This author has books still.'))
        }
        else{
            next()
        }
    })
})

module.exports = mongoose.model('Author',authorSchema);