package com.example.demo.consumer;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

/**
 * Created by super on 2018/9/24.
 */
@Service
public class MessageConsumerService {
    /**
     * 进行消息接收处理
     * @param text
     */
    @JmsListener(destination="mldn.msg.queue")
    public void receiveMessage(String text) {
        System.out.println("接受消息：text = [" + text + "]");
    }
}
