package com.example.registerapp.controller;

import com.example.registerapp.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message recievePublicMessage(@Payload Message message)
    {
        return message;
    }

    @MessageMapping("/private-message")
    public Message recievePrivateMessage(@Payload Message message)
    {

        simpMessagingTemplate.convertAndSendToUser(message.getRecieverName(),"/private",message);
        return message;

    }

}