function Grid(gridArray,id){
	
			var gridObj = gridArray[0];
			var parentDiv = "<div><table style='border:1px solid black;border-collapse: collapse;'>";
				for(var prop in gridObj){
					parentDiv +="<th style='border:1px solid black;'>"+prop+"</th>"
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
