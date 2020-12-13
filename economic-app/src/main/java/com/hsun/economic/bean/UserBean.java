package com.hsun.economic.bean;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserBean {
    private String userName;
    @Expose(serialize = false)
    private String password;
    private String firstName;
    private String lastName;
}
