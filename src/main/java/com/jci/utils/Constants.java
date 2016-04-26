package com.jci.utils;

public class Constants {

	/**
	 * URL uses the logical name of manage-po-core-service - upper or lower case,
	 * doesn't matter.
	 */
	public static final String MANAGE_PO_CORE_SERVICE_URL = "http://MANAGE-PO-CORE-SERVICE/";
	
	
	public static final String SI_FLAT_FILE_URL ="http://c201s009.cg.na.jci.com:15080/E2OPOC"; //https://gtstaging.controls.johnsoncontrols.com/E2OPOC 
		
	/***
	 * Below are the list of PO status.
	 */
	public static final int STATUS_INTRANSIT =1;
	public static final int STATUS_TXN_COMPLETED =2;
	public static final int STATUS_ERRO_IN_PROCESS =3;
}
