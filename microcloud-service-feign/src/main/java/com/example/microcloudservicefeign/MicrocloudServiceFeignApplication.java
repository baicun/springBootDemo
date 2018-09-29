package com.example.microcloudservicefeign;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages={"com.example.service"})//进行接口IDeptClientService的扫描生成使得可以注入到ConsumerDeptController里面
@SpringBootApplication
public class MicrocloudServiceFeignApplication {

    public static void main(String[] args) {
        SpringApplication.run(MicrocloudServiceFeignApplication.class, args);
    }
}
