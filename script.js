var global_val = [];
var result = [9,5,7,1];
var try_res = [];
var count = 0;
let timerInterval;


function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

ready(function() {
  let r = localStorage.getItem("try_res");
  if (r)  {
	  try_res =  JSON.parse(r);
	  refresh_history();
  }
  
  let countLocal = localStorage.getItem("count");
  if (countLocal)  {
	  count =  parseInt(countLocal, 0) ;
  }
});



function add(value) {
	if (global_val.length < 4) {
		global_val.push(value) ;
	}
	refresh();	
}

function refresh() {
	document.getElementById('value-1').innerHTML = global_val[0] !== undefined ? global_val[0]: "_" ;
	document.getElementById('value-2').innerHTML = global_val[1] !== undefined ? global_val[1]: "_" ;
	document.getElementById('value-3').innerHTML = global_val[2] !== undefined ? global_val[2]: "_" ;
	document.getElementById('value-4').innerHTML = global_val[3] !== undefined ? global_val[3]: "_" ;		
}

function checkAndColors(num, arr) {
	
	if (arr[num] == result[num]) {
		return '#4ade4a' ;
	} else {
		if (arr[num] == result[0]) {
			return '#cece26' ;
		}
		if (arr[num] == result[1]) {
			return '#cece26' ;
		}
		if (arr[num] == result[2]) {
			return '#cece26' ;
		}
		if (arr[num] == result[3	]) {
			return '#cece26' ;
		}
	}	
	 
	 return '#e23737' ;
}


function check() {
	if (global_val.length !== 4) {
		return
	}
	document.getElementById('value-1').style.backgroundColor = checkAndColors(0, global_val);
	document.getElementById('value-2').style.backgroundColor = checkAndColors(1, global_val);
	document.getElementById('value-3').style.backgroundColor = checkAndColors(2, global_val);
	document.getElementById('value-4').style.backgroundColor = checkAndColors(3, global_val);
	
	if ((global_val[0] === result[0]) &&
		(global_val[1] === result[1]) &&
		(global_val[2] === result[2]) &&
		(global_val[3] === result[3])
	) {
		localStorage.setItem("try_res", []);
		return 
	}	
	
	try_res.push(global_val);
	refresh_history();
	global_val = [];
	
	document.getElementById('value-1').style.backgroundColor = 'white';
	document.getElementById('value-2').style.backgroundColor = 'white';
	document.getElementById('value-3').style.backgroundColor = 'white';
	document.getElementById('value-4').style.backgroundColor = 'white';
	
	document.getElementById('value-1').innerHTML = "_" ;
	document.getElementById('value-2').innerHTML = "_" ;
	document.getElementById('value-3').innerHTML = "_" ;
	document.getElementById('value-4').innerHTML = "_" ;
	
	count++;
	checkCount();
}

function refresh_history() {
	
	
	localStorage.setItem("try_res", JSON.stringify(try_res));
	localStorage.setItem("count", count);
	
	for (i=0;i<try_res.length;i++) {
		var arr= try_res[i];
		var i1= i+1;
		document.getElementById('try'+i1).getElementsByTagName('label')[0].style.backgroundColor = checkAndColors(0,arr);
		document.getElementById('try'+i1).getElementsByTagName('label')[1].style.backgroundColor = checkAndColors(1,arr);
		document.getElementById('try'+i1).getElementsByTagName('label')[2].style.backgroundColor = checkAndColors(2,arr);
		document.getElementById('try'+i1).getElementsByTagName('label')[3].style.backgroundColor = checkAndColors(3,arr);
		
		document.getElementById('try'+i1).getElementsByTagName('label')[0].innerHTML = arr[0] !== undefined ? arr[0]: "" ;
		document.getElementById('try'+i1).getElementsByTagName('label')[1].innerHTML = arr[1] !== undefined ? arr[1]: "" ;
		document.getElementById('try'+i1).getElementsByTagName('label')[2].innerHTML = arr[2] !== undefined ? arr[2]: "" ;
		document.getElementById('try'+i1).getElementsByTagName('label')[3].innerHTML = arr[3] !== undefined ? arr[3]: "" ;
	}
	
}



function checkCount() {
	if (count >= 1) {
		document.getElementById('timer2').style.display = 'flex';
		document.getElementById('button').style.display = 'none';
		startTimer(1);
	} 
	/*if (count == 6) {
		document.getElementById('timer2').style.display = 'flex';
		document.getElementById('button').style.display = 'none';
		startTimer(9);
	} 
	if (count >= 9) {
		document.getElementById('timer2').style.display = 'flex';
		document.getElementById('button').style.display = 'none';
		startTimer(15);
	} */
	
}

startTimer = (minute_start) => {  
  clearInterval(timerInterval);
  
  let second = 59,
    minute = minute_start;

  // Next we set a interval every 1000 ms
  timerInterval = setInterval(function () {

    // We set the timer text to include a two digit representation
    timer.innerHTML =      
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);

    // Next we add a new second since one second is passed
    second--;

	if ((minute == 0) && (second == 00)) {
      clearInterval(timerInterval);
      document.getElementById('timer2').style.display = 'none';
	  document.getElementById('button').style.display = 'flex';
    }	
    
    if (second == 00) {      
      minute--;
      second = 60;
    }


  }, 1000);
};
