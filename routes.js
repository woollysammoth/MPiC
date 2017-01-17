var fs = require("fs");

function createDir(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST'){
            	cb(null, false); // ignore the error if the folder already exists
            }else{
				cb(err, false);
            }
        } else{
        	cb(null, true); // successfully created folder
    	}
    });
}

var Routes = {
	getSets: function(){
		//Get all sample set folders on USB drive
		fs.readdir("/home/pi/usb", function(err, sets){
			res.json({
				success: err,
				data: sets
			});
		});
	},
	createSet: function(req, res){
		//Create properly named sample set folder
		var name = [req.body.setNumber, req.body.setName].join(" ");
		var dir = ["/home/pi/usb/", name].join("");

		createDir(dir, function(err, created) {
			//If sample set directory was created, add definition file
			if(created){
				fs.writeFile(dir + "/definition.txt", "s_%midinote_%velocity.wav", function(){
					res.json({
						success: !!!err,
						name: name,
						created: created
					});
				});
			}else{
				res.json({
					success: !!!err,
					created: false
				});
			}
		});
	},
	createSample: function(req, res){
		//Decode audio blob
		var buf = new Buffer(req.body.blob, 'base64');

		//Save audio blob in correct folder on mounted USB drive
		var folder = [req.body.setNumber, req.body.setName].join(" ");
		var file = ["s", req.body.note, req.body.velocity].join("_");
		var location = ["/home/pi/usb/", folder, "/", file, ".wav"].join("");

		fs.writeFile(location, buf, function(err) {
			res.json({
				success: !!!err,
				location: location
			});
			return;
		});
	},
	increasePreset: function(req, res){
		GLOBAL.sbpy.send("1");
	},
	decreasePreset: function(req, res){
		GLOBAL.sbpy.send("-1");
	}
}

module.exports = Routes;