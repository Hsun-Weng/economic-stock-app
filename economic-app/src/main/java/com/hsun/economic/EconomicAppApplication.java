package com.hsun.economic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {JacksonAutoConfiguration.class})
@ComponentScan("com.hsun.economic")
public class EconomicAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(EconomicAppApplication.class, args);
	}

}
