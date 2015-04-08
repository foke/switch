'use strict';

var express 	= require('express');
var sys 		= require('sys');
var exec 		= require('child_process').exec;
var router 		= express.Router();

router.get('/on/:id', function(req, res) {
	exec('tdtool --on ' + req.params.id, puts);
  	
  	res.jsonp({'status':'ok'});
});

router.get('/off/:id', function(req, res) {
	exec('tdtool --off ' + req.params.id, puts);

  	res.jsonp({'status':'ok'});
});

router.get('/list', function(req, res) {
	var propArr;

	exec('tdtool --list-devices', function (error, stdout, stderr) { 				
		try {
			// Warning: This is a mess! Sorry, just had to try a more functional approach
			res.jsonp((function splitItems (items) {
				if (!items.length || !items[0].length) {
					return [];
				}
				
				return [((function splitProperties (props, obj) {
					if (!props.length) {
						return obj;
					}

					obj[props[0].split('=')[0]] = props[0].split('=')[1];

					return splitProperties(props.slice(1, props.length), obj);

				})(items[0].split('\t'), {}))].concat(splitItems(items.slice(1, items.length)));

			})(stdout.replace(/^\s+|\s+$/g, '').split('\n')));	// regex trims space chars including newlines

		} catch (e) {
			console.error(e);
  			res.jsonp([]);
		}		
	});	
});

function puts (error, stdout, stderr) { 
	sys.puts(stdout);
}

module.exports = router;
