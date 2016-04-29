package com.jci.model.request;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_DEFAULT)
public class FlatFileRequest {

	private List<String> poNums =   null;
	
	private Map<String, Long> poNumToIdMap=null;

	public List<String> getPoNums() {
		return poNums;
	}

	public void setPoNums(List<String> poNums) {
		this.poNums = poNums;
	}

	public Map<String, Long> getPoNumToIdMap() {
		return poNumToIdMap;
	}

	public void setPoNumToIdMap(Map<String, Long> poNumToIdMap) {
		this.poNumToIdMap = poNumToIdMap;
	}

	@Override
	public String toString() {
		return "FlatFileRequest [poNums=" + poNums + ", poNumToIdMap=" + poNumToIdMap + "]";
	}


	
	
}
