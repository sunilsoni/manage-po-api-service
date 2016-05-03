package com.jci.model.response;

public class LoginResponse {
	
	private boolean isLogin;
	private String username;
	
	public boolean isLogin() {
		return isLogin;
	}
	public void setLogin(boolean isLogin) {
		this.isLogin = isLogin;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Override
	public String toString() {
		return "LoginRequest [isLogin=" + isLogin + ", username=" + username + "]";
	}
}
