package com.example.demo;

import com.example.demo.bean.Dept;
import com.example.demo.service.DeptService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.List;
@SpringBootTest
@RunWith(SpringRunner.class)
public class DeptServiceTest {
    @Resource
    DeptService deptService;
    @Resource
    private DataSource dataSource;

    @Test
    public void testConnect() throws Exception {
        System.out.println("数据库连接：" + dataSource.getConnection());
    }

    @Test
    public void testdept() {
        List<Dept> list = deptService.getDeptInfo();
        System.out.println("=" + list.toString());
    }
    @Test
    public void contextLoads() {
        int a = deptService.statistics();
        System.out.println("sum=" + a);
    }
    @Test
    public void create() {
        Dept dept = new Dept();
        dept.setDname("产品部");
        boolean a = deptService.toAdd(dept);
        System.out.println("boolean =" + a);
    }
}
