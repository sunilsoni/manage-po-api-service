function createGrid(serverResponse) {
  console.log('in gridCreation.js file. new build');

  var columns = [{
    id: "poId",
    name: "Purchase Order Id",
    field: "poId",
    formatter: checkBoxFormatter,
    minWidth: 100
  }, {
    id: "poNum",
    name: "PO Number",
    field: "poNum",
    minWidth: 200
  }, {
    id: "poDesc",
    name: "PO Description",
    field: "poDesc",
    minWidth: 300
  }, {
    id: "dataSourceName",
    name: "Data Source",
    field: "dataSourceName",
    minWidth: 200
  }, {
    id: "statusVal",
    name: "Status",
    field: "statusVal",
    minWidth: 270
  }];
  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false
  };

  console.log('In createGrid');

  var data = prepareData(serverResponse);
  console.log(data);
  $.extend(dataGlobal,data);

  dataView = new Slick.Data.DataView();
  grid = new Slick.Grid("#myGrid", dataView, columns, options);
  /*grid.setSelectionModel(new Slick.RowSelectionModel());*/
  var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
  var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);


  //from: moreSlickGridCode START
  grid.onKeyDown.subscribe(function (e) {
    // select all rows on ctrl-a
    if (e.which != 65 || !e.ctrlKey) {
      return false;
    }
    var rows = [];
    for (var i = 0; i < dataView.getLength(); i++) {
      rows.push(i);
    }
    grid.setSelectedRows(rows);
    e.preventDefault();
  });

  // wire up model events to drive the grid
  dataView.onRowCountChanged.subscribe(function (e, args) {
    grid.updateRowCount();
    grid.render();
  });
  dataView.onRowsChanged.subscribe(function (e, args) {
    grid.invalidateRows(args.rows);
    grid.render();
  });
  dataView.onPagingInfoChanged.subscribe(function (e, pagingInfo) {
    var isLastPage = pagingInfo.pageNum == pagingInfo.totalPages - 1;
    var enableAddRow = isLastPage || pagingInfo.pageSize == 0;
    var options = grid.getOptions();
    if (options.enableAddRow != enableAddRow) {
      grid.setOptions({enableAddRow: enableAddRow});
    }
  });


  
  //dataView.beginUpdate();

  //dataView.endUpdate();
  // if you don't want the items that are not visible (due to being filtered out
  // or being on a different page) to stay selected, pass 'false' to the second arg
  //dataView.syncGridSelection(grid, true);
  //$("#gridContainer").resizable();
  //END

  // initialize the model after all the events have been hooked up
  dataView.beginUpdate()
  dataView.setItems(dataGlobal);
  dataView.setPagingOptions({pageSize: 10}); 
  dataView.endUpdate()
  
  if (grid) {
    var count = 0;
    //color the rows
    for(var idx in data){
      var statusVal = data[idx]['statusVal'];
      var rowColor = data[idx]['rowColor'];
      highlightRow(statusVal,idx,rowColor,count);
      count++;
    }
    console.log('Grid created');
  }

};

function prepareData(dataArray) {
  debugger;
  console.log('Data length: ' + dataArray.length);
  if (dataArray.length > 0) {
    for (var idx in dataArray) {
      var record = dataArray[idx];

      //better replace with ternary operator
      var statusCode = record['status'];
      var dataSourceCode = record['dataSource'];

      for(var i = 0; i< dataArray.length; i++){
                dataArray[i]["id"] = i;
            }

      switch (statusCode) {
        case 1:
          record['statusVal'] = "In-transit";
          record['rowColor'] = 'blue';
          break;
        case 2:
          record['statusVal'] = "Transaction Completed";
          record['rowColor'] = 'green';
          break;
        case 3:
          record['statusVal'] = "Error in Process";
          record['rowColor'] = 'red';
          break;
        default:
          record['statusVal'] = "In-transit";
          record['rowColor'] = 'blue';
          break;
      } //switch for status

      switch (dataSourceCode) {
        case 1:
          record['dataSourceName'] = "Symix";
          break;
        case 2:
          record['dataSourceName'] = "SAP";
          break;
        case 3:
          record['dataSourceName'] = "Oracle";
          break;
        default:
          record['dataSourceName'] = "Symix";
          break;
      } //switch for datasource
    } //for loop
    return dataArray;
  } else {
    console.log('No data received');
  }

}; //prepareData


function highlightRow(key, rowNumber,cssClass,count) {
  //removeRowHighlight(key) //remove any previous css
  
  row = rowNumber.toString();
  var obj = {
    poId: cssClass,
    poNum:cssClass,
    poDesc:cssClass,
    dataSourceName:cssClass,
    statusVal:cssClass
  };
  var rowObj = {};
  rowObj[row] = obj;
  //var errorHighlight;

  grid.setCellCssStyles(key+""+count, rowObj);
};

function removeRowHighlight(key) {
  grid.removeCellCssStyles(key);
}

function checkBoxFormatter(row, cell, value, columnDef, dataContext) {
  debugger;
    var value = dataContext["poId"];
    var poNumber = dataContext["poNum"]
    if (dataContext["status"] === 1 || dataContext["status"] === 3) {
        return "<input type='checkbox' class='checkbox-button' id='checkbox_" + row + "' name='po_"+ poNumber+"' value='" + value + "' >";
    }else if(dataContext["status"] === 2){
        return "<input type='checkbox' class='checkbox-button' id='checkbox_" + row + "' name='po_"+ poNumber+"' value='" + value + "' disabled>";
    }
};