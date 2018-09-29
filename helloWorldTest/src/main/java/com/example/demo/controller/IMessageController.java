package com.example.demo.controller;

import com.example.demo.bean.Member;
import com.example.demo.service.IMessageService;
import com.example.demo.unit.AbstractBaseControllrt;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

//@RestController
@Controller
public class IMessageController extends AbstractBaseControllrt {

    @Resource
    IMessageService iMessageService;

    /*@RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        System.out.println(iMessageService.info());
        return iMessageService.info();
    }*/


    @RequestMapping(value = "/index", method = RequestMethod.GET)
    @ResponseBody
    public String index() {
        System.out.println(iMessageService.info());
        return iMessageService.info();
    }

    @RequestMapping(value = "/addPre", method = RequestMethod.GET)
    public String addPre() {
        return "message/member_add";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object add(Member member) {
        return member;
    }

    @RequestMapping("/show")
    public String show(String mid, Model model) {
        model.addAttribute("url", "www.example.com");
        model.addAttribute("mid", mid);
        return "message/message_show";
    }

    @RequestMapping(value = "/style", method = RequestMethod.GET)
    public String showStyle(Model model) {
        model.addAttribute("url", "<span style='color:red'>www.example.com</span>");
        return "message/message_show_style";
    }

    /**
     * 内置对象输出
     * @return
     */
    @RequestMapping(value = "/innerObject", method = RequestMethod.GET)
    public String innerObject(HttpServletRequest request, Model model) {
        request.setAttribute("msg", "java");
        request.setAttribute("requestMessage", "<span style='color:red'>www.example.com</span>");
        request.getSession().setAttribute("requestSession", "requestSession");
        request.getServletContext().setAttribute("requestServletContext", "requestServletContext");
        model.addAttribute("url", "www.example.com");
        return "message/message_show_inner";
    }

    /**
     * 对象输出
     */
    @RequestMapping("/memberShow")
    public String memberShow(Member member, Model model) {
        member.setAge(20);
        member.setMid("baicun");
        member.setSalary(100.01);
        member.setBirthday(new Date());
        model.addAttribute("member", member);
        return "message/member_show";
    }

    /**
     * 对象迭代输出
     */
    @RequestMapping("/memberList")
    public String memberList(Member member, Model model) {
        // LIST集合
        List<Member> memberList = new ArrayList<>();
        for(int x =0; x<10; x++) {
            member.setAge(20);
            member.setMid("1");
            member.setName("中国");
            member.setSalary(100.01);
            member.setBirthday(new Date());
            memberList.add(member);
        }
        model.addAttribute("memberList", memberList);

        // Map集合
        Map<String,Member> memberMap = new HashMap<>();
        for(int x =0; x<10; x++) {
            member.setAge(20);
            member.setMid("1");
            member.setName("中国");
            member.setSalary(100.01);
            member.setBirthday(new Date());
            memberMap.put("mldn"+x,member);
        }
        model.addAttribute("memberMap", memberMap);
        return "message/member_list";
    }
}
