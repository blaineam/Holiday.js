//is today a holiday and if so which holiday is it?
function checkholiday(date, holidays, callback){
	
	var weekdays = {
		'Sunday':0,
		'Monday':1,
		'Tuesday':2,
		'Wednesday':3,
		'Thursday':4,
		'Friday':5,
		'Saturday':6	
	}
	
	var currentmonth = date.getMonth();
	var currentday = date.getDate();
	
	//takes the week index of the month 1-5 and the weekday index 0-6 starting on Sunday
	var getweekofmonth = function(week, weekday){
		var currentweekday = date.getDay();
		var currentyear = date.getFullYear();
		var weeknumber = Math.ceil(currentday / 7);
		var monthstartweekday = new Date(currentyear, currentmonth, 1).getDay();
		return currentweekday==weekday&&((weeknumber==week-1&&monthstartweekday<weekday)||(weeknumber==week&&monthstartweekday>=weekday))
	}
	
	var isLastDay = function(day) {
	    var d = date;
	    return d.getDay() === day && (d.getDate() + 7) > 30;
	}
	
	var isFunction = function(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}
	
	var noholiday = function(){
		if(typeof holidays['none'] == 'object'){
			callback(holidays['none']);
		}else{
			console.warn("Invalid default or none holiday configuration, Please check the Read Me for more details: ");
			callback({});
		}
	}
	
	var invalidholiday = function(holiday){
		console.warn("Invalid holiday configuration, Please check the Read Me for more details: ",JSON.stringify(holiday));
	}
	
	for(var h in holidays){
		if(isFunction(holidays[h].occurrence)){
			if(holidays[h].occurrence(date)){
				callback(holidays[h]);
				return;
			}
		}else if(typeof holidays[h].occurrence == 'object'){
			if(typeof holidays[h].occurrence.month == 'number'){
				if(typeof holidays[h].occurrence.dayofmonth == 'number'){
					if(currentmonth + 1 == holidays[h].occurrence.month && currentday == holidays[h].occurrence.dayofmonth){
						callback(holidays[h]);
						return;
					}
				}else if(typeof holidays[h].occurrence.dayofmonthmin == 'number' && typeof holidays[h].occurrence.dayofmonthmax == 'number'){
					if(currentmonth + 1 == holidays[h].occurrence.month && currentday >= holidays[h].occurrence.dayofmonthmin && currentday <= holidays[h].occurrence.dayofmonthmax){
						callback(holidays[h]);
						return;
					}
				}else if(typeof holidays[h].occurrence.weeknumber == 'number' && typeof holidays[h].occurrence.weekday == 'string' && typeof weekdays[holidays[h].occurrence.weekday] !== 'undefined'){
					if(currentmonth + 1 == holidays[h].occurrence.month && getweekofmonth(holidays[h].occurrence.weeknumber, weekdays[holidays[h].occurrence.weekday])){
						callback(holidays[h]);
						return;
					}
				}else if(typeof holidays[h].occurrence.lastday == 'string' &&  typeof weekdays[holidays[h].occurrence.lastday] !== 'undefined'){
					if(currentmonth + 1 == holidays[h].occurrence.month && isLastDay(weekdays[holidays[h].occurrence.lastday])){
						callback(holidays[h]);
						return;
					}
				}else{
					invalidholiday(holidays[h]);
				}
			}else{
				invalidholiday(holidays[h]);
			}
		}else if(h !== 'none'){
			invalidholiday(holidays[h]);
		}
		
	}
	
	noholiday();
}
