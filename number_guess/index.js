let target = Number(Math.floor(Math.random() * 11)); // gen random num range 1 to 10
let userIn = 0;
document.getElementById("btn-1").onclick = function(){
	userIn = document.getElementById("num").value;
	console.log(target);

	 if(userIn > 10 || userIn < 0){
		document.getElementById("msg").innerHTML= "! Your Enter an Invalid Number. only 1 to 10 numbers are allowed"
	 } else if(userIn < target){
		document.getElementById("msg").innerHTML = "# The Number is larger than " + userIn;
	} else if(userIn > target){
		document.getElementById("msg").innerHTML = "# The Number is smaller than " + userIn;
	} else if(userIn == target){
		document.getElementById("msg").innerHTML = "# Kudos You Guessed The correct Number !"
	} else{
		document.getElementById("msg").innerHTML = "# You Entered Invalid Input!"
	}
}
