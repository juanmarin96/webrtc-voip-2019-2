var socket = new JsSIP.WebSocketInterface('wss://192.168.1.7:8089/ws');

var configuration = {
  sockets  : [ socket ],
  uri      : 'sip:webrtc_client@192.168.1.7:5060',
  password : 'webrtc_client'
};

var coolPhone = new JsSIP.UA(configuration);

coolPhone.start();

coolPhone.on('connected', function(e){
    console.log("conectado")
    console.log(e)
});

coolPhone.on('registered', function(e){
    console.log("REGISTERED") 
    console.log(e) 

});
coolPhone.on('unregistered', function(e){
    console.log("Unregistered")  
    console.log(e) 
});
coolPhone.on('registrationFailed', function(e){ 
    console.log("REGISTERED failed") 
    console.log(e) 
});


coolPhone.on('newMessage', function(e){
    console.log("Llego esto") 
    console.log(e)
});


// Register callbacks to desired call events
var eventHandlers = {
    'progress': function(e) {
      console.log('call is in progress');
    },
    'failed': function(e) {
        console.log(e)
        console.log('call failed with cause: '+ e.cause);
    },
    'ended': function(e) {
      console.log('call ended with cause: '+ e.data.cause);
    },
    'confirmed': function(e) {
      console.log('call confirmed');
    }
  };
  
  var options = {
    'eventHandlers'    : eventHandlers,
    'mediaConstraints' : { 'audio': true, 'video': false }
  };
  

  var text = 'Hello Bob!';

  coolPhone.sendMessage('sip:webrtc_client@192.168.1.7:5060', text);
