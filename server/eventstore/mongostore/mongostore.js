var Store = require('./storeschema');
var q = require('q');

module.exports = function(){
  return {
    loadEvents : function(id){
      var deferred = q.defer();
      Store.findOne({id:id}, function(err, stream){
        if(err){
          deferred.reject(err);
        }
        deferred.resolve(stream && stream.events || []);
      });
      return deferred.promise;
    },
    storeEvents: function(id, events){
      var deferred = q.defer();

      Store.findOne({id:id}, function(err, stream) {
        if(err) { deferred.reject(err); }

        if(!stream){
          Store.create({id:id, events: events}, function(err, thing) {
            if(err) { deferred.reject(err); }
            deferred.resolve(thing);
          });

        } else{
          stream.events = stream.events.concat(events);

          stream.save(function(err){
            if(err) { deferred.reject(err); }
            deferred.resolve(stream.events);
          })
        }
      });

      return deferred.promise;
    }
  }
};
