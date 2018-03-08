# Holidays.js

Holidays.js is a javascript library that allows you to detect if a particular date is one of your specified holidays. You can configure holidays using json each holiday has a json assigned to a object key. The holiday objects can have any properties you would like to store them with for example a proper name, greeting and reference image might be a good place to start. the script supports various different methods of occurrence and can be set per holiday however you choose with some built in helper functions.




# Holiday Occurrence Object Properties

Each holiday object that is checked against a property names occurrence so these are the built in functions it can use to determine if it is a holiday.

| Property | Type | Values | Description |  
| --- | --- | --- | --- |
| month | number |1-12|[Required] Month the holiday takes place in|
| dayofmonth | number | 1-31 | [optional] Day of the month the holiday is on |
| dayofmonthmin | number | 1-31 | [optional] Minimum day of the month to start the holiday on (must be used with dayofmonthmax |
| dayofmonthmax | number | 1-31 | [optional] Maximum day of the month to run the holiday through (must be used with dayofmonthmin) |
| weeknumber | number | 1-5 | [optional] week number the holiday takes place on in accordance to a week day eg, fourth Thursday in a month (must be used with weekday) |
| weekday | string | Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday | [optional] weekday proper for which to find the first occurence on a given week number (must be used with weeknumber) |
| lastday | string | Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday | [optional] the last occurrence of the weekday in a given month say the last Friday of September |

The whole occurrence object can be replaced with a function that gets passed a Date object to check for the holiday and must return true if that date matches that holiday or false if it doesn't match that holiday:

    {"occurrence":function(date){ var dateisholiday = true; return dateisholiday; } }


## Full Example

In a full example you would include the holiday.js library and then in a script tag call it like in the example below:
```
<script src="src/js/holidays.js?v=2.1.2"></script>
<script>
var checkdate = new Date(); //date you want to check against holidays //$('.date').val()
//json object with holiday details
var holidays = {
	'none': {//default holiday as a catch all for when no holiday is detected
		'name':'Blaine Miller',//proper name of holiday
		'greeting':'Blaine Miller',//greeting message for holiday
		'image':'src/img/apple-touch-icon-152x152.png',//image for holiday
	},
	'veterans': {//computer friendly key for holiday
		'name':'Veterans Day',//proper name of holiday
		'greeting':'Happy Veterans Day, Thank You for Your Service!',//greeting message for holiday
		'image':'src/img/holidays/veterans.png',//image for holiday
		'occurrence':{'month':11,'dayofmonth':11}//json for holiday detection
	},
	'valentines': {
		'name':'Valentines Day',
		'greeting':'Happy Valentines Day!',
		'image':'src/img/holidays/valentines.png',
		'occurrence':{'month':2, 'dayofmonth':14}
	},
	'halloween': {
		'name':'Halloween',
		'greeting':'Happy Halloween',
		'image':'src/img/holidays/halloween.png',
		'occurrence':{'month':10, 'dayofmonth':31}
	},
	'fourthofjuly': {
		'name':'Independence Day',
		'greeting':'Happy 4th of July!',
		'image':'src/img/holidays/fourthofjuly.png',
		'occurrence':{'month':7, 'dayofmonth':4}
	},
	'stpatricks': {
		'name':'St. Patricks Day',
		'greeting':'Happy St. Patricks Day, don\'t forget to wear green!',
		'image':'src/img/holidays/stpatricks.png',
		'occurrence':{'month':3, 'dayofmonth':17}
	},
	'easter': {
		'name':'Easter',
		'greeting':'Happy Easter, He has risen!',
		'image':'src/img/holidays/easter.png',
		'occurrence':function(date){
			var Y = date.getFullYear();
			var C = Math.floor(Y/100);
		    var N = Y - 19*Math.floor(Y/19);
		    var K = Math.floor((C - 17)/25);
		    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
		    I = I - 30*Math.floor((I/30));
		    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
		    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
		    J = J - 7*Math.floor(J/7);
		    var L = I - J;
		    var M = 3 + Math.floor((L + 40)/44);
		    var D = L + 28 - 31*Math.floor(M/4);
			var eastersundaymonth = M-1;
			var eastersundayday = D;
			var currentmonth = date.getMonth();
			var currentday = date.getDate();
			return currentmonth==eastersundaymonth&&currentday==eastersundayday;
		} // occurrence can also be a function accepting a date to check and return true or false if it is the holiday or not.
	},
	'newyears': {
		'name':'New Years Day',
		'greeting':'Happy New Years!',
		'image':'src/img/holidays/newyears.png',
		'occurrence':{'month':1, 'dayofmonth':1}
	},
	'christmas': {
		'name':'Christmas Day',
		'greeting':'Have a Merry Christmas Everyone!',
		'image':'src/img/holidays/christmas.png',
		'occurrence':{'month':12, 'dayofmonthmin':1, 'dayofmonthmax':25}//occurrence can also be a range of dates in a month by specifying a dayofmonthmin and a dayofmonthmax
	},
	'thanksgiving': {
		'name':'Thanksgiving Day',
		'greeting':'Happy Thanksgiving!',
		'image':'src/img/holidays/thanksgiving.png',
		'occurrence':{'month':11, 'weeknumber':4, 'weekday':'Thursday'}//occurrence can also be a week number 1st-5th and a weekday proper for Sunday-Saturday, think 4th Thursday of the month
	},
	'pizza': {
		'name':'National Pizza Day',
		'greeting':'It\'s National Pizza Day, go get some pizza!',
		'image':'src/img/holidays/pizza.png',
		'occurrence':{'month':2, 'dayofmonth':9}
	},
	'pi': {
		'name':'National Pi Day',
		'greeting':'It\'s National Pi Day, go get some mathematical pie!',
		'image':'src/img/holidays/pi.png',
		'occurrence':{'month':3, 'dayofmonth':14}
	},
	'donut': {
		'name':'National Donut Day',
		'greeting':'It\'s National Donut Day, go get some donuts!',
		'image':'src/img/holidays/donut.png',
		'occurrence':{'month':6, 'weeknumber':1, 'weekday':'Friday'}
	},
	'starwars': {
		'name':'Star Wars Day',
		'greeting':'May the Fourth Be With You',
		'image':'src/img/holidays/starwars.png',
		'occurrence':{'month':5, 'dayofmonth':4}
	},
	'mlkj': {
		'name':'Martin luther King, Jr. Day',
		'greeting':'I Have A Dream!',
		'image':'src/img/holidays/mlkj.png',
		'occurrence':{'month':1, 'weeknumber':3, 'weekday':'Monday'}
	},
	'georgewashington': {
		'name':'George Washington\'s Birthday',
		'greeting':'Happy Birthday George Washington!',
		'image':'src/img/holidays/georgewashington.png',
		'occurrence':{'month':2, 'weeknumber':3, 'weekday':'Monday'}
	},
	'memorial': {
		'name':'Memorial Day',
		'greeting':'Today we remember our fallen brothers and sisters who lost their lives to give us our freedom!',
		'image':'src/img/holidays/memorial.png',
		'occurrence':{'month':5, 'lastday':'Monday'}//occurrence can also find a holiday based on its last weekday occurrence in a particular month
	},
	'labor': {
		'name':'Labor Day',
		'greeting':'Happy Labor Day Everyone!',
		'image':'src/img/holidays/labor.png',
		'occurrence':{'month':9, 'weeknumber':1, 'weekday':'Monday'}
	},
	'columbus': {
		'name':'Columbus Day',
		'greeting':'Happy Columbus Day Everyone!',
		'image':'src/img/holidays/columbus.png',
		'occurrence':{'month':10, 'weeknumber':2, 'weekday':'Monday'}
	}
	
}



checkholiday(checkdate, holidays, function(holiday){
	console.log(holiday);
	$(".logo").attr({"src":holiday.image+"?v=2.0.0","title":holiday.greeting});//update the logo with a holiday welcome.
});
</script>
```
as you can see you can get rather creative with all of the holidays

## Feel free to share, contribute and distribute.

this script is licensed under the MIT license and you can use it how you would like. I would love to hear if you use it in one of your projects so feel free to let me know how you use it. Also feel free to contribute to the project if you see it needing more functionality submit a pull request.

## Please Host it yourself

This library is rather small so please host it on your own server where possible.

## Example is on JSFiddle

An example of the Holiday.js Script is over on [JSFiddle](https://jsfiddle.net/j9hfedm7/2/) and my [portfolio](https://www.blaineam.com) site;

