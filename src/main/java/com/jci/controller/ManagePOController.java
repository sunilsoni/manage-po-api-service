package com.jci.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jci.model.request.FlatFileRequest;
import com.jci.model.request.LoginRequest;
import com.jci.model.request.PullPoDataRequest;
import com.jci.model.response.LoginResponse;
import com.jci.model.response.ProcessPoDataResponse;
import com.jci.model.response.PullPoDataResponse;
import com.jci.service.ManagePOService;

@RestController
public class ManagePOController {
	
	@Autowired
	private ManagePOService poService;
	
	@RequestMapping(value = "/pullPoData", method = RequestMethod.POST, headers = "Accept=application/json")
    public  PullPoDataResponse getPoData(@RequestBody PullPoDataRequest request){
		System.out.println(" #### Starting ManagePOController. getPoData ####->"+request);
		PullPoDataResponse  res = poService.getPoData(request);
		System.out.println(" #### Ending ManagePOController. getPoData ####->"+res);
		return res;
    }
    	
	@RequestMapping(value = "/processPoData", method = RequestMethod.POST, headers = "Accept=application/json")
    public  ProcessPoDataResponse processPoData(@RequestBody FlatFileRequest request){
		System.out.println(" #### Starting ManagePOController. processPoData ####->"+request);
		
		ProcessPoDataResponse  res = poService.processPoData(request);
		
		System.out.println(" #### Ending ManagePOController. processPoData ####->"+res);
		return res;
    }
	    
	@RequestMapping(value = "/isLogin", method = RequestMethod.POST, headers = "Accept=application/json")
    public  LoginResponse isLogin(@RequestBody LoginRequest loginRequest,HttpServletRequest request){
		System.out.println(" #### Starting ManagePOController. isLogin ####->"+loginRequest);

		LoginResponse  response = new LoginResponse();
		
		final HttpSession session = request.getSession();
		System.out.println("session-->"+session);
		String isLog = (String) session.getAttribute("isLogin");
		
		boolean isLogin = loginRequest.isLogin();
		System.out.println("isLogin1-->"+isLogin);
		
		if(isLogin){
			session.setAttribute("isLogin", "true");
			session.setAttribute("username", loginRequest.getUsername());
			response.setLogin(true);
			response.setUsername(loginRequest.getUsername());
		}else if(loginRequest.isRefresh() && isLog!=null){
				response.setLogin(true);
				response.setUsername((String) session.getAttribute("username"));
		}else{
			
			session.removeAttribute("isLogin");
			session.removeAttribute("username");
			//session.setAttribute("isLogin", "false");
			//session.setAttribute("username", null);
			
			response.setUsername(null);
			response.setLogin(false);
		}
		
		System.out.println("response-->"+response);
		System.out.println(" #### Ending ManagePOController. isLogin ####->"+response);
		return response;
    }
	
	
	
	
}
