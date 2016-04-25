package com.jci.model.response;

import java.util.ArrayList;

import com.jci.model.PoDetails;


public class PullPoDataResponse {

	private boolean isErrorInDataFetch;
	private boolean isErrorInDataSave;
	
	private String errorMsg;
	
	private ArrayList<PoDetails> poDetails;

	public boolean isErrorInDataFetch() {
		return isErrorInDataFetch;
	}

	public void setErrorInDataFetch(boolean isErrorInDataFetch) {
		this.isErrorInDataFetch = isErrorInDataFetch;
	}

	public boolean isErrorInDataSave() {
		return isErrorInDataSave;
	}

	public void setErrorInDataSave(boolean isErrorInDataSave) {
		this.isErrorInDataSave = isErrorInDataSave;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public ArrayList<PoDetails> getPoDetails() {
		return poDetails;
	}

	public void setPoDetails(ArrayList<PoDetails> poDetails) {
		this.poDetails = poDetails;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((poDetails == null) ? 0 : poDetails.hashCode());
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
		PullPoDataResponse other = (PullPoDataResponse) obj;
		if (poDetails == null) {
			if (other.poDetails != null)
				return false;
		} else if (!poDetails.equals(other.poDetails))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "PullPoDataResponse [isErrorInDataFetch=" + isErrorInDataFetch + ", isErrorInDataSave="
				+ isErrorInDataSave + ", errorMsg=" + errorMsg + ", poDetails=" + poDetails + "]";
	}
	
	
	
}
