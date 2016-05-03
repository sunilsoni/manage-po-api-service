/*
file: dataFecth.js
date: April 20, 2016
author: Anvesh Shaw
file purpose: fetch data and post data to server..
server calls: pullPoData, processPoData
*/
console.log('latest build : 1350 HRS');
var serverResponse = null;
var dataToProcess = [], idToPoNumMap = {};
var grid, gridErr;
var dataView, dataViewErr;
var dataGlobal = [], descGlobalText={};
var userArr = ['sunil','ajay','todd','bharathan'];
var roleObj = {'sunil':"IT Analyst",'ajay':"IT Analyst",'todd':"Bus Relationship Sr Mgr IT GISC HQ IT",'bharathan':"Sr Solution Architect Info Technology Architecture"};

$('#pullPoDataBtn').click(function() {
	$('#loadingindicator').addClass('wait');
    pullPoData();
});

$('#processPoDataBtn').click(function() {
	$('#loadingindicator').addClass('wait');
    processPoData();
});



function pullPoData() {
    /*if ($('#error2').length > 0) {
        //this block executes only if error2 exists in dom.
        $('#error2').remove();
    }*/
	$("#errorMsg").text('');

    var settings = {
        async: true,

        crossDomain: true,
        url: "/pullPoData",
        method: "POST",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache"
        },
        processData: false,
        data: "{\"firstSearch\":true}",
        'success': function() {
            console.log('SUCCESS pulling data');
        },
        'error': function() {
            console.log('ERROR pulling data');
        }
    }; //settings

    /*dataType: 'jsonp',*/

    $.ajax(settings).done(function(response) {

        if (response) {
            serverResponse = response;
            console.log('Response after pulling data:');
            console.log(response);
			$('#loadingindicator').removeClass('wait');
            var responseArray = serverResponse["poDetails"];

            /*//for pagination
            var superArray = [];
            $.extend(superArray,responseArray.concat(responseArray));
            $.extend(superArray,superArray.concat(superArray));
            $.extend(superArray,superArray.concat(superArray))
            $.extend(superArray,superArray.concat(superArray))
            responseArray = [];
            console.log('responseArray length : '+responseArray.length);
            
            responseArray = superArray;
            console.log('new responseArray:');
            console.log(responseArray);
            //pagination*/

            createGrid(responseArray);
        } else {
            //show error message in action required table
            /*$('#actionRequiredTable').append(
                '<tr>' +
                '<td id="error2">' +
                '<p style="color: red">•&nbsp;&nbsp;&nbsp;Could not pull PO Data. Please retry the action.</p>' +
                '</td>' +
                '</tr>');*/
				/*$('#home .row .col-sm-12').before(
                    '<div class="col-sm-8" style="padding: 20px;float:right">' +
                    '<div id="error2">' +
                    '<p style="color: red;margin-left: 100px;">Could not pull PO Data. Please retry the action.</p>' +
                    '</div>' +
                    '</div>');*/
			$("#errorMsg").text('Could not pull PO Data. Please retry the action.').css({color:"red", marginLeft:"100px"});
				
				
			$('#loadingindicator').removeClass('wait');
        }
    });



}; //pullPoData

$("#myGrid").on('click', ".checkbox-button", function() {
    console.log('checkbox value: ' + this.value);
    var name = this.name.split('_');
    var poNumber = name[1];
    if ($('#' + this.id).prop('checked')) {
		//var poNumObj = {};
		//idToPoNumMap[parseInt($(this).attr('poid'))] = poNumber;		
		idToPoNumMap[poNumber] = parseInt($(this).attr('poid'));
        dataToProcess.push(poNumber);
		//idToPoNumMap.push(poNumObj);
    } else {
        console.log('dataToProcess before splice:');
        console.log(dataToProcess);
        var removeIndex = 0;
        for (var idx in dataToProcess) {
            if (poNumber === dataToProcess[idx]) {
                removeIndex = idx;
                dataToProcess.splice(removeIndex, 1);
                console.log('dataToProcess after splice:');
                console.log(dataToProcess);
            }
        }
    }

});

function processPoData(errFlag) {
    var sendData = {};

    /*if ($('#processMessage2').length > 0) {
        $('#processMessage2').remove();
    } else if ($('#error3').length > 0) {
        $('#error3').remove();
    } else if ($('#error4').length > 0) {
        $('#error4').remove();
    }*/
	$("#errorMsg").text('');


    if (dataToProcess.length <= 0) {
        console.log('No Data to process');
		$('#loadingindicator').removeClass('wait');
        /*$('#actionRequiredTable').append(
            '<tr>' +
            '<td id="error3">' +
            '<p style="color: red">•&nbsp;&nbsp;&nbsp;No data was selected for processing. Please select rows for processing from below grid using the checkboxes.</p>' +
            '</td>' +
            '</tr>');*/
		
		/*$('#home .row .col-sm-12').before(
                    '<div class="col-sm-8" style="padding: 20px;float:right">' +
                    '<div id="error3">' +
                    '<p style="color: red;margin-left: 40px;">No data was selected for processing. Please select rows for processing from below grid using the checkboxes.</p>' +
                    '</div>' +
                    '</div>');*/
		$("#errorMsg").text('Please select atleast 1 PO number.').css({color:"red", marginLeft:"120px"});
			
		
		
        return;
    } else {
		
        sendData = {
            poNums: dataToProcess,
			poNumToIdMap : idToPoNumMap,
			poDesc : descGlobalText
        };
		
        var sendDataStr = JSON.stringify(sendData);
        console.log("sendDataStr:");
        console.log(sendDataStr);

        var settings = {
            async: true,

            crossDomain: true,
            "url": "/processPoData",
            method: "POST",
            headers: {
                'content-type': "application/json",
                'cache-control': "no-cache",
                'postman-token': "8a35594e-6f4b-e7f5-161b-652976ef7f03"
            },
            processData: false,
            data: sendDataStr,
            'success': function() {
                console.log('SUCCESS processing data');
                if ($('#processMessage2').length > 0) {
                    $('#processMessage2').remove();
                } else if ($('#error3').length > 0) {
                    $('#error3').remove();
                }
                /*$('#home .row .col-sm-12').before(
                    '<div class="col-sm-8" style="padding: 20px;float:right">' +
                    '<div id="processMessage2">' +
                    '<p style="color: green;margin-left: 100px;">Selected PO number(s) has been processed successfully.</p>' +
                    '</div>' +
                    '</div>');*/
				$("#errorMsg").text('Selected PO number(s) has been processed successfully.').css({color:"green", marginLeft:"100px"});

            },
            'error': function() {
                console.log('ERROR processing data');
            }
        }; //settings

        /*dataType: 'jsonp',*/

        $.ajax(settings).done(function(response) {
            if (response) {
				$('#loadingindicator').removeClass('wait');
                serverResponse = response;
                console.log('Response after processing:');
                console.log(response);
                var processedServerResponse = response;
				descGlobalText = {};
				dataToProcess = [];
				idToPoNumMap = {};
                if (!processedServerResponse["error"]) {
					var checkedRow = $(".checkbox-err:checked");
					var errId = checkedRow.attr('id');
					if(errId){
						dataViewErr.deleteItem(errId);
					}
					
					
					$('#txtSupplierId').val('');
					$('#txtPoNum').val('');
					$('#txtDescErr').val('');
					
					if(errFlag){
						$("#errorMsg").text('');
					}
					
                    updateGrid(processedServerResponse["poNumToStatus"],errFlag);
                } else {
                    /*$('#actionRequiredTable').append(
                        '<tr>' +
                        '<td id="error4">' +
                        '<p style="color: red">•&nbsp;&nbsp;&nbsp;The server responded with an error.</p>' +
                        '<p style="color: red">•&nbsp;&nbsp;&nbsp;' + processedServerResponse["errorMsg"] + '.</p>' +
                        '</td>' +
                        '</tr>');*/
						
						/*$('#home .row .col-sm-12').before(
                    '<div class="col-sm-8" style="padding: 20px;float:right">' +
                    '<div id="error4">' +
                    '<p style="color: red;margin-left: 120px;">The server responded with an error.</p>' +
					'<p style="color: red">' + processedServerResponse["errorMsg"] + '.</p>' +
                    '</div>' +
                    '</div>');*/
					$("#errorMsg").text('The server responded with an error.'+processedServerResponse["errorMsg"]+'.').css({color:"red", marginLeft:"120px"});
						$('#loadingindicator').removeClass('wait');
                    return;
                }

            }
        });
    }
 dataToProcess = [],idToPoNumMap = {},descGlobalText = {};
}; //processPoData

function updateGrid(processedServerResponse,errFlag) {
    //update grid data on response
	
	/*var gridData = dataView.getItems();
	for(var i=0; i< gridData.length ; i++){
		if(processedServerResponse[parseInt(gridData[i]["po"])]){
				if(gridData[i]["status"] == "3"){
					var count = parseInt($('#errorCount').text());
					$('#errorCount').text(count-1);
					
				}
                gridData[i]["rowColor"] = "green";
				gridData[i]["status"] = processedServerResponse[parseInt(gridData[i]["poNum"])];
				gridData[i]["statusVal"] = "Transaction Completed";


				dataView.updateItem(gridData[i]["id"], gridData[i]);
				
        }
		
	}*/
    for(psrIdx in processedServerResponse){
        for(dgIdx in dataGlobal){
            if(dataGlobal[dgIdx]["poNum"] === psrIdx){

                dataGlobal[dgIdx]["status"] = processedServerResponse[psrIdx];
            }
        }//dataGlobal
    }//psr
    //createGrid(dataGlobal,errFlag);
	createGrid(dataGlobal);

};//updateGrid





$("#submitBtn").click(function(e){
	e.preventDefault();
	var userName = $("#userName");
	var password = $("#password");
	if(userName.val() === ''){
		toastr.error('Please enter Username');
		return;
	}
	
	if(password.val() === ''){
		toastr.error('Please enter Password');
		return;
	}
	
	if($.inArray(userName.val(), userArr) === -1){
		toastr.error('Please enter the correct Username');
		return;
	}
	
	if($.inArray(userName.val(), userArr) !== -1){
			if(password.val() === "jcipoc"){
				setLabel(userName.val());
				successLogin();
				onLogin(userName.val());
			}
			else{
				toastr.error('Please enter the correct Password');
			}
	}
});

$("#errorBtn").click(function(e){
	e.preventDefault();
	
	if(dataGlobal && dataGlobal.length < 1){
		toastr.error('No Data to Process');
		return;
	}
	
	$("#main1").css("display","none");
	$("#main2").css("display","block");
	
	var allRecords = dataView.getItems();
	var errorRecords = [];
	
	for(var g=0; g < allRecords.length; g++){
		if(allRecords[g]["status"] === 3){
			errorRecords.push(allRecords[g]);
		}
	}
	
	createGrid(errorRecords,true);
});

$("#goBack").click(function(e){
	e.preventDefault();
	
	$("#main1").css("display","block");
	$("#main2").css("display","none");
	grid.resizeCanvas();
		
});

$("#logOff").click(function(e){
	e.preventDefault();
	onLogin($("#userLabel").text().toLowerCase(),true);
	location.reload();
});

$("#myGridErr").on('click', '.checkbox-err' , function(e){
	
	$('#myGridErr').find('.checkbox-err').prop('checked',false);
	$(this).prop('checked',true);
	
	var desc = 	$(this).attr('desc');
	var poNum = $(this).attr('po-num');
	var supplier = $(this).attr('supplier');
	
	$('#txtSupplierId').val(supplier);
	$('#txtPoNum').val(poNum);
	//Sunil: 
	var date1 = new Date();
	var date2 =  date1.getFullYear() + '-' + (date1.getMonth()+1) + '-' +date1.getDate() + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
	date2 = date2+":";
	$('#txtDescErr').val(date2);
	
});

$("#submitErrBtn").click(function(e){
	$('#loadingindicator').addClass('wait');
	descGlobalText = {};
	idToPoNumMap = {};
	dataToProcess = [];
	
	
	var checkedRow = $(".checkbox-err:checked");
	var poNum = checkedRow.attr('po-num');
	
	descGlobalText[poNum] = $('#txtDescErr').val();
	idToPoNumMap[poNum] = parseInt(checkedRow.attr('poid'));
    dataToProcess.push(poNum);
    processPoData(true);
});


function setLabel(userName){
	var userArr = ['sunil','ajay','todd','bharathan'];
	var roleObj = {'sunil':"IT Analyst",'ajay':"IT Analyst",'todd':"Bus Relationship Sr Mgr IT GISC HQ IT",'bharathan':"Sr Solution Architect Info Technology Architecture"};
	$("#roleLabel").text(roleObj[userName]);
	var userStr = userName.charAt(0).toUpperCase() + userName.slice(1);
	$("#userLabel").text(userStr);
	
}

function successLogin(){
	$("#loginContent").css("display","none");
	$("#mainContent, #main1").css("display","block");
	//jQuery('table.highchart').empty();
	
	if($(".highcharts-container") && $(".highcharts-container").length === 0){
		jQuery('table.highchart').highchartTable({
			yAxis: [{
				lineWidth: 1,
				max: 8,
				min: 0,
				title: { text: 'yAxis' }
			}]

		});
	}
	
	
}




function onLogin(username, signOut){
	var isLogin, refresh = true;
	if(username){
		isLogin = true;
	}
	else{
		username = null;
		isLogin = false
	}
	if(signOut){
		refresh = false;
		isLogin = false;
	}
	var objLogin = {refresh: refresh, login:isLogin,username:username};
	jQuery.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': 'isLogin',
    'data': JSON.stringify(objLogin),
    'dataType': 'json',
    'success': function(data){
		if(data.login){
			setLabel(data.username);
			successLogin();
		}
		else{
			if(!signOut){
				$("#loginContent").css("display","block");
			}
			
		}
	 }
	});
	
}

onLogin();



