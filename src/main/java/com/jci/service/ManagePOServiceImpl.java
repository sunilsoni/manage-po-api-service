package com.jci.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.jci.model.ManagePO;
import com.jci.model.request.FlatFileRequest;
import com.jci.model.request.PullPoDataRequest;
import com.jci.model.response.PoNumDataResponse;
import com.jci.model.response.ProcessPoDataResponse;
import com.jci.model.response.PullPoDataResponse;
import com.jci.utils.Constants;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

@Service
public class ManagePOServiceImpl implements ManagePOService{
	
	@Autowired
	private RestTemplate restTemplate;
	
	protected String serviceUrl=Constants.MANAGE_PO_CORE_SERVICE_URL;
	
	protected Logger logger = Logger.getLogger(ManagePOServiceImpl.class.getName());
	
	public ManagePOServiceImpl() {
		logger.info("serviceUrl--> " + serviceUrl);
		this.serviceUrl = serviceUrl.startsWith("http") ? serviceUrl: "http://" + serviceUrl;
	}

	/*
	@HystrixCommand(fallbackMethod = "getFallbackPoData", commandProperties = {
			@HystrixProperty(name = "execution.isolation.strategy", value = "THREAD"),
			@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
			@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "1000") })
	@Override*/
	public PullPoDataResponse getPoData(PullPoDataRequest request) {
		System.out.println("### Starting ManagePOServiceImpl.getPoData ###"+request);
		System.out.println("serviceUrl--> " + serviceUrl);
		
		PullPoDataResponse pullPoDataResponse = restTemplate.postForObject((serviceUrl+"pullPoData"),request, PullPoDataResponse.class);
		System.out.println("pullPoDataResponse1-->"+pullPoDataResponse);
		
		System.out.println("### Ending ManagePOServiceImpl.getPoData ###");
		
		return pullPoDataResponse;
	}
	
	/**
	 * Fallback Method: Need to discuss this..after that need to implement.
	 * @param request
	 * @return PullPoDataResponse
	 */
	public PullPoDataResponse getFallbackPoData(PullPoDataRequest request) {
		System.out.println("### Starting ManagePOServiceImpl.getFallbackPoData ###"+request);
		//PullPoDataResponse pullPoDataResponse = restTemplate.postForObject((serviceUrl+"pullPoData"),request, PullPoDataResponse.class);
		//System.out.println("### Ending ManagePOServiceImpl.getFallbackPoData ###"+pullPoDataResponse);
		
		
		return null;
	}
	
	

/*	@HystrixCommand(fallbackMethod = "processFallbackPoData", commandProperties = {
			@HystrixProperty(name = "execution.isolation.strategy", value = "THREAD"),
			@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
			@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "1000") })
	@Override*/
	public ProcessPoDataResponse processPoData(FlatFileRequest request) {
		System.out.println("### Starting ManagePOServiceImpl.processPoData(API) ###"+request);
		final PoNumDataResponse res;
		ProcessPoDataResponse finalRes = new ProcessPoDataResponse();
		
		try{
			res = restTemplate.postForObject((serviceUrl+"getPoNumData"),request, PoNumDataResponse.class);
		}catch (Exception e) {
			e.printStackTrace();
			finalRes.setError(true);
			return finalRes;
		}
	
		finalRes.setErrorMsg(res.getErrorMsg());
		if(res.isError()){
			finalRes.setError(true);
			return finalRes;
		}
		
		//Path file = Paths.get(res.getFileName());
		
		System.out.println("res.getFileName()-->"+res.getFileName());
		File toFile = new File(res.getFileName());
		System.out.println("getAbsolutePath-1-->"+toFile.getAbsolutePath());
		 
	    try {
	    	FileUtils.writeLines(toFile,"UTF-8", res.getLines(),false);
	    	
			//Files.write(file, res.getLines(), Charset.forName("UTF-8"));
			//Files.write(file, lines, Charset.forName("UTF-8"), StandardOpenOption.APPEND);
		} catch (IOException e) {
			e.printStackTrace();
			finalRes.setError(true);
			return finalRes;
		}
	    
	   // File toFile = file.toFile();
	    Map<String, Integer> poNumToStatus = new HashMap<String, Integer>();
	    
        String mimeType= URLConnection.guessContentTypeFromName(toFile.getName());
		try{
			 RestTemplate template = new RestTemplate();

			 MultiValueMap<String, Object> map = new LinkedMultiValueMap<String, Object>();
			 map.add("name", toFile.getName());
			 map.add("filename", toFile.getName());
			 map.set("Content-Type",mimeType);
			 map.set("Content-Length",(int)toFile.length());			 
			 
			 InputStream input = new FileInputStream(toFile);
			 ByteArrayResource contentsAsResource = new ByteArrayResource(IOUtils.toByteArray(input)){
			             @Override
			             public String getFilename(){
			                 return res.getFileName();
			             }
			 };
			 map.add("file", contentsAsResource);
			// map.add("file", res.getLines());
			 
			 System.out.println("URL-->"+Constants.SI_FLAT_FILE_URL+"?filename="+toFile.getName());
			 String result = template.postForObject((Constants.SI_FLAT_FILE_URL+"?filename="+toFile.getName()), map, String.class);
			 System.out.println("result-->"+result);
			 
			 if(res.getPoNum()!=null){
				 poNumToStatus.put(res.getPoNum(), Constants.STATUS_TXN_COMPLETED);		
			 }else{
			      poNumToStatus.put(request.getPoNums().get(0), Constants.STATUS_TXN_COMPLETED);		
			 }
		}catch(Exception e) {
			e.printStackTrace();
			finalRes.setError(true);
			finalRes.setErrorMsg("Error while processing files!!");
			poNumToStatus.put(res.getPoNum(), Constants.STATUS_ERRO_IN_PROCESS);		
		}
		
		if(!toFile.delete()){
			 File fl = new File(toFile.getAbsolutePath());
			 fl.delete();
		 } 
		
		finalRes.setPoNumToStatus(poNumToStatus);
		 System.out.println("### Ending ManagePOServiceImpl.processPoData(API) ###");
		return finalRes;
	}
	

	public ProcessPoDataResponse processFallbackPoData(FlatFileRequest request) {
		System.out.println("### Starting ManagePOServiceImpl.processFallbackPoData(API) ###");
		ProcessPoDataResponse finalRes = new ProcessPoDataResponse();
		finalRes.setError(true);
		finalRes.setErrorMsg("Error while processing files! ");
		System.out.println("### Ending ManagePOServiceImpl.processFallbackPoData(API) ###");
		return finalRes;
	}
	
	
	
	//Delete below
	@HystrixCommand(fallbackMethod = "getFallbackTransactionDetail", commandProperties = {
			@HystrixProperty(name = "execution.isolation.strategy", value = "THREAD"),
			@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
			@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "1000") })
	@Override
	public ManagePO getTransactionDetail(String accountNumber, long transactionId) {
		System.out.println("### Starting ManagePOServiceImpl.getTransactionDetail ###");
		//Transaction transaction = new Transaction("123", "FromAcc-Detail", "2014-12-12", transactionId);
		ManagePO transaction = restTemplate.getForObject("http://manage-po-core-service/accounts/"+accountNumber+"/transactions/"+transactionId, ManagePO.class);
		System.out.println("### Ending ManagePOServiceImpl.getTransactionDetail ###");
		return transaction;
	}

}
