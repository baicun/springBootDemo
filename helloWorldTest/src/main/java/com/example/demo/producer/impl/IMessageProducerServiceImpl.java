package com.example.demo.producer.impl;

import com.example.demo.producer.IMessageProducerService;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.jms.Queue;

@Service
public class IMessageProducerServiceImpl implements IMessageProducerService {

    /*@Resource
    private JmsMessagingTemplate jmsMessagingTemplate;
    @Resource
    private Queue queue;*/

    @Override
    public void sendMessage(String msg) {
        //this.jmsMessagingTemplate.convertAndSend(this.queue, msg);
    }
}
