package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Venue implements Serializable {
    private final static long serialVersionUID = 0L;

    private Location location;
    private String title;
    private String address;
    private String foursquareId;
    private String foursquareType;
}
