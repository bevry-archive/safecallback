// Define
// if err, call next, else, call fn
// next(err), err = arguments[0]
// fn(arguments)
var safeCallback = function(next,fn){
	return function(){
		var err = arguments[0]
		if(err)  return next(err)
		return fn.apply(null,Array.prototype.slice.call(arguments))
	}
}

// Export
module.exports = safeCallback