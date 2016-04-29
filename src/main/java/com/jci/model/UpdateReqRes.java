package com.jci.model;

import java.util.Map;

public class UpdateReqRes {
	
	Map<Long,Integer> idToStatusMap=null;
	boolean isError;


	public Map<Long, Integer> getIdToStatusMap() {
		return idToStatusMap;
	}
	public void setIdToStatusMap(Map<Long, Integer> idToStatusMap) {
		this.idToStatusMap = idToStatusMap;
	}
	public boolean isError() {
		return isError;
	}
	public void setError(boolean isError) {
		this.isError = isError;
	}
	@Override
	public String toString() {
		return "UpdateReqRes [idToStatusMap=" + idToStatusMap + ", isError=" + isError + "]";
	}
	
	
	 

}
