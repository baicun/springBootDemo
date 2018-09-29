package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class JsonViewController {

    @RequestMapping(value = "/jsonShow")
    @ResponseBody
    public ModelAndView jsonShow() {
        ModelAndView mv = new ModelAndView();
        Object o = new Object();
        mv.setViewName("/jsonView/jsonView");
        mv.addObject("object", o);
        return mv;
    }
}
