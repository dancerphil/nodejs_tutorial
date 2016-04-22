var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data/tokens.db' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});


var doc = { hello: 'world'
               , n: 5
               , today: new Date()
               , nedbIsAwesome: true
               , notthere: null
               , notToBeSaved: undefined  // Will not be saved
               , fruits: [ 'apple', 'orange', 'pear' ]
               , infos: { name: 'nedb' }
               };

db.insert(doc, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});
db.remove({ hello: 'world'}, {multi: true}, function (err, numRemoved) {
  // numRemoved = 1
});

db.count({ hello: 'world' }, function (err, docs) {
  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
  console.log(docs)
});