package com.example.microcloudconsumerfeign.controller;

import com.example.demo.bean.Dept;
import com.example.microcloudservicefeign.service.IDeptClientService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ConsumerDeptController {
    @Resource
    private IDeptClientService deptService ;
    @RequestMapping(value = "/consumer/dept/get")
    public Object getDept(long id) {
        return this.deptService.get(id);
    }
    @RequestMapping(value = "/consumer/dept/list")
    public Object listDept() {
        return this.deptService.list();
    }
    @RequestMapping(value = "/consumer/dept/add")
    public Object addDept(Dept dept) throws Exception {
        return this.deptService.add(dept);
    }


}
