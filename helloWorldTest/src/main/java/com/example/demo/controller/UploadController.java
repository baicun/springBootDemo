package com.example.demo.controller;

import com.example.demo.unit.AbstractBaseControllrt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.List;

@Controller
public class UploadController extends AbstractBaseControllrt {

    /**
     *  文件上传
     *  单个文件上传可以用 MultipartFile 接收，多个文件就需要 HttpServletRequest 接收
     *  图片上传到服务器，可以依赖fastdfs-client包，并创建配置文件*.conf,获取token码,进行上传
     * @return
     */
    @RequestMapping(value = "/uploadPre", method = RequestMethod.GET)
    public String uploadPre() {
        return "message/upload_page";
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public String uploadPre(String name, HttpServletRequest request) {
        if(request instanceof MultipartHttpServletRequest) {
            MultipartHttpServletRequest requests = (MultipartHttpServletRequest) request;
            List<MultipartFile> files =  requests.getFiles("photo");
            Iterator<MultipartFile> iter =  files.iterator();
            while(iter.hasNext()) {
                MultipartFile photo = iter.next();
                if(photo != null) {
                    System.out.println("文件上传name = |" + name);
                    System.out.println("文件上传photoName = |" + photo.getName());
                    System.out.println("文件上传photoContentType = |" + photo.getContentType());
                    System.out.println("文件上传photosize = |" + photo.getSize());
                }
            }
        }
        return "upload_file";
    }
}
