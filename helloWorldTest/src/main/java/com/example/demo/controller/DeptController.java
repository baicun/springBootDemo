package com.example.demo.controller;

import com.example.demo.service.DeptService;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class DeptController {

    @Resource
    private DeptService deptService;
    @Resource
    private DiscoveryClient client ;    // 进行Eureka的发现服务

    @RequestMapping("/dept/discover")
    public Object discover() {    // 直接返回发现服务信息
        return this.client ;
    }

    @RequestMapping(value = "/dept/list", method = RequestMethod.GET)
    public Object list(){
        return  deptService.getDeptInfo();
    }
}
