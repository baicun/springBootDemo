package com.example.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
@SpringBootTest
@RunWith(SpringRunner.class)
public class RedisTest {
    //@Resource
    //private RedisTemplate<String, String> redisTemplate;
    @Test
    public void testSet() {
        //this.redisTemplate.opsForValue().set("study", "java");
        //System.out.println(this.redisTemplate.opsForValue().get("study"));
    }
}
