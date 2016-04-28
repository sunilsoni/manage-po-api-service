/*
file: dataFecth.js
date: April 20, 2016
author: Anvesh Shaw
file purpose: fetch data and post data to server..
server calls: pullPoData, processPoData
*/
console.log('latest build : 1350 HRS');
var serverResponse = null;
var dataToProcess = [];
var grid;
var dataView;
var dataGlobal = [];

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

        dataToProcess.push(poNumber);
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

function processPoData() {
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
            poNums: dataToProcess
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
                if (!processedServerResponse["error"]) {
                    updateGrid(processedServerResponse["poNumToStatus"]);
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
 dataToProcess = [];
}; //processPoData

function updateGrid(processedServerResponse) {
    //re-prepare the data based on server response
    for(psrIdx in processedServerResponse){
        for(dgIdx in dataGlobal){
            if(dataGlobal[dgIdx]["poNum"] === psrIdx){

                dataGlobal[dgIdx]["status"] = processedServerResponse[psrIdx];
            }
        }//dataGlobal
    }//psr
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
	
	if(userName.val() === "sunil" || userName.val() === "ajay" || userName.val() === "todd" || userName.val() === "bharathan"){
			if(password.val() === "jcipoc"){
				$("#loginContent").css("display","none");
				$("#mainContent, #main1").css("display","block");
				jQuery('table.highchart').highchartTable({
					yAxis: [{
						lineWidth: 1,
						max: 8,
						min: 0,
						title: { text: 'yAxis' }
					}]

				});
				
				
			}
			else{
				toastr.error('Please enter the correct Password');
			}
	}
});

$("#errorBtn").click(function(e){
	e.preventDefault();
	
	$("#main1").css("display","none");
	$("#main2").css("display","block");
});

$("#goBack").click(function(e){
	e.preventDefault();
	
	$("#main1").css("display","block");
	$("#main2").css("display","none");
});