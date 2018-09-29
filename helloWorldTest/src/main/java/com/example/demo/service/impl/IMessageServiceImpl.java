package com.example.demo.service.impl;

import com.example.demo.service.IMessageService;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
// @Configuration + @Bean 实现spring的Bean配置，等价于以前在.xml文件中<bean id="" />
public class IMessageServiceImpl implements IMessageService {
    //@Bean
    @Override
    public String info() {
        return "www.example.com";
    }
}
