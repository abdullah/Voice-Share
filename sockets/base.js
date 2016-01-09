module.exports = function (io) { 

	function makeid()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	function randomKey(obj) {
	    var ret;
	    var c = 0;
	    for (var key in obj)
	        if (Math.random() < 1/++c)
	           ret = key;
	    return ret;
	}

	var voices =  [];
	var keys = [];
	var uniq;
	var deleted;
	var keyStore ;
	io.on('connection', function (socket) {
	 socket.on('first', function (data) {
	    if (data) {
	  		socket.emit('first', { news: keys});
	    };
	  });

	 socket.on('getVoice', function (data) {
	 	var rnd = randomKey(voices);
	 	if (voices[data.data]) {
	 		voice = voices[data.data];
	 		keyStore = data.data;
	 	}else{
	 		voice = voices[rnd];
	 		keyStore = rnd;

	 	}
	 	console.log(keyStore);
	  	socket.emit('getVoice', { news: voice , rnd: keyStore});
	  });
	  socket.on('record', function (data) {
	  	 uniq = makeid();
		  	if (keys.length >= 43) {
		  		voices.shift()
		  		deleted = keys.shift()
		  		voices[uniq] = data.my ;
			  	keys.push(uniq)
		  	}else{
			  	voices[uniq] = data.my ;
			  	keys.push(uniq)
		  	}
  			socket.broadcast.emit('news', { news: uniq ,home : false , deleted : deleted});
  			socket.emit('newsHome', { news: uniq , home : true ,deleted : deleted});
	  });
	});

}