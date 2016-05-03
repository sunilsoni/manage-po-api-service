package com.jci.model.request;

public class LoginRequest {

	private boolean isLogin;	
	private boolean isRefresh;	
	private String username;

	public boolean isLogin() {
		return isLogin;
	}

	public void setLogin(boolean isLogin) {
		this.isLogin = isLogin;
	}

	public boolean isRefresh() {
		return isRefresh;
	}

	public void setRefresh(boolean isRefresh) {
		this.isRefresh = isRefresh;
	}

	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "LoginRequest [isLogin=" + isLogin + ", isRefresh=" + isRefresh + ", username=" + username + "]";
	}



	
	
}
