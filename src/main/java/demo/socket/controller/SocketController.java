package demo.socket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.socket.model.CustomMessage;

@RestController
public class SocketController {
	
	@RequestMapping("/hello")
	public String getMessage() {
		return "Well come to spring";
	}
	
	@MessageMapping("/sendmessage/{userId}")
	@SendTo("/all/message/{userId}")
	public CustomMessage getSendMessage(CustomMessage mess) throws InterruptedException {
		System.out.println(mess);
		Thread.sleep(500);
		CustomMessage custom = new CustomMessage();
		custom.setMessage(mess.getMessage());
		return custom;
	}
	
}
