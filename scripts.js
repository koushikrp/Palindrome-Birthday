function reverseString(str) {
	return str.split("").reverse().join("");
}

function isPalindrome(str) {
	var reversedStr = reverseString(str);
	return str === reversedStr;
}

function convertDateToStr(enteredDate) {
	var dateStr = {
		day: "",
		month: "",
		year: "",
	};
	if (enteredDate.day < 10) {
		dateStr.day = "0" + enteredDate.day;
	} else {
		dateStr.day = String(enteredDate.day);
	}
	if (enteredDate.month < 10) {
		dateStr.month = "0" + enteredDate.month;
	} else {
		dateStr.month = String(enteredDate.month);
	}
	dateStr.year = String(enteredDate.year);
	return dateStr;
}

function getAllDateFormats(enteredDate) {
	var dateStr = convertDateToStr(enteredDate);
	var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
	var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
	var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
	var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
	var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
	var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(enteredDate) {
	var listOfDates = getAllDateFormats(enteredDate);
	for (let datei of listOfDates) {
		if (isPalindrome(datei)) return true;
	}
	return false;
}

function isLeapYear(year) {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
function getNextDate(curDate) {
	var day = curDate.day + 1;
	var month = curDate.month;
	var year = curDate.year;
	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (month == 2) {
		if (isLeapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else {
			if (day > 28) {
				day = 1;
				month++;
			}
		}
	} else {
		if (day > daysInMonth[month - 1]) {
			day = 1;
			month++;
		}
	}
	if (month > 12) {
		month = 1;
		year++;
	}
	return {
		day: day,
		month: month,
		year: year,
	};
}
function getNextPalindromeDate(enteredDate) {
	var ctr = 0;
	var nextDate = getNextDate(enteredDate);
	while (1) {
		ctr++;
		let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
		if (isPalindrome) {
			break;
		}
		nextDate = getNextDate(nextDate);
	}
	return [ctr, nextDate];
}

var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");
var loadingGIF = document.querySelector(".loading");

function clickHandler() {
	loadingGIF.classList.remove("active");
	resultRef.style.display = "block";
	var bdayStr = dateInputRef.value;
	if (bdayStr !== "") {
		let splitBdate = bdayStr.split("-");
		let date = {
			day: Number(splitBdate[2]),
			month: Number(splitBdate[1]),
			year: Number(splitBdate[0]),
		};
		let isPalindrome = checkPalindromeForAllDateFormats(date);
		if (isPalindrome) {
			resultRef.innerText = "Ohoo! Your Birthdate is a Palindrome!!";
		} else {
			let [days, nxtDate] = getNextPalindromeDate(date);
			resultRef.innerText = `Next Palindrome Date is ${nxtDate.day}-${nxtDate.month}-${nxtDate.year}, You Missed it by ${days} days!`;
		}
	} else {
		resultRef.innerText = "Please Enter the Date";
	}
}

function timeout() {
	resultRef.style.display = "none";
	setTimeout(clickHandler, 2000);
	loadingGIF.classList.add("active");
}
showBtnRef.addEventListener("click", timeout);
