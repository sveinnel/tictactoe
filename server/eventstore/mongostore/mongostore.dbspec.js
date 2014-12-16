
var mongoStore = require('./mongostore');
var should = require('should');

var storeSchema = require('./storeschema');

describe('Mongodb store', function() {

  beforeEach(function(){
    storeSchema.remove().exec();
  });

  it('Should return empty array for unknown id', function() {

    var store = mongoStore();

    store.loadEvents('12345').then(function(err, loadedEvents){
      should(loadedEvents.length).be.exactly(0);
      should(loadedEvents).be.instanceof(Array);
      //should(loadedEvents).eql(['A']);

    }, function(err){
      assert.fail('Load events failure!', err);

    });

  });

  it('Should return events previously stored', function(done) {

    var store = mongoStore();

    store.storeEvents('12345', [{"id":"1"}]).then(function(){
      store.loadEvents('12345').then(function(loadedEvents){

        try {
          should(loadedEvents[0].id).be.exactly('1');
        } catch (e) {
          return done(e);
        }
        done();
      });
    });

  });


  it('should append stored events to events previously stored',function(done){
    var store = mongoStore();

    store.storeEvents('12345', [{"id":"1"}]).then(function(){
      store.storeEvents('12345', [{"id":"2"}]).then(function(){
        store.loadEvents('12345').then(function(loadedEvents){
          try {
            should(loadedEvents[0].id).be.exactly('1');
            should(loadedEvents[1].id).be.exactly('2');
          } catch (e) {
            return done(e);
          }
          done();
        });
      });
    });
  });
});

