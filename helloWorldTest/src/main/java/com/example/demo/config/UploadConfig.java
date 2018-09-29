package com.example.demo.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.MultipartConfigElement;

@Configuration
public class UploadConfig {
    /**
     * 上传文件配置
     * #文件上传配置(启用servlet上传；设置单个文件大小；设置最大的请求的文件大小，总体大小；当文件大小达到配置时写入磁盘；上传的临时目录)
     * #spring.servlet.multipart.enabled=true
     * #spring.servlet.multipart.max-file-size=1MB
     * #spring.servlet.multipart.max-request-size=20MB
     * #spring.servlet.multipart.file-size-threshold=512KB
     * #spring.servlet.multipart.location=/
     * @return
     */
    @Bean
    public MultipartConfigElement getMultipartConfig() {
        MultipartConfigFactory config = new MultipartConfigFactory();
        // 设置单个文件大小
        config.setMaxFileSize("1MB");
        // 设置最大的请求的文件大小，总体大小
        config.setMaxRequestSize("10MB");
        // 当文件大小达到配置时写入磁盘
        config.setFileSizeThreshold("512KB");
        // 上传的临时目录
        config.setLocation("/");
        return config.createMultipartConfig();
    }
}
