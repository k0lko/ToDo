package com._majqi.zpo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class ZpoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZpoApplication.class, args);
	}

}
