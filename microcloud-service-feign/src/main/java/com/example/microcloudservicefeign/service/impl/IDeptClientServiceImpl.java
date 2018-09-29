package com.example.microcloudservicefeign.service.impl;

import com.example.demo.bean.Dept;
import com.example.demo.dao.DeptMapper;
import com.example.microcloudservicefeign.service.IDeptClientService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
@Service
public class IDeptClientServiceImpl implements IDeptClientService {

    @Override
    public Dept get(long id) {
        return null;
    }

    @Override
    public List<Dept> list() {
        List<Dept> deptList = new ArrayList<>();
        Dept dept = new Dept();
        dept.setDname("a");
        deptList.add(dept);
        return deptList;
    }

    @Override
    public boolean add(Dept dept) {
        return false;
    }
}
