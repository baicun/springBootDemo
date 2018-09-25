package com.example.demo.advice;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Aspect
@Component
public class ServiceAspect {
    private Logger log = LoggerFactory.getLogger(ServiceAspect.class);

    /**
     * 定义一个环绕通知调用
     * 注意要引入依赖包 <artifactId>spring-boot-starter-aop</artifactId>
     */
    @Around("execution (* com.example..service.*.*(..))")
    public Object arroundInvoke(ProceedingJoinPoint point) throws Throwable {
        log.info("Service-Before******执行参数：" + Arrays.toString(point.getArgs()));
        Object obj = point.proceed(point.getArgs());
        log.info("Service-After*******返回结果：" + obj);
        return obj;
    }
}
