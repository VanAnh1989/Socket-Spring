console.log("done");
var socket;
var stomClient=null;
var userId="vanAnh";
//(function(){
//	window.addEventListener('load',()=>{
//		socket = new SockJS("/chat");
//	});
//})();

function connectSocket(){
	socket = new SockJS("/chat");
	stompClient = Stomp.over(socket);
	stompClient.connect({} , (frame) => {
		stompClient.subscribe('/all/message/'+userId , (message) => {
			console.log(JSON.parse(message.body));
			let el = document.getElementById("list");
			let el1 = document.createElement('p');
			let text = document.createTextNode(JSON.parse(message.body).message);
			el1.appendChild(text);
			el.appendChild(el1);
		})
	});
}

function sendMessage(){
	stompClient.send('/sendmessage/'+userId, {} ,JSON.stringify({'message' : getMess()}))
}

function getMess(){
	let mess = document.getElementById('mess').value;
	return mess;
}
function setNewUser(){
		socket.close();
		userId = document.getElementById('user').value;
		connectSocket();
}