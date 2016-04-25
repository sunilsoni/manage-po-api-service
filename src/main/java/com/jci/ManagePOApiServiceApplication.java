package com.jci;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

@EnableCircuitBreaker
@EnableAutoConfiguration
@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan
public class ManagePOApiServiceApplication {
	
	public static void main(String[] args) {
        SpringApplication.run(ManagePOApiServiceApplication.class, args);
    }
	
	@Autowired
	public void setEnvironment(Environment e) {
		System.out.println("####### Environment:"+e.getProperty("configuration.projectName"));
	}

	/**
	 * The ManagePOService encapsulates the interaction with the micro-service.
	 * 
	 * @return A new service instance.
	 *//*
	@Bean
	public ManagePOServiceImpl managePOService() {
		return new ManagePOServiceImpl(Constants.MANAGE_PO_CORE_SERVICE_URL);
	}
	
	*//**
	 * Create the controller, passing it the {@link WebAccountsService} to use.
	 * 
	 * @return
	 *//*
	@Bean
	public ManagePOController ManagePOController() {
		return new ManagePOServiceImpl(managePOService());
	}*/
}
