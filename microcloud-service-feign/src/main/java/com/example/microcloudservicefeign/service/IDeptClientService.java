package com.example.microcloudservicefeign.service;

import com.example.demo.bean.Dept;
import com.example.demo.config.FeignClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * 通过注解@FeignClient添加接口对应的远程微服务名称value="helloWorldApplication"和
 * 服务的认证configuration=FeignClientConfig.class
 *
 */
@FeignClient(value="helloWorldApplication",configuration=FeignClientConfig.class)
public interface IDeptClientService {
    @RequestMapping(method=RequestMethod.GET,value="/dept/get/{id}")
    Dept get(@PathVariable("id") long id) ;
    @RequestMapping(method=RequestMethod.GET,value="/dept/list")
    List<Dept> list() ;
    @RequestMapping(method=RequestMethod.POST,value="/dept/add")
    boolean add(Dept dept) ;

}
