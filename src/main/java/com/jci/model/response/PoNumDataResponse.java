package com.jci.model.response;

import java.util.List;

public class PoNumDataResponse {

	private boolean isError;
	private List<String> lines;
	private String errorMsg;
	private String fileName;
	private String poNum;
	
	public boolean isError() {
		return isError;
	}
	public void setError(boolean isError) {
		this.isError = isError;
	}
	public List<String> getLines() {
		return lines;
	}
	public void setLines(List<String> lines) {
		this.lines = lines;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getPoNum() {
		return poNum;
	}
	public void setPoNum(String poNum) {
		this.poNum = poNum;
	}
	
	
	@Override
	public String toString() {
		return "PoNumDataResponse [isError=" + isError + ", lines=" + lines + ", errorMsg=" + errorMsg + ", fileName="
				+ fileName + ", poNum=" + poNum + "]";
	}


	
	
	 
	
}
