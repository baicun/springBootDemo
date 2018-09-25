package com.example.demo.config;

import com.example.demo.advice.MyInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
@Configuration
public class MyWebApplicationConfig extends WebMvcConfigurerAdapter { // 定义MVC配置
    /**
     * 进行拦截器注册处理操作
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");// 匹配路径
        super.addInterceptors(registry);
    }
}
