package com.example.demo.controller;

import com.example.demo.unit.AbstractBaseControllrt;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class HelloWorldController extends AbstractBaseControllrt {

    /**
     * 首次访问测试方法
     * @return
     */
    @RequestMapping("/hello")
    public String index() {
        return "Hello World";
    }

    /**
     * 熟悉框架
     * @param msg
     * @return
     *
     */
    @RequestMapping(value = "/echo")
    public String echoParam(String msg) {
        //访问路径：http://localhost/echo?msg=baicun
        return "ECHO=[" +  msg  + "]";
    }
    @RequestMapping(value = "/echo/{msg}", method = RequestMethod.GET)
    public String echo(@PathVariable("msg") String msg) {
        //访问路径：http://localhost/echo/baicun
        return "ECHO=[" +  msg  + "]";
    }
    @RequestMapping(value = "/mul")
    public int mulParam(int param) {
        //引入依赖包spring-boot-devtools，实现懒加载
        return 9/param;
    }

    /**
     * 内置对象
     */
    @RequestMapping(value = "/object")
    public String object(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("客户端IP地址 = [" + request.getRemoteAddr() + "]");
        System.out.println("客户端响应编码 = [" + response.getCharacterEncoding() + "]");
        System.out.println("SessionID = [" + request.getSession().getId() + "]");
        System.out.println("取得真实路径 = [" + request.getServletContext().getRealPath("./upload") + "]");//springboot自己定义路径
        return "object";
    }
    /**
     * 多语言实现
     */
    @RequestMapping(value = "/message", method = RequestMethod.GET)
    public String messageNational(String mid) {
        System.out.println("访问地址 = [" + super.getMessage("member.add.action") + "]");
        return super.getMessage("welcome.msg", mid);
    }



}
