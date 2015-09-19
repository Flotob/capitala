var ascribe = { 

	request : require('request'),

	/**
	 * Return all available bearer tokens to fetch editions.
	 */
	getBearerTokens : function () {
		return { "sebastianlutter" : "78c641bd4e45ee064da4171374fca9480e9abae0"  }
	},
	/**
	 * Get the list of available editions of all available 
	 * pieces with all available bearer tokens
	 */
	getEditions : function (callback) {
		var editionsArr = [];
		// get all bearer tokens
		var bearerList = ascribe.getBearerTokens();
		var callsToWaitFor=0
		// iterate them
		for (var property in bearerList) {
		    if (bearerList.hasOwnProperty(property)) {
		    	console.log("Got user "+property+" with token "+bearerList[property])
			callsToWaitFor+=1
			ascribe.getUsersEditions(bearerList[property],
			// function to parse the response and retrieve the editions
			function (error, response, body) {
				callsToWaitFor-=1
				// check for success status code
				if ( response.statusCode === 200 ) {
					// How many pieces are there?
					var parsedBody=JSON.parse(body);
					var piecesArr=parsedBody.pieces;
					console.log("\tnum pieces:"+piecesArr.length)
					piecesArr.forEach(function (piece) {
						// check for convention of 100 editions for each piece
						if ( piece.first_edition.num_editions_available === 100) {
							console.log("\t\tid "+piece.id+" editions available "+piece.first_edition.num_editions_available)
							editionsArr.push(piece)
						} else {
							console.log("\t\tid "+piece.id+" ignored, because it has the wrong number of available editions ("+piece.first_edition.num_editions_available+")")
						}
					});
					// now we check if we are the last call that response or if there are others to wait for
					if (callsToWaitFor==0) {
						// inform the outside world that we are finished
						callback(editionsArr)
					} else {
						console.log("Still waiting for other calls to finish ("+callsToWaitFor+")")
					}
				} else { 
	                                console.log('Status:', response.statusCode);
        	                        console.log('Headers:', JSON.stringify(response.headers));
                	                console.log('Response:', body);
					console.log("\n\nError while get editions from user "+property)
				}
			});
		    }
		}
	},
	/**
	 * Retrieve data from the ascibe API
	 */
	getUsersEditions : function (token,callback) {
		ascribe.request({  
			method: 'GET',
			url: 'https://www.ascribe.io/api/pieces/',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+token
			}}, callback );	

	}

}

// Simple usage example
function callback(piecesArr) {
	console.log("Got "+piecesArr.length)
	piecesArr.forEach(function(piece){
		console.log("\tpiece with id "+piece.id+" and URL "+piece.thumbnail.url)
	});
}

// asynchron function call with callback that gets result list
ascribe.getEditions(callback)



