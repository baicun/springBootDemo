package com.example.demo.dao;

import com.example.demo.bean.Dept;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeptMapper {
    // 查看表中所有信息
    List<Dept> findAll();
    // 查看统计数据
    int getSum();
    // 新增一个部门
    boolean doInsert(Dept dept);
}
