package com.example.demo.controller;

import com.example.demo.service.DeptService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class DeptController {

    @Resource
    private DeptService deptService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object list(){
        return  deptService.getDeptInfo();
    }
}
