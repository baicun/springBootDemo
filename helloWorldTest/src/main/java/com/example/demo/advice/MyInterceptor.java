package com.example.demo.advice;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {
    private Logger log = LoggerFactory.getLogger(MyInterceptor.class);

    /*@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        log.info("*************拦截处理开始*************");
        log.info("*****MyInterceptor.preHandle*****" + handlerMethod.getBean().getClass().getSimpleName());
        return true;
    }
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        log.info("*****MyInterceptor.postHandle*****" + handlerMethod.getBean().getClass().getSimpleName());
        log.info("*****MyInterceptor.postHandle.modelAndView*****" + modelAndView);
    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        log.info("*****MyInterceptor.afterCompletion*****" + handlerMethod.getBean().getClass().getSimpleName());
        log.info("*************拦截处理完毕*************");
    }*/



}
