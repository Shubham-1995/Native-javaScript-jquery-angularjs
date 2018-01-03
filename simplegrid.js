<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<div id="div1"></div>

<script>
function Grid(gridArray,id){
	
			var gridObj = gridArray[0];
			var parentDiv = "<div><table style='border:1px solid black;border-collapse: collapse;'>";
				for(var prop in gridObj){
					parentDiv +="<th onclick='getPopup(event);' style='border:1px solid black;'>"+prop+"</th>"
				}
				for(var i=0;i<gridArray.length;i++){
					parentDiv += "<tr>";
					var arrObject = gridArray[i];
					for(var j in arrObject){
							var prop = arrObject[j];
							parentDiv +="<td style='border:1px solid black;'>"+prop+"</td>";
					}
					parentDiv += "</tr>";
				}
				parentDiv += "</table></div>";
				
	document.getElementById(id).innerHTML=parentDiv;
}
function getPopup(e){
var pop = createFilterPopUp();
e.target.appendChild(pop);
}
	
function createFilterPopUp(){
		
		var searchingWayArr = [{id:0,name:'StartWith'},{id:1,name:'EndWith'},{id:2,name:'Contains'},{id:3,name:'Equals'},{id:4,name:'NotEquals'}];
		
		var popUpObject = document.createElement("div");
		popUpObject.setAttribute("class","FilterDiv");
		
		var searchInput = document.createElement("input");
		searchInput.setAttribute('class','Inputsearch');
		searchInput.setAttribute('type','text');
		searchInput.setAttribute('placeholder','Search');
		searchInput.setAttribute('style','width: 94%;height: 24px;margin: 0 auto;display: block;padding: 5px;border: 1px solid #9c9c9c; color:#000;background-color: #fff;');
		searchInput.onkeyup = self.recordFilter;
		
		var dropDownSearchWay = document.createElement('select');
		dropDownSearchWay.setAttribute('style','width: 94%; font-weight:600; background-color: #fff; color: #9c9c9c; margin: 0 auto;display: block;height: 24px; margin-top: 8px;margin-bottom: 8px; border: 1px solid #9c9c9c;');
		dropDownSearchWay.onchange = self.changeSearchWay;
		
		$.each(searchingWayArr,function(){
			var optionSearch = document.createElement('option');
			optionSearch.setAttribute('value',this.id);
			optionSearch.setAttribute('class','');
			optionSearch.innerText  = this.name;
			dropDownSearchWay.appendChild(optionSearch);
		});
		
		var createTableDiv = document.createElement('div');
		createTableDiv.setAttribute('class','table-layout');
		
		var domTable = document.createElement('table');
		domTable.setAttribute('class','sag-table_member');
		domTable.setAttribute('border','1px');
		createTableDiv.appendChild(domTable);
		
		var divMainBottom = document.createElement('div');
		divMainBottom.setAttribute('class','div_all');
		divMainBottom.setAttribute('style','');
		
		var childBottomDiv = document.createElement('div');
		childBottomDiv.setAttribute('class','Single-Check');
		childBottomDiv.setAttribute('style','height: 10px;display : none;width: 10px;background: #0720ea;float: left; margin-top: 4px;margin-left: 4px;margin-right: 4px;');
		childBottomDiv.onclick = self.manageCheckBox;
		
		var inputBottom = document.createElement('input');
		inputBottom.setAttribute('class','AllCheck');
		inputBottom.setAttribute('type','checkbox');
		inputBottom.setAttribute('style','display :');
		inputBottom.setAttribute('checked',false);
		inputBottom.onclick = self.manageCheckBox;
		
		var labelElement = document.createElement('label');
		labelElement.innerText="All";
		
		divMainBottom.appendChild(childBottomDiv);
		divMainBottom.appendChild(inputBottom);
		divMainBottom.appendChild(labelElement);
		
		var lastBottomDiv = document.createElement('div');
		lastBottomDiv.setAttribute('class', 'sag-grid-Filter');
		
		var confirmButton = document.createElement('button');
		confirmButton.setAttribute('type','button');
		confirmButton.setAttribute('class','btn-col');
		confirmButton.innerText="Ok";
		confirmButton.onclick = self.applyFilterGrid;
		
		var cancelButton = document.createElement('button');
		cancelButton.setAttribute('type','button');
		cancelButton.setAttribute('class','btn-col');
		cancelButton.innerText = "Cancel";
		cancelButton.onclick = self.manageCheckBox;
		
		lastBottomDiv.appendChild(confirmButton);
		lastBottomDiv.appendChild(cancelButton);
		
		popUpObject.appendChild(searchInput);
		popUpObject.appendChild(dropDownSearchWay);
		popUpObject.appendChild(createTableDiv);
		popUpObject.appendChild(divMainBottom);
		popUpObject.appendChild(lastBottomDiv);
		
		return popUpObject;
	}
	
	var arr =  [
	 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        },
 {
          "inum": "INV0000057",
          "idt": "24-03-2017",
          "val": 729248.16,
          "pos": "06",
          "rchrg": "N",
          "inv_typ": "R"
        }
  ];
  Grid(arr,'div1');
	</script>
