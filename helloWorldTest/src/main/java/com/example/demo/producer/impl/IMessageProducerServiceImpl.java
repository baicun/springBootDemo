package com.example.demo.producer.impl;

import com.example.demo.producer.IMessageProducerService;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Queue;

/**
 * Created by super on 2018/9/24.
 */
@Service
public class IMessageProducerServiceImpl implements IMessageProducerService {

    @Resource
    private JmsMessagingTemplate jmsMessagingTemplate;
    @Resource
    private Queue queue;
    @Override
    public void sendMessage(String msg) {
        this.jmsMessagingTemplate.convertAndSend(String.valueOf(queue), msg);
    }
}
