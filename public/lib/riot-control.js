
/*
** This file contains all flux implementation of dispatcher
** 
** 
*/
var RiotControl = {
  _stores: [],
  addStore: function(store) {
    this._stores.push(store);
  }
};

['on','one','off','trigger'].forEach(function(api){
  RiotControl[api] = function() {
    var args = [].slice.call(arguments);
    if(api==='trigger'){
      console.log("                     ");
      console.log("***** EMITTING *****");
      console.log(args);
    }

    if(api==='on'){
      console.log("                     ");
      console.log(">>>>>>>> CAUGHT >>>>>>>>");
      console.log(args);
    }
    this._stores.forEach(function(el){
      el[api].apply(el, args);
    });
  };
});

if (typeof(module) !== 'undefined') module.exports = RiotControl;
