package com.jci.model.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_DEFAULT)
public class FlatFileRequest {

	private List<String> poNums =   null;

	public List<String> getPoNums() {
		return poNums;
	}

	public void setPoNums(List<String> poNums) {
		this.poNums = poNums;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((poNums == null) ? 0 : poNums.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FlatFileRequest other = (FlatFileRequest) obj;
		if (poNums == null) {
			if (other.poNums != null)
				return false;
		} else if (!poNums.equals(other.poNums))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "FlatFileRequest [poNums=" + poNums + "]";
	}

	 

	
	
}
