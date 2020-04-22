package com.hsun.data;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude= {DataSourceAutoConfiguration.class, JacksonAutoConfiguration.class})
public class DataAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(DataAppApplication.class, args);
	}

}
