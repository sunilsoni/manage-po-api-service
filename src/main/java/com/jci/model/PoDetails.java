package com.jci.model;

public class PoDetails {

	private Long poId;
	private String poNum;
	private String poDesc;
	private String dataSource;
	private int status;
	public Long getPoId() {
		return poId;
	}
	public void setPoId(Long poId) {
		this.poId = poId;
	}


	public String getPoNum() {
		return poNum;
	}
	public void setPoNum(String poNum) {
		this.poNum = poNum;
	}
	public String getPoDesc() {
		return poDesc;
	}
	public void setPoDesc(String poDesc) {
		this.poDesc = poDesc;
	}


	public String getDataSource() {
		return dataSource;
	}
	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	 
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PoDetails other = (PoDetails) obj;
		if (dataSource != other.dataSource)
			return false;
		if (poId == null) {
			if (other.poId != null)
				return false;
		} else if (!poId.equals(other.poId))
			return false;
		if (poNum != other.poNum)
			return false;
		if (status != other.status)
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "PoDetails [poId=" + poId + ", poNum=" + poNum + ", poDesc=" + poDesc + ", dataSource=" + dataSource
				+ ", status=" + status + "]";
	}
	
	
}
