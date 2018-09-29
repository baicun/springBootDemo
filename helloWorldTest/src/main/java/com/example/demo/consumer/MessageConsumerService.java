package com.example.demo.consumer;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;
@Service
public class MessageConsumerService {

    /**
     * 消费者监听控制
     * @param text
     */
    /*@JmsListener(destination="study.msg.queue")
    public void receiveMessage(String text) {    // 进行消息接收处理
        System.out.println("【*** 接收消息 ***】" + text);
    }*/
}
