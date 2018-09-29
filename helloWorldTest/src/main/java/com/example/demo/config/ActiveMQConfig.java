package com.example.demo.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//@EnableJms
@EnableAutoConfiguration
public class ActiveMQConfig {
    /**
     * 定义 ActiveMQ 的消息发送模版处理
     * @return
     */
    /*@Bean
    public Queue queue() {
        return new ActiveMQQueue("demo.msg.queue") ;
    }*/
}
