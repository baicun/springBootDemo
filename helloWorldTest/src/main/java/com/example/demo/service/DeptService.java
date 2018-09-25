package com.example.demo.service;

import com.example.demo.bean.Dept;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DeptService {
    // 查询全表信息
    List<Dept> getDeptInfo();
    //返回表统计数据
    int statistics();
    // 新增一个部门
    //@Transactional(readOnly = true) //java.sql.SQLException: Connection is read-only.Queries leading to data modification are not allowed
    @Transactional(propagation = Propagation.REQUIRED)
    boolean toAdd(Dept dept);
}
