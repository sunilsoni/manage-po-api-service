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
    pullPoData();
});

$('#processPoDataBtn').click(function() {
    processPoData();
});



function pullPoData() {
    debugger;
    if ($('#error2').length > 0) {
        //this block executes only if error2 exists in dom.
        $('#error2').remove();
    }

    var settings = {
        async: true,

        crossDomain: true,
        url: "/pullPoData",
        method: "POST",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "c54e1080-38f2-b49b-e16c-dfd195d94f79"
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
        debugger;

        if (response) {
            serverResponse = response;
            console.log('Response after pulling data:');
            console.log(response);
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
            $('#actionRequiredTable').append(
                '<tr>' +
                '<td id="error2">' +
                '<p style="color: red">•&nbsp;&nbsp;&nbsp;Could not pull PO Data. Please retry the action.</p>' +
                '</td>' +
                '</tr>');

        }
    });



}; //pullPoData

$("#myGrid").on('click', ".checkbox-button", function() {
    //debugger;
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
    debugger;

    if ($('#processMessage2').length > 0) {
        $('#processMessage2').remove();
    } else if ($('#error3').length > 0) {
        $('#error3').remove();
    } else if ($('#error4').length > 0) {
        $('#error4').remove();
    }


    if (dataToProcess.length <= 0) {
        console.log('No Data to process');
        $('#actionRequiredTable').append(
            '<tr>' +
            '<td id="error3">' +
            '<p style="color: red">•&nbsp;&nbsp;&nbsp;No data was selected for processing. Please select rows for processing from below grid using the checkboxes.</p>' +
            '</td>' +
            '</tr>');
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
                $('#actionRequiredTable').append(
                    '<tr>' +
                    '<td id="processMessage2">' +
                    '<p style="color: green">•&nbsp;&nbsp;&nbsp;Selected PO number(s) sent for processing.</p>' +
                    '</td>' +
                    '</tr>');

            },
            'error': function() {
                console.log('ERROR processing data');
            }
        }; //settings

        /*dataType: 'jsonp',*/

        $.ajax(settings).done(function(response) {
            debugger;
            if (response) {
                serverResponse = response;
                console.log('Response after processing:');
                console.log(response);
                var processedServerResponse = response;
                if (!processedServerResponse["error"]) {
                    updateGrid(processedServerResponse["poNumToStatus"]);
                } else {
                    $('#actionRequiredTable').append(
                        '<tr>' +
                        '<td id="error4">' +
                        '<p style="color: red">•&nbsp;&nbsp;&nbsp;The server responded with an error.</p>' +
                        '<p style="color: red">•&nbsp;&nbsp;&nbsp;' + processedServerResponse["errorMsg"] + '.</p>' +
                        '</td>' +
                        '</tr>');
                    return;
                }

            }
        });
    }
 dataToProcess = [];
}; //processPoData

function updateGrid(processedServerResponse) {
   // debugger;
    //re-prepare the data based on server response
    for(psrIdx in processedServerResponse){
        for(dgIdx in dataGlobal){
            if(dataGlobal[dgIdx]["poNum"] === Number(psrIdx)){

                dataGlobal[dgIdx]["status"] = processedServerResponse[psrIdx];
            }
        }//dataGlobal
    }//psr
    createGrid(dataGlobal);

};//updateGrid