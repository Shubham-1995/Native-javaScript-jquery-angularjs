
		caseForCheckbox : "Pagination",
		dataObject :{},
		flagAllChecked:false,
		flagPageChecked:false,
		mainGridObject:{},
		PageNumber:1,
		mainCheckedArray:[],
		unCheckCase:false,
		checkBoxCheckCase:"allDataSelected",
		haveCheckBox : function(gridDom,gridRecord){
			var getParentCheckbox = $(gridDom).find('th.checkbox-hiddenClass')[0], recordArr = [],
			 getCheckBox = $(getParentCheckbox).find('input[type = "checkbox"]')[0];		
			if(getParentCheckbox){	
				if(getCheckBox){
					return true;
				}else{
					return false;
				}
			}else if(gridRecord !=undefined){
				if(gridRecord.hasOwnProperty('rowDef')){
				recordArr = gridRecord['rowDef'];
				if(recordArr !=undefined && recordArr.length>0){
					for(var i=0;i<recordArr.length;i++){
						if(recordArr[i].hasOwnProperty('checkbox')){
							return true;
						}else{
							return false;
						}
					}
				}
			}
		}else{
			return false;
		}		
		},
		setData : function(key,value){
			this.dataObject[key] = value;
		},
		mainCheckBoxEvent:function(mainCheckbox,allGridObject){
			var gridObject = $(mainCheckbox).parentsUntil('.main-container'),
				checkBox = $(gridObject).find('table tbody input[type="checkbox"]'), 
				className = $(checkBox[0]).prop('class'),
				totalRecord =workOnCheckBox.getData('headerCheckbox')?workOnCheckBox.getData('headerCheckbox'):[],selfObject = this;
			
			$('.'+className).click(function(){
				switch(selfObject.checkBoxCheckCase){
				case "pageWiseData":
					if($(this).prop('checked')){
						if($('.'+className+':checked').length == checkBox.length){
							$(mainCheckbox).prop('checked',true);
						}
					}else{
						$(mainCheckbox).prop('checked',false);
					}
					if(mainCheckbox.checked)
						selfObject.flagPageChecked = true;
					else
						selfObject.flagPageChecked = false;
					
					selfObject.deleteData('pageWiseData'+selfObject.PageNumber);
					selfObject.setData('pageWiseData'+selfObject.PageNumber,selfObject.flagPageChecked);
					break;
				case "allDataSelected":
						selfObject.trChckAllPage(mainCheckbox,this,allGridObject);  
					break;
				}
			});

			mainCheckbox.onclick = function(){
				totalRecord =[];
				for(var i=0;i<checkBox.length;i++){
					checkBox[i].checked = this.checked;
				}
				switch(selfObject.checkBoxCheckCase){
				case "pageWiseData":
					if(this.checked)
						selfObject.flagPageChecked = true;
					else
						selfObject.flagPageChecked = false;
					
					selfObject.deleteData('pageWiseData'+selfObject.PageNumber);
					selfObject.setData('pageWiseData'+selfObject.PageNumber,selfObject.flagPageChecked);
						break;
				case "allDataSelected":	
					selfObject.flagAllChecked = this.checked;
					if('rowDef' in allGridObject){
						if(allGridObject['rowDef'] != undefined && allGridObject['rowDef'].length >0){
							for(var j=0;j<allGridObject['rowDef'].length;j++){
								if('checkbox' in allGridObject['rowDef'][j]){
									checkBoxElement = allGridObject['rowDef'][j]['checkbox'];
									initialIndex = checkBoxElement.indexOf('<');
									switch(this.checked){
									case true:
										if(allGridObject['rowDef'][j]['checkbox'].endsWith(" checked/>")){
											finalIndex = checkBoxElement.indexOf('checked'); 
											domString = checkBoxElement.substring(initialIndex,finalIndex);
											allGridObject['rowDef'][j]['checkbox'] = domString+" checked/>";
										}else{
											finalIndex = checkBoxElement.indexOf('/') != -1?checkBoxElement.indexOf('/'):checkBoxElement.indexOf('>');
											domString = checkBoxElement.substring(initialIndex,finalIndex);
											allGridObject['rowDef'][j]['checkbox'] = domString+" checked/>";
										}
										totalRecord.push(allGridObject['rowDef'][j]);
										selfObject.mainCheckedArray.push(allGridObject['rowDef'][j]);
										break;
									case false:
								
										if(allGridObject['rowDef'][j]['checkbox'].endsWith(" checked/>")){
											finalIndex = checkBoxElement.indexOf('checked');
											domString = checkBoxElement.substring(initialIndex,finalIndex);
											allGridObject['rowDef'][j]['checkbox'] = domString+"/>";
										}else{
											finalIndex = checkBoxElement.indexOf('/') != -1?checkBoxElement.indexOf('/'):checkBoxElement.indexOf('>');
											domString = checkBoxElement.substring(initialIndex,finalIndex);
											allGridObject['rowDef'][j]['checkbox'] = domString+"/>";
										}
										totalRecord= [];
										selfObject.mainCheckedArray=[];
										break;
									}						
								}
							}
						}
					}
					
					selfObject.deleteData('headerCheckbox');
					selfObject.setData('headerCheckbox',totalRecord);
					break;
				}
			}
		},
			searchCheckColumnWise:function(allGridRecord){
				var initCheckbox, uptoCheckbox,
				getSubCheckbox, checkedRecord = workOnCheckBox.getData('checkedRecord');
				
				if(allGridRecord instanceof Array){
					if(allGridRecord != undefined && allGridRecord.length>0){
						for(var checkbox=0;checkbox<allGridRecord.length;checkbox++){
							var flagEntry = false;
							if(checkedRecord != undefined && checkedRecord.length>0){
								for(var checked=0;checked<checkedRecord.length;checked++){
									if(workOnCheckBox.isEquals(checkedRecord[checked],allGridRecord[checkbox])){
										initCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('<');
										if(allGridRecord[checkbox]['checkbox'].endsWith(' checked/>')){
											uptoCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('checked');
											getSubCheckbox = allGridRecord[checkbox]['checkbox'].substring(initCheckbox,uptoCheckbox);
											allGridRecord[checkbox]['checkbox'] = getSubCheckbox+" checked/>";
										}else{
											uptoCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('/') != -1?allGridRecord[checkbox]['checkbox'].indexOf('/'):allGridRecord[checkbox]['checkbox'].indexOf('>');
											getSubCheckbox = allGridRecord[checkbox]['checkbox'].substring(initCheckbox,uptoCheckbox);
											allGridRecord[checkbox]['checkbox'] = getSubCheckbox+" checked/>";
										}
										flagEntry = true;
										break;
									}else{
										continue;
									}
								}
								if(!flagEntry){
									initCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('<');
									if(allGridRecord[checkbox]['checkbox'].endsWith(" checked/>")){
										uptoCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('checked');
										getSubCheckbox = allGridRecord[checkbox]['checkbox'].substring(initCheckbox,uptoCheckbox);
										allGridRecord[checkbox]['checkbox'] = getSubCheckbox+"/>";
									}else{
										uptoCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('/') != -1?allGridRecord[checkbox]['checkbox'].indexOf('/'):allGridRecord[checkbox]['checkbox'].indexOf('>');
										getSubCheckbox = allGridRecord[checkbox]['checkbox'].substring(initCheckbox,uptoCheckbox);
										allGridRecord[checkbox]['checkbox'] = getSubCheckbox+"/>";
									}
								}
							}else{
								initCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('<');
								if(allGridRecord[checkbox]['checkbox'].endsWith(" checked/>")){
									uptoCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('checked');
									getSubCheckbox = allGridRecord[checkbox]['checkbox'].substring(initCheckbox,uptoCheckbox);
									allGridRecord[checkbox]['checkbox'] = getSubCheckbox+"/>";
								}else{
									uptoCheckbox = allGridRecord[checkbox]['checkbox'].indexOf('/') != -1?allGridRecord[checkbox]['checkbox'].indexOf('/'):allGridRecord[checkbox]['checkbox'].indexOf('>');
									getSubCheckbox = allGridRecord[checkbox]['checkbox'].substring(initCheckbox,uptoCheckbox);
									allGridRecord[checkbox]['checkbox'] = getSubCheckbox+"/>";
								}
								
							}
						}
					}
				}
				return allGridRecord;
			},
		caseForElementExist:function(matchObject){
			var returnObject = {};
			if(workOnCheckBox.mainCheckedArray !=undefined && workOnCheckBox.mainCheckedArray.length>0){
				for(var obj=0;obj<workOnCheckBox.mainCheckedArray.length;obj++){
					if(workOnCheckBox.isEquals(matchObject,workOnCheckBox.mainCheckedArray[obj])){
						returnObject['status']=true;
						returnObject['index'] = obj;
						break;
					}
					else{
						returnObject['status']=false;
						returnObject['index'] = obj;	
					}		
				}	
			}else{
				console.log('%c Oh my heavens! ', 'background: #222; color: #bada55',
			            'more text');
			}
			return returnObject;
		},
		setcheckBoxAttr:function(sagGrid,var_gridobj){
			workOnCheckBox.mainGridObject = sagGrid;
			var sagGridObject = workOnCheckBox.mainGridObject['var_gridobj'],
				gettableHead = $(sagGridObject).find('th.checkbox-hiddenClass')[0],
				elementCheckbox = $(sagGridObject).find('table tbody input[type="checkbox"]')?
						$(sagGridObject).find('table tbody input[type="checkbox"]'):document.querySelectorAll('.'+className), 
				className = $(elementCheckbox[0]).prop('class');
			
			if(gettableHead){
				var getCheckboxElement = $(gettableHead).find('input[type = "checkbox"]')[0];
				if(workOnCheckBox.checkBoxCheckCase == "allDataSelected"){
					if(!workOnCheckBox.flagAllChecked){
						if(workOnCheckBox.caseForCheckbox == "searchSortCase"){
							var allCheckboxCase = workOnCheckBox.flagAllChecked;
							if($('.'+className+':checked').length == elementCheckbox.length){
								$(getCheckboxElement).prop('checked',true);
							}else{
								$(getCheckboxElement).prop('checked',false);
							}
							if(workOnCheckBox.unCheckCase){
								workOnCheckBox.caseForCheckbox = "Pagination";
								workOnCheckBox.flagAllChecked = allCheckboxCase;
								getCheckboxElement.checked = allCheckboxCase;
								workOnCheckBox.unCheckCase = false;
							}
						}else{
							workOnCheckBox.flagAllChecked = false;
						}
					}else{
						getCheckboxElement.checked = workOnCheckBox.flagAllChecked;
						for(var j=0;j<elementCheckbox.length;j++){
							elementCheckbox[j].checked = workOnCheckBox.flagAllChecked;
						}
					}
				}else{
					workOnCheckBox.flagPageChecked = workOnCheckBox.getData('pageWiseData'+workOnCheckBox.PageNumber);
					if(workOnCheckBox.caseForCheckbox == 'Pagination'){
						if(workOnCheckBox.flagPageChecked){
							getCheckboxElement.checked = true;
						}else{
							getCheckboxElement.checked = false;
						}
					}else{
							if($('.'+className+':checked').length == elementCheckbox.length){
								$(getCheckboxElement).prop('checked',true);
							}else{
								$(getCheckboxElement).prop('checked',false);
							}	
					}
				
				}
				if(getCheckboxElement)
					workOnCheckBox.mainCheckBoxEvent(getCheckboxElement,var_gridobj);
			}
			
		},
		trChckAllPage:function(headCheckbox,checkbox,wholeGridRecord){
			var getRecord = workOnCheckBox.getData('headerCheckbox')&& workOnCheckBox.getData('headerCheckbox').length>0?
					workOnCheckBox.getData('headerCheckbox'):
				    'rowDef' in wholeGridRecord?wholeGridRecord['rowDef']:[],childCheckboxElement,
					tr = checkbox.parentElement.parentElement,initialCheckboxIndex,
					finalcheckboxIndex,getgridDomCheckbox,
					rowDataObject = workOnCheckBox.mainGridObject.getRowData(tr.firstElementChild.getAttribute('index'));
					
						if(getRecord != undefined && getRecord.length>0){
							for(var tr=0;tr<getRecord.length;tr++){
								if('checkbox' in getRecord[tr]){
									childCheckboxElement = getRecord[tr]['checkbox'];
									initialCheckboxIndex = childCheckboxElement.indexOf('<');
									if(workOnCheckBox.isEquals(getRecord[tr],rowDataObject)){
										if(checkbox.checked){
											if(childCheckboxElement.endsWith(' checked/>')){
												finalcheckboxIndex = childCheckboxElement.indexOf(' checked/>');
												getgridDomCheckbox = childCheckboxElement.substring(initialCheckboxIndex,finalcheckboxIndex);
												getRecord[tr]['checkbox'] = getgridDomCheckbox+" checked/>";
											}else{
												finalcheckboxIndex = childCheckboxElement.indexOf('/') != -1?childCheckboxElement.indexOf('/'):childCheckboxElement.indexOf('>');
												getgridDomCheckbox = childCheckboxElement.substring(initialCheckboxIndex,finalcheckboxIndex);
												getRecord[tr]['checkbox'] = getgridDomCheckbox+" checked/>";
											}
											if(this.mainCheckedArray.length < getRecord.length){
												var getObject = this.caseForElementExist(getRecord[tr]);
												var status = getObject['status'];
												if(!status)
													workOnCheckBox.mainCheckedArray.push(getRecord[tr]);
												
											}
										
												
										}else{
											if(childCheckboxElement.endsWith(' checked/>')){
												finalcheckboxIndex = childCheckboxElement.indexOf(' checked/>');
												getgridDomCheckbox = childCheckboxElement.substring(initialCheckboxIndex,finalcheckboxIndex);
												getRecord[tr]['checkbox'] = getgridDomCheckbox+"/>";
											}else{
												finalcheckboxIndex = childCheckboxElement.indexOf('/') != -1?childCheckboxElement.indexOf('/'):childCheckboxElement.indexOf('>');
												getgridDomCheckbox = childCheckboxElement.substring(initialCheckboxIndex,finalcheckboxIndex);
												getRecord[tr]['checkbox'] = getgridDomCheckbox+"/>";
											}
											if(this.mainCheckedArray.length <= getRecord.length || this.mainCheckedArray.length>0){
												var getObject = this.caseForElementExist(getRecord[tr]);
												var status = getObject['status'];
												var index = getObject['index'];
												if(status)
													workOnCheckBox.mainCheckedArray.splice(index,1);
											}
										}
									}
								}
							}
						}
						
					if(workOnCheckBox.mainCheckedArray.length == getRecord.length){
						headCheckbox.checked = true;
						workOnCheckBox.flagAllChecked = true;
					}else{
						headCheckbox.checked = false;
						workOnCheckBox.flagAllChecked  = false;
					}
					workOnCheckBox.deleteData('headerCheckbox');
					workOnCheckBox.setData('headerCheckbox',getRecord);
					getRecord =[];
			},
		getCheckedCheckbox:function(){
			var allPageCheckBox = [];
			if(workOnCheckBox.checkBoxCheckCase == "allDataSelected"){
				allPageCheckBox = workOnCheckBox.getData('headerCheckbox');
				return allPageCheckBox;
			}
			
		},
		isEquals:function(obj1,obj2){
			
			var keyObj1 = Object.getOwnPropertyNames(obj1),
				keyObj2 = Object.getOwnPropertyNames(obj2),isHtml;
			var counter = 0 ;
			if((keyObj1 != undefined && keyObj1.length > 0 )&&(keyObj2 !=undefined && keyObj2.length > 0)){
				if(keyObj1.length == keyObj2.length){
					 for(var key=0;key<keyObj1.length;key++){
						 var property = keyObj1[key], 
						 value = obj1[property],
						 isHtml = false,
						 getType = typeof value;
						 if(getType == 'string'){
							 isHtml = (function(str){
							   var dom   = document.createElement('div');
						   dom.innerHTML = str;
							   var child = dom.childNodes;
							   for (var i = child.length; i--; ) {
							        if (child[i].nodeType == 1) 
							        	return true;
							    }
							    return false;  	  	   
							  })(value);
						   }
						 if(!isHtml){
							 if(value && obj2[property]){
								 if(value !="" && obj2[property] !=""){
									 if(property == "sno"){
										 continue;
									 }else if(obj1[property] != obj2[property]){
										 return false;
									 } 
								 }else{
									 counter++;
								 } 
							 }else{
								 counter++;
							 }
						 } 
					 }
				 }else{
					 if(keyObj2.length > keyObj1.length){
						 for(var prop in obj2){
							 if(prop in obj1){
								 var mainObject = obj1[prop],
								 getType = typeof mainObject,
								 isHtml = false;
								 if(getType == 'string'){
									 isHtml = (function(stringVal){
										 var domObject = document.createElement('div');
										 	 domObject.innerHTML = stringVal;
										 var element = domObject.childNodes;
										 		for(var k=element.length;k--;){
											 		 if(element[k].nodeType == 1)
											 			 return true;
											 	 }
											 	 return false;	 	 
									 })(mainObject);
								 }
								 if(!isHtml){
									 if(mainObject && obj2[prop]){
										 if(mainObject !="" && obj2[prop] !=""){
											 if(prop == "sno")
												 continue;
											 else if(obj1[prop] != obj2[prop])
												 return false; 
										 }else{
											 counter++;
										 } 
									 }else{
										 counter++;
									 }
								 }
							 }else{
								 continue;
							 }
						 }
					 }
				 }
			}
			if(counter == keyObj1.length){
				return false;
			}
			
			return true;
		},
		deleteData : function(key){
			delete this.dataObject[key];
		},
		dataSetProcess : function(currentPage,gridArray){

			var indexArr =[], domObject, tdCheckBox ='',
		    allGridCheckeRecord =workOnCheckBox.getData('checkedRecord')?
		    		workOnCheckBox.getData('checkedRecord'):[],
		    collectIndex = [], className = '',checkBoxObj,
		    domCheckBox, equalObject,parser = new DOMParser();
		    		workOnCheckBox.PageNumber = currentPage;
		    
			if(Object.prototype.toString.call(gridArray) == '[object Array]'){	 
				if(gridArray != undefined && gridArray.length>0){	 
					for(var tr=0;tr<gridArray.length;tr++){
						if(gridArray[tr].hasOwnProperty('checkbox')){
							 tdCheckBox = gridArray[tr]['checkbox'];
							 domObject = parser.parseFromString(tdCheckBox,'text/html');
							 className = domObject.querySelector('body').firstChild.getAttribute('class');
							 checkBoxObj = document.getElementsByClassName(className);
							 if(checkBoxObj != undefined && checkBoxObj.length>0){
								 domCheckBox = checkBoxObj[tr.toString()];
								 if(domCheckBox != undefined){
									 if(domCheckBox.checked == true){
										 switch(workOnCheckBox.caseForCheckbox){
										 case "searchSortCase":
											 var boolArr =[];
											 var matchCounter=0;
											 var unMatchCounter =0;
											 if(allGridCheckeRecord != undefined && allGridCheckeRecord.length>0){
												 for(var checkedRecord = 0;checkedRecord<allGridCheckeRecord.length;checkedRecord++){
													  equalObject = workOnCheckBox.isEquals(allGridCheckeRecord[checkedRecord],gridArray[tr]);
													  boolArr.push(equalObject);
												 }
												 for(var bool=0;bool<boolArr.length;bool++){
													 if(boolArr[bool])
														 matchCounter++;
													 else
														 unMatchCounter++;
												 }
													if(unMatchCounter == allGridCheckeRecord.length)
														 allGridCheckeRecord.push(gridArray[tr]);
											 }else{
												 allGridCheckeRecord.push(gridArray[tr]);
											 }
											 break;
										 case "Pagination":
											 indexArr.push(tr);
											 break; 
										 }			 
									 }else{
										 if(allGridCheckeRecord != undefined && allGridCheckeRecord.length>0){
											 for(var chcks=0;chcks<allGridCheckeRecord.length;chcks++){
												 equalObject = workOnCheckBox.isEquals(allGridCheckeRecord[chcks],gridArray[tr]); 
												 if(equalObject)
													 allGridCheckeRecord.splice(chcks,1); 
											 }
										 }
									 } 
								  } 
							 }
						}
					}
				}
			}  
			workOnCheckBox.setData("checkedRecord",allGridCheckeRecord);
			workOnCheckBox.deleteData(currentPage);
			workOnCheckBox.setData(currentPage,indexArr);
				 indexArr =[];
				 allGridCheckeRecord=[];
			},
			getData : function(key){
				return this.dataObject[key];
			},	
			dataGetProcess:function(page,getGridArray){
					var getIndexArr = workOnCheckBox.getData(page), checkBox ='', 
						getDOMString ='',strUptoLength, initStrLength;
					workOnCheckBox.PageNumber = page;
				if(getGridArray !=undefined && getGridArray.length > 0 ){
					for(var totalIndex=0; totalIndex<getGridArray.length;totalIndex++){
						var flagEntry = false;
						if(getIndexArr != undefined && getIndexArr.length > 0){
							for(var checkedIndex=0;checkedIndex<getIndexArr.length;checkedIndex++){
								if(getGridArray[totalIndex].hasOwnProperty('checkbox')){
									if(totalIndex == getIndexArr[checkedIndex]){
										 checkBox = getGridArray[totalIndex].checkbox;
										 initStrLength = checkBox.indexOf('<');
										 if(getGridArray[totalIndex].checkbox.endsWith(' checked/>')){
											 strUptoLength = checkBox.indexOf('checked');
											 getDOMString = checkBox.substring(initStrLength,strUptoLength);
											 getGridArray[totalIndex].checkbox = getDOMString + " checked/>";
										 }else{
											 strUptoLength = checkBox.indexOf('/') != -1 ? checkBox.indexOf('/'):checkBox.indexOf('>');
											 getDOMString = checkBox.substring(initStrLength,strUptoLength);
											 getGridArray[totalIndex].checkbox = getDOMString + " checked/>"; 
										 }
										 flagEntry = true;
										 break;		
									}
									else{
										continue;								
									}
								}	
							} 
							if(!flagEntry){
								checkBox = getGridArray[totalIndex].checkbox;
								initStrLength = checkBox.indexOf('<');
								if(getGridArray[totalIndex].checkbox.endsWith(" checked/>")){
									 strUptoLength = checkBox.indexOf('checked');
									 getDOMString = checkBox.substring(initStrLength,strUptoLength);
									 getGridArray[totalIndex].checkbox = getDOMString + "/> ";
								
								}else{	
									strUptoLength = checkBox.indexOf('/') != -1 ? checkBox.indexOf('/'):checkBox.indexOf('>');
									getDOMString = checkBox.substring(initStrLength,strUptoLength);
									getGridArray[totalIndex].checkbox = getDOMString + "/> ";
								
								}
							}
						}else{
							if(getGridArray[totalIndex].hasOwnProperty('checkbox')){
								checkBox = getGridArray[totalIndex].checkbox;
								initStrLength = checkBox.indexOf('<');
								if(checkBox.endsWith(" checked/>")){
									 strUptoLength = checkBox.indexOf('checked');
									 getDOMString = checkBox.substring(initStrLength,strUptoLength);
									 getGridArray[totalIndex].checkbox = getDOMString + "/> ";
								}else{
									strUptoLength = checkBox.indexOf('/') != -1 ? checkBox.indexOf('/'):checkBox.indexOf('>');
									getDOMString = checkBox.substring(initStrLength,strUptoLength);
									getGridArray[totalIndex].checkbox = getDOMString + "/> ";
								}
							}	
						}	
						}
					}
					return getGridArray;
				},
				parseJson: function(object){
					if(object){
						var objProp = Object.getOwnPropertyNames(object);
						for(var i=0;i<objProp.length;i++){
							if(object[objProp[i]] !="" && object[objProp[i]] != undefined){
								if(!isNaN(object[objProp[i]]) && eval(object[objProp[i]]).toString().length == parseInt(eval(object[objProp[i]])).toString().length){
									object[objProp[i]] = parseInt(object[objProp[i]]);
								}else if(!isNaN(object[objProp[i]]) && !(eval(!isNaN(object[objProp[i]]) && eval(object[objProp[i]]).toString().length == parseInt(eval(object[objProp[i]])).toString().length)) && object[objProp[i]].toString().length > 0){
									object[objProp[i]] = parseFloat(object[objProp[i]]);
								}
							}else{
								object[objProp[i]] = "";
							}
							
						}
						return object;
					}
				},
				parseArrayJson:function(arrayObj){
					for(var j=0;j<arrayObj.length;j++){
						arrayObj[j] = workOnCheckBox.parseJson(arrayObj[j]);
					}
					return arrayObj;
				}
