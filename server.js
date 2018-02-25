var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/angularApp/dist'));
app.use(express.static('./public'))


mongoose.connect('mongodb://localhost/pets');
mongoose.Promise = global.Promise;

var PetSchema = new mongoose.Schema ({
	name: { type: String, required: true, minlength: 3 },
	type: { type: String, required: true, minlength: 3},
	desc: { type: String, required: true, minlength: 3 },
	skill1: { type: String },
	skill2: { type: String },
	skill3: { type: String },
	likes: { type: Number, default: ' '}
});

mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet');


//Retrieve all pets
app.get('/pets', function(req, res) {
	Pet.find({}, function(err, pets) {
		if(err){
			console.log("Returned error", err)
		} else {
			res.json({message: "Success", pets: pets})
		}
	})
})

// Create a pet
app.post('/pets', function(req, res) {
	var pet = new Pet(req.body);
	pet.save(function(err, pets) {
		if(err){
			console.log("New pet error", err)
		} else {
			res.json({message: "Successfully added pet", pets: pets})
		}
	})
})

//Retrieve a pet by id
app.get('/pets/:id', function (req, res) {
    Pet.findById({_id: req.params.id}, function (err, results) {
        if (err) {
            res.json({
                message: 'something is wrong with the ID',
                error: err
            })
        } else {
            res.json({message: 'Success', data: results})
        }
    })
})

//Delete a pet
app.delete('/pets/:id', function(req, res) {
	Pet.remove({_id: req.params.id}, function(err, results) {
		if(err){
			console.log('Delete error', err)
		} else {
			res.json({message: 'Success delete'});
		}
	})
})

//Edit a pet by id
app.put('/pets/:id', function (req, res) {
	Pet.update({_id:req.params.id}, {$set: {name: req.body.name, type: req.body.type, desc: req.body.desc, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3 }}, {multi: false}, function(err, data){
        if(err){
            res.json({message: 'Error', error:err})
        }else{
            res.json({message: 'Success', success:data})
        }
    })
})

app.put('/likes/:id', function (req, res) {
	Pet.update({_id:req.params.id}, {$set: {name: req.body.name, type: req.body.type, desc: req.body.desc, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3, likes: likes++ }}, {multi: false}, function(err, data){
        if(err){
            res.json({message: 'Error', error:err})
        }else{
            res.json({message: 'Success', success:data})
        }
    })
})


app.all("*", (req, res, next) => {
	res.sendFile(path.resolve("./angularApp/dist/index.html"))
})

app.listen(8000, function() {
	console.log("Belt app listening on port 8000");
})