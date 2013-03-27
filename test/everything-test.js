// Import
var expect = require('chai').expect
var joe = require('joe')
var safeCallback = require('../lib/safecallback')

// Prepare
var throwError = function(handler){
	return handler(new Error(),'data')
}
var throwNoError = function(handler){
	return handler(null,'my data')
}

// Test
joe.describe('safecallback',function(describe,it){
	it('should handle errors correctly',function(done){
		var next = function(err,data){
			expect(err).to.exist
			expect(data).to.not.exist
			done()
		}
		throwError(safeCallback(next,function(err,data){
			throw 'should not reach here'
		}));
	})
	it('should handle no-errors correctly',function(done){
		var next = function(err,data){
			throw 'should not reach here'
		}
		throwNoError(safeCallback(next,function(err,data){
			expect(err).to.eql(null)
			expect(data).to.eql('my data')
			done()
		}));
	})
})