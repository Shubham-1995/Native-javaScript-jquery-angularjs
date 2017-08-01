/*
1.emailValidation : check valid or invalid email.
2.numericValidation : check value is numeric or not.
3.alphaNumericValidation : check value is alphanumeric or not.
4.stringValidation : check value is string or not.
5.alphaNumSpecialCharValidation : check special character with alphaNumeric is valid or not.
6.landlineNumberValidation : check landline number that be a valid number or not.
7.mobileNumberValidation : check mobile number that be a valid number or not.
8.panNumberValidation : check pan number is valid or not.
9.decimalNumberValidation : check decimal number is valid or not.
10.datePickerValidation : check date is valid or not.
11.uidNumberValidation : uid is valid or not.
12.cinglnNumberValidation: cin N gln is valid or not.
13.gstNumberValidation: gst number is valid or not.
14.passportValidation: passport number is valid or not.
15. applyColor : function to use apply color.
16.enterOnlyNumber : use to set only number.
*/
angular.module("myApp").service("globalServiceLibrary", function($http, $q) {	 
	 var globalServiceLibrary = this; // Service Object
	 var tooltipId; // Element ID
	 var TooltipElement;// DOM Object
	 var flag = false; // Boolean for return to user 
	 var dateFlag = false;
	 var errorType = 'error';
	 var successType = 'success';
	 var checkForUppercase = 0;
	 /*
	 functionName :  emailValidation
	 params@
	 emailValue: String : email model value,
	 min: Number : minimum constraint value,
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */		
	 globalServiceLibrary.emailValidation = function(emailValue, min, max, id, obj){
		 checkForUppercase = 0;
		 var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		 globalServiceLibrary.applyColor(id, successType);
		 tooltipId = id.replace("#", "");
		 TooltipElement = document.getElementById(tooltipId);	
		 TooltipElement.maxLength = max;
		 	if(!emailValue){
		 		flag = false;
		 		TooltipElement.title = "Email is required";
		 		globalServiceLibrary.applyColor(id, errorType);		 		
		 	}else if(emailValue.length < min){
		 		flag = false;
		 		TooltipElement.title = "Email length should be minimum " + min;
		 		globalServiceLibrary.applyColor(id, errorType);	 		
			}else if(emailValue.length > max){
		 		flag = false;
		 		TooltipElement.title = "Email length should be maximum " + max;
		 		globalServiceLibrary.applyColor(id, errorType);	 		
			}else if(!emailRegex.test(emailValue)){
				flag = false;
				TooltipElement.title = "Invalid email should be gstn@example.com";
				globalServiceLibrary.applyColor(id, errorType);			
			}else {
				flag = true;
				TooltipElement.title= titleOb;
				globalServiceLibrary.applyColor(id, successType);
			}		 	
			return flag;		 
	};	
	
	
	 /*
	 functionName :  numericValidation
	 params@
	 numValue: Number : number model value,
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.numericValidation = function(numValue,max, id){
		checkForUppercase = 0;
		var numRegex = /^(?:[1-9]\d*|\d)$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength = max;
		globalServiceLibrary.enterOnlyNumber(TooltipElement,0);
		if(!numValue){
			flag = false;
			TooltipElement.title = "This field value is required";
			globalServiceLibrary.applyColor(id, errorType);									
		}else if(numValue.length > max){
			flag = false;
		 	TooltipElement.title = "numeric value length should be maximum " + max;
		 	globalServiceLibrary.applyColor(id, errorType);
		}else if(numRegex.test(numValue)){
			flag = true;
			TooltipElement.title = "Number";
			globalServiceLibrary.applyColor(id, successType);
		}else {	
			flag = false;
			TooltipElement.title = "Please enter only number";
			globalServiceLibrary.applyColor(id, errorType);							
		}				
		return flag;		 
	};
	
	/*
	 functionName :  enterOnlyNumber
	 params@
	  domObject : HTML Element,
	 */
	
	 globalServiceLibrary.enterOnlyNumber = function(domObject,val){
		 if(isNaN(domObject.value)){
				domObject.value=null;
			}		 
			if(val == 1){
		 $('#' + domObject.id).keypress(function(event) {
			    var $this = $(this);
			    if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
			       ((event.which < 48 || event.which > 57) &&
			       (event.which != 0 && event.which != 8))) {
			           event.preventDefault();
			    }

			    var text = $(this).val();
			    if ((event.which == 46) && (text.indexOf('.') == -1)) {
			        setTimeout(function() {
			            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
			                $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
			            }
			        }, 1);
			    }
			    if ((text.indexOf('.') != -1) &&
			        (text.substring(text.indexOf('.')).length > 2) &&
			        (event.which != 0 && event.which != 8) &&
			        ($(this)[0].selectionStart >= text.length - 2)) {
			            event.preventDefault();
			    }      
			});
	 }else if(val ==0){
		 $('#' + domObject.id).keypress(function(event) {
			    var $this = $(this);
			    if ((event.which < 48 || event.which > 57) &&
			       (event.which != 0 && event.which != 8)) {
			           event.preventDefault();
			    }
	 });
		}
	 }
	 
	 globalServiceLibrary.dateFieldValidation = function(domObject){
		 
		 if( $('#' + domObject.id).val().length == 0 || $('#' + domObject.id).val().length == 3 || $('#' + domObject.id).val().length == 5){
							$('#' + domObject.id).keypress(function(e){
								if(e.keyCode == 47 || e.keyCode == 8){
									e.preventDefault();
								}
							});
		}
           $('#' + domObject.id).keyup(function(e){
                if (e.keyCode != 8){
			 var value = $(this).val();
            if ($(this).val().length == 1){
               $(this).val("0"+$(this).val());
            } else if ($(this).val().length == 2){
                 $(this).val($(this).val() + "/");
            }else if($(this).val().length == 4){
		$(this).val($(this).val().substring(0,3) + "0" +$(this).val().substring(3,4));
				
			}else if($(this).val().length == 5){
				 $(this).val($(this).val() + "/");
			}
        } else {
            
            if ($(this).val().length == 5){                
                $(this).val($(this).val().substring(0,4));    
            } else if ($(this).val().length == 2){        
                $(this).val($(this).val().substring(0,1));    
            }
        }
    
});
	 }
	 /*
	 functionName :  alphaNumericValidation
	 params@
	 modelValue: StringWithNumber : alphaModel model value,
	 min: Number : minimum constraint value,
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.alphaNumericValidation = function(modelValue, min, max, id){
		checkForUppercase = 0;
		var alphaNumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength = max;
		if(!modelValue){
			flag = false;
	 		TooltipElement.title = "This field value is required";	
			globalServiceLibrary.applyColor(id, errorType);
		}else if(modelValue.length < min){
	 		flag = false;
	 		TooltipElement.title = " Length should be minimum " + min;
			globalServiceLibrary.applyColor(id, errorType);	 		
		}else if(modelValue.length > max){
	 		flag = false;
	 		TooltipElement.title = "Length should be maximum " + max;
			globalServiceLibrary.applyColor(id, errorType);	 		
		}else if(!alphaNumericRegex.test(modelValue)){
			flag = false;
			TooltipElement.title = "Please enter alpha numeric value";
			globalServiceLibrary.applyColor(id, errorType);			
		}else {
			flag = true;
			TooltipElement.title = "Alpha Numeric";
			globalServiceLibrary.applyColor(id, successType);
		}	
		
		return flag; 
	};
	
	 /*
	 functionName :  stringValidation
	 params@
	 modelValue: String : stringModel model value,
	 min: Number : minimum constraint value,
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.stringValidation = function(modelValue, min, max, id){
		checkForUppercase = 0;
		var stringRegex = /^[A-z]+$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength = max;
		if(!modelValue){
			flag = false;
	 		TooltipElement.title = "This field value is required";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(modelValue.length < min){
			flag = false;
	 		TooltipElement.title = "Length should be minimum " + min;	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(!stringRegex.test(modelValue)) {
			flag = false;
	 		TooltipElement.title = "Please enter only characters";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(modelValue.length > max) {
			flag = false;
	 		TooltipElement.title = "Length should be maximum " + max;	
			globalServiceLibrary.applyColor(id, errorType);			
		}else {
			flag = true;
			TooltipElement.title = "String";
			globalServiceLibrary.applyColor(id, successType);		
		}		
		return flag; 
	};
	
	/*
	 functionName :  alphaNumSpecialCharValidation
	 params@
	 modelValue: String,Number with AlphaNumeric : strNumSpecCharModel model value,
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.alphaNumSpecialCharValidation = function(modelValue, max, id){
		checkForUppercase = 0;
		var alphaNumSpecialCharRegex = /^[ A-Za-z0-9_\/-]*$/;  //^[ A-Za-z0-9_@.#&+\/-]*$;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength = max;
		if(modelValue.length>0){
		if(!alphaNumSpecialCharRegex.test(modelValue)){
				TooltipElement.value = modelValue.substr(0, modelValue.length-1);
				globalServiceLibrary.applyColor(id, successType);	
			}
		$(id).keypress(function(event) {
			    var $this = $(this);
			    if ((event.which < 47 || event.which > 57) && (event.which < 65 || event.which > 90) && (event.which < 97 || event.which > 122) && 
			       (event.which != 95)) {
			           event.preventDefault();
			    }
	 });	
		}else{
			if(!alphaNumSpecialCharRegex.test(TooltipElement.value)){
				TooltipElement.value=null;
				globalServiceLibrary.applyColor(id, successType);	
			}
		$(id).keypress(function(event) {
			    var $this = $(this);
			    if ((event.which < 47 || event.which > 57) && (event.which < 65 || event.which > 90) && (event.which < 97 || event.which > 122) && 
			       (event.which != 95)) {
			           event.preventDefault();
			    }
	 });
		}
			
		if(!modelValue){
			flag = false;
	 		TooltipElement.title = "This field value is required";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(modelValue.length > max) {
			flag = false;
	 		TooltipElement.title = "Length should be maximum " + max;	
			globalServiceLibrary.applyColor(id, errorType);			
		}else {
			flag = true;			
			TooltipElement.title = "AlphaNumeric With SpecialCharacter";
			globalServiceLibrary.applyColor(id, successType);			
		}		
		return flag; 
	};
	
	/*
	 functionName :  landlineNumberValidation
	 params@
	 modelValue: Number : phoneModel model value like 0141-2205510 or 011-20000198 or 01411-205510
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
globalServiceLibrary.landlineNumberValidation = function(modelValue, id){	
	checkForUppercase = 0;
	var phoneNumberRegex = /^[0][1-9]{2}(-)[0-9]{8}$|^[0][1-9]{3}(-)[0-9]{7}$|^[0][1-9]{4}(-)[0-9]{6}$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =11;
		if(!modelValue){
			flag = false;
	 		TooltipElement.title = "This field value is required";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(!phoneNumberRegex.test(modelValue)) {
			flag = false;
	 		TooltipElement.title = "Landline number must contain areacode-subscriber number";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else {
			flag = true;			
			TooltipElement.title = "Phone Number";
			globalServiceLibrary.applyColor(id, successType);			
		}		
		return flag; 
	};
	
	/*
	 functionName :  mobileNumberValidation
	 params@
	 modelValue: Number : mobileModel model value like  9876543421
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.mobileNumberValidation = function(modelValue, id){	
		checkForUppercase = 0;
		var mobileNumberRegex = /^[1-9][0-9]{9}/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =10;
		if(!modelValue){
			flag = false;
	 		TooltipElement.title = "This field value is required";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(!mobileNumberRegex.test(modelValue)) {
			flag = false;
	 		TooltipElement.title = "Mobile number should be 10-digit number";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else {
			flag = true;			
			TooltipElement.title = "mobile Number";
			globalServiceLibrary.applyColor(id, successType);			
		}		
		return flag; 
	};
	
	/*
	 functionName :  panNumberValidation
	 params@
	 modelValue: Number : panModel model value like  ABCDE1234F
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.panNumberValidation = function(modelValue, id){
		checkForUppercase = 1;
		var panNumberRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =10;
		if(!modelValue){
			flag = false;
	 		TooltipElement.title = "This field value is required";	 		
			globalServiceLibrary.applyColor(id, errorType);
		}else if(!panNumberRegex.test(angular.uppercase(modelValue))) {
			flag = false;
	 		TooltipElement.title = "Pan number should be 5 alphabet,4 digit and 1 alphabet like(AFSER1234D)";	 
			globalServiceLibrary.applyColor(id, errorType);
		}else {
			flag = true;			
			TooltipElement.title = "pan Number";
			globalServiceLibrary.applyColor(id, successType);			
		}		
		return flag; 
	};
	
	
 /*
	 functionName :  decimalNumberValidation
	 params@
	 modelValue: float or integer  : number model value limit after decimal 2 like 1234.1 or 1234.12 or 1234546,
	 max: Number : maximum constraint value,
	 id: string : value of current field ID,
	 */
	
	globalServiceLibrary.decimalNumberValidation = function(modelValue,max, id){
		checkForUppercase = 0;
		
		
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		
		TooltipElement.maxLength =max;
		globalServiceLibrary.enterOnlyNumber(TooltipElement,1);		
		
	};	
	
	globalServiceLibrary.checkDeci = function(modelValue,max, id){
		var modelObject = {};
		var decimalNumberRegex = /^(?:[1-9]\d*|\d)$|^[0-9]+\.[0-9][0-9]$|^[0-9]+\.[0-9]$/;
		modelObject.modelValue = modelValue;
			if(modelObject.modelValue != undefined && modelObject.modelValue != "" && modelObject.modelValue != "." && !isNaN(modelObject.modelValue)){
				if(/\./.test(modelValue)){
					var pos = modelValue.indexOf(".");
					if(pos <= max){
						var str = '';
						var rts ='';
						for(var k=0;k<pos;k++){
							str += modelValue[k];
						}
						for(var x=1;x<=2;x++){
							if(modelValue[pos+x] == undefined){
								rts += '0';
							}else{
								rts += modelValue[pos+x];
							}
							
						}
						
						modelObject.modelValue = str+modelValue[pos]+rts;
					}else{
						var str = '';
						var rts ='';
						for(var k=0;k<max;k++){
							str += modelValue[k];
						}
							for(var x=1;x<=2;x++){
							if(modelValue[pos+x] == undefined){
								rts += '0';
							}else{
								rts += modelValue[pos+x];
							}
							
						}
						modelObject.modelValue = str+modelValue[pos]+rts;
					}
				}else{
			    if(modelValue.length < max){
					modelObject.modelValue= modelValue+'.00';	
				}
			}
			
				 if(modelObject.modelValue.length > max){
					modelObject.flag = false;
				 	TooltipElement.title = "Length should be maximum " + max;
				 	globalServiceLibrary.applyColor(id, errorType);
				}else if(!decimalNumberRegex.test(modelObject.modelValue)){
					modelObject.flag = false;
					TooltipElement.title = "Invalid number, can take two digit after .";
					globalServiceLibrary.applyColor(id, errorType);
					
				}else {	
					modelObject.flag = true;
					TooltipElement.title = "Decimal Number";
					globalServiceLibrary.applyColor(id, successType);						
				}
			
						
		}else{
				modelObject.modelValue = null;
			}
		
			return modelObject;	
	}
	
	/*
	 functionName :  leapYear
	 params@
	 year: number  : year value,
	 */
	globalServiceLibrary.leapYear = function(year) {
		var leapFlag;
		if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
			leapFlag = true;
		}else {
			leapFlag = false;
		}
		return leapFlag;
	}
	
	/*
	 functionName :  datePickerValidation
	 params@
	 modelValue: date  : date value,
	 id: string : value of current field ID,
	 */
	globalServiceLibrary.datePickerValidation = function(modelValue, id){
		checkForUppercase = 0;
		var dtArray;
		tooltipId = id.replace("#", "");
		var TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =10;
		globalServiceLibrary.dateFieldValidation(TooltipElement);
		if(modelValue){
			dtArray = modelValue.match(/^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/);	
		}		
		if(!dtArray || dtArray === null){
			globalServiceLibrary.applyColor(id, errorType);								
			 TooltipElement.title= "Please Enter valid date";
			 dateFlag = false;
	    } else {	    	
			var flagCheck = globalServiceLibrary.leapYear(parseInt(modelValue.slice(-4)));			
	    	 if(angular.isArray(dtArray) && dtArray.length === 3 && dtArray[2] == 1 || dtArray[2] == 3 || dtArray[2] == 5 || dtArray[2] == 7 || dtArray[2] == 8 || dtArray[2] == 10 || dtArray[2] == 12  && dtArray[1] <= 31){
				 dateFlag = true;				
				 TooltipElement.title= "Date";
				 globalServiceLibrary.applyColor(id, successType);
			 }else if((angular.isArray(dtArray) && dtArray.length === 3 &&  dtArray[2] == 4 || dtArray[2] == 6 || dtArray[2] == 9 || dtArray[2] == 11)  && dtArray[1] > 30) {
				 globalServiceLibrary.applyColor(id, errorType);
				 TooltipElement.title= "Please Enter valid date";
				 dateFlag = false; 	
			 }else if(angular.isArray(dtArray) && dtArray.length === 3 &&  dtArray[2] == 4 || dtArray[2] == 6 || dtArray[2] == 9 || dtArray[2] == 11  && dtArray[1] <= 30){
				 dateFlag = true;
				 TooltipElement.title= "Date";				
				 globalServiceLibrary.applyColor(id, successType);
			 }
			 else if(angular.isArray(dtArray) && dtArray.length === 3 && flagCheck && dtArray[2] == 2 && dtArray[1] <= 29){
				 dateFlag = true;
				 TooltipElement.title= "Date";				 
				 globalServiceLibrary.applyColor(id, successType);
			 }else if(angular.isArray(dtArray) && dtArray.length === 3 && flagCheck && dtArray[2] == 2 && dtArray[1] > 29){
				 dateFlag = false;
				 globalServiceLibrary.applyColor(id, errorType);
				 TooltipElement.title= "Please Enter valid date";
			 }else if(angular.isArray(dtArray) && dtArray.length === 3 && !flagCheck && dtArray[2] == 2 && dtArray[1] <= 28){
				 dateFlag = true;				 
				 TooltipElement.title= "Date";
				globalServiceLibrary.applyColor(id, successType);
			 }else if(angular.isArray(dtArray) && dtArray.length === 3 && !flagCheck && dtArray[2] == 2 && dtArray[1] > 28) {
				 dateFlag = false;
				 globalServiceLibrary.applyColor(id, errorType);
				 TooltipElement.title= "Please Enter valid date";
			 }			
		}		
		 return dateFlag;
	}
	
	/*
	 functionName :  passportValidation
	 params@
	 modelValue: charater with integer  : modelValue must have 1 Alphabetic +7 Digits (J1234567),
	 id: string : value of current field ID
	 */

	globalServiceLibrary.passportValidation = function(modelValue,id){
		checkForUppercase = 1;
		var passportNumberRegex = /^[A-Z]{1}\d{7}$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =8;
		globalServiceLibrary.applyColor(id, successType);	
			if(!modelValue){
			flag = false;
			TooltipElement.title = "This field value is required";
			globalServiceLibrary.applyColor(id, errorType);									
		}else if(!passportNumberRegex.test(angular.uppercase(modelValue))){
			flag = false;
			TooltipElement.title = "Passport number should be 1 alphabet and 7 digit";
			globalServiceLibrary.applyColor(id, errorType);
		}else {	
			flag = true;
			
			TooltipElement.title = "Passport Number";
			globalServiceLibrary.applyColor(id, successType);			
		}				
		return flag;		 
	};

	/*
	 functionName : gstNumberValidation
	 params@
	 modelValue: charater with integer  : modelValue must have 2 digits + 5 character + 4 digits + 1 character  +3 alpha Numeric, max 15 (09ABCDE1234Q1S1),
	 id: string : value of current field ID,
	 */

	globalServiceLibrary.gstNumberValidation = function(modelValue,id){
		checkForUppercase = 1;
		var gstNumberRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}([a-zA-Z0-9]){3}$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =15;
		if(!modelValue){
			flag = false;
			TooltipElement.title = "This field value is required";
			globalServiceLibrary.applyColor(id, errorType);									
		}else if(!gstNumberRegex.test(angular.uppercase(modelValue))){
			flag = false;
			TooltipElement.title = "GST number should be 2 digits and 5 character and 4 digits and 1 character  and 3 alpha Numeric with maxlength 15";
			globalServiceLibrary.applyColor(id, errorType);
		}else {	
			flag = true;
			TooltipElement.title = "GST Number";
			globalServiceLibrary.applyColor(id, successType);			
		}				
		return flag;		 
	};
	

	
	/*
	 functionName : cinglnNumberValidation
	 params@
	 modelValue: charater with integer  : modelValue must have 1 Alphabetic + 5 Number +2 Alphabetic + 4 Digit +3 Alphabetic +6 Digits, max 21 (U72200RJ2010PTC031817),
	 id: string : value of current field ID,
	 */

	globalServiceLibrary.cinglnNumberValidation = function(modelValue,id){
		checkForUppercase = 1;
		var cinglnNumberRegex = /^[A-Z]{1}\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =21;
		if(!modelValue){
			flag = false;
			TooltipElement.title = "This field value is required";
			globalServiceLibrary.applyColor(id, errorType);									
		}else if(!cinglnNumberRegex.test(angular.uppercase(modelValue))){
			flag = false;
			TooltipElement.title = "Cin number should be 1 Alphabetic and 5 Number and 2 Alphabetic and 4 Digit and 3 Alphabetic and 6 Digits with maxlength 21";
			globalServiceLibrary.applyColor(id, errorType);
		}else {	
			flag = true;
			TooltipElement.title = "CIN Number";
			globalServiceLibrary.applyColor(id, successType);			
		}				
		return flag;		 
	};
	
	/*
	 functionName :  uidNumberValidation (710-210-354-186, 12 numeric)
	 params@
	 modelValue:integer  : modelValue must have 3 digit with hypen upto max 12 (710-210-354-186),
	 id: string : value of current field ID,
	 */

	globalServiceLibrary.uidNumberValidation = function(modelValue,id){
		checkForUppercase = 0;
		var uidNumberRegex = /^\d{3}(-)\d{3}(-)\d{3}(-)\d{3}$/;
		tooltipId = id.replace("#", "");
		TooltipElement = document.getElementById(tooltipId);
		TooltipElement.maxLength =15;
		if(!modelValue){
			flag = false;
			TooltipElement.title = "This field value is required";
			globalServiceLibrary.applyColor(id, errorType);									
		}else if(!uidNumberRegex.test(modelValue)){
			flag = false;
			TooltipElement.title = "UID number should be 3digit-3digit-3digit-3digit with maxlength 12";
			globalServiceLibrary.applyColor(id, errorType);
		}else {	
			flag = true;
			TooltipElement.title = "UID Number";
			globalServiceLibrary.applyColor(id, successType);			
		}				
		return flag;		 
	};
	
	
	/*
	 functionName : applyColor
	 params@
	 type : string : for check type is error or success
	 id: string : value of current field ID,
	 */
	globalServiceLibrary.applyColor = function(id, type){
		if(type === errorType){			
			$(id).attr('style', 'border: 0.2vh solid red');			
		}else if(type === successType) {
			$(id).attr('style', 'border-color: rgba(0, 0, 0, 0.2) !important');				
		}
		if(checkForUppercase === 1){
			$(id).css("text-transform","uppercase");
		}
		
	}
});



				

<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

</head>
<body>
<input type="text" id="txtDate" >
<script>
/*

 $("#txtDate").keypress(function(e){
if(e.keyCode == 47){
e.preventDefault();
}
 });
 }*/

            
 /*               
				
				if ( $(this).val().substring(1,2) =='/' || $(this).val().substring(2,3) =='/'){
				 if(e.keyCode == 191){
				 e.preventDefault();
				 }
				}else if($(this).val().substring(3,4) =='/' || $(this).val().substring(4,5) =='/'){
				 if(e.keyCode == 191){
				 e.preventDefault();
				 }
				}
				*/

			    $("#txtDate").keyup(function(e){
			 if( $("#txtDate").val().length <= 1){
				if($(this).val().substring(0,1) =='/'){
					if(e.keyCode == 47 || e.keyCode == 191){
						$(this).val($(this).val().substring(0,0));
					}
				}
			}else if($(this).val().length <=4){
			
				if($(this).val().substring(1,2) =='/'){
					if(e.keyCode == 47 || e.keyCode == 191){
						$(this).val($(this).val().substring(0,2));
					}
				}else if($(this).val().substring(2,3) =='/'){
					if(e.keyCode == 47 || e.keyCode == 191){
						$(this).val($(this).val().substring(0,3));
					}
				}
				
			}else if($(this).val().length >4 && $(this).val().length<=7){
				if($(this).val().substring(4,5) =='/'){
					if(e.keyCode == 47 || e.keyCode == 191){
						$(this).val($(this).val().substring(0,5));
					}
				}else if($(this).val().substring(5,6) =='/'){
					if(e.keyCode == 47 || e.keyCode == 191){
						$(this).val($(this).val().substring(0,6));
					}
				}
			}	

 
});
</script>
</body>
</html>