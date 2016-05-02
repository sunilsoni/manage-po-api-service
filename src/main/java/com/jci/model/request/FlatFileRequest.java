package com.jci.model.request;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_DEFAULT)
public class FlatFileRequest {

	private List<String> poNums =   null;
	
	private Map<String, Long> poNumToIdMap=null;
	
	private Map<String, String> poNumToPoDesc=null;

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

	public Map<String, String> getPoNumToPoDesc() {
		return poNumToPoDesc;
	}

	public void setPoNumToPoDesc(Map<String, String> poNumToPoDesc) {
		this.poNumToPoDesc = poNumToPoDesc;
	}

	@Override
	public String toString() {
		return "FlatFileRequest [poNums=" + poNums + ", poNumToIdMap=" + poNumToIdMap + ", poNumToPoDesc="
				+ poNumToPoDesc + "]";
	}



}
