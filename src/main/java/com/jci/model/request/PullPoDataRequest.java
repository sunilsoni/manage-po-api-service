package com.jci.model.request;

public class PullPoDataRequest {

	private boolean isFirstSearch;

	public boolean isFirstSearch() {
		return isFirstSearch;
	}

	public void setFirstSearch(boolean isFirstSearch) {
		this.isFirstSearch = isFirstSearch;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (isFirstSearch ? 1231 : 1237);
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
		PullPoDataRequest other = (PullPoDataRequest) obj;
		if (isFirstSearch != other.isFirstSearch)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "PullPoDataRequest [isFirstSearch=" + isFirstSearch + "]";
	}
	
	
	
}
