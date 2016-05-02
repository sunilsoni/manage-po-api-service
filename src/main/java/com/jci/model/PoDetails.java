package com.jci.model;

public class PoDetails {

	private Long poId;
	private String poNum;
	private String poDesc;
	private String dataSource;
	private int status;
	private String supplierId;
	
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
	 
	
	public String getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}
	
	@Override
	public String toString() {
		return "PoDetails [poId=" + poId + ", poNum=" + poNum + ", poDesc=" + poDesc + ", dataSource=" + dataSource
				+ ", status=" + status + ", supplierId=" + supplierId + "]";
	}
 
	
	
}
