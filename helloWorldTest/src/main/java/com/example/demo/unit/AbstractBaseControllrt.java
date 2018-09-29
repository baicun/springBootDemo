package com.example.demo.unit;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public abstract class AbstractBaseControllrt {
    @Resource
    private MessageSource messageSource;

    /**
     * 多语言实现
     * @param key
     * @param args
     * @return
     */
    public String getMessage(String key, String ...args) {
        return this.messageSource.getMessage(key, args, Locale.getDefault());
    }
    /**
     * 日期转化：注册一个日期格式的转化处理程序类，自动转化
     */
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        // 建立一个将字符串转换为日期的工具类
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
        // 明确描述此时需要注册一个日期格式的转化处理程序类
        binder.registerCustomEditor(Date.class, new CustomDateEditor(sdf, true));
    }


}
