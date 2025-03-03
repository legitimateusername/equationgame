var game={
	num1: 0,
	num2: 0,
	num3: 0,
	num4: 0,
	num5: 0,
	solution: 0,
	equation: "",
	t0: 0,
	t1: 0,
	running: true,

	generateEquation: function(){
		var rand=Math.floor(Math.random()*3)+1;
		var structure;
		switch(rand){
			case 1:
				structure="straight";
				break;
			case 2:
				structure="twopairs";
				break;
			case 3:
				structure="fullhouse";
				break;
			default:
		}
		var op12;
		var op123;
		var op34;
		var op1234;
		var op45;
		var op12345;
		var num12;
		var num123;
		var num34;
		var num1234;
		var num45;
		var num12345;
		var posneg;
		var plusminus1="";
		var plusminus2="";
		var generate=true;
		while(generate){
			this.equation="";
			this.num1=Math.floor(Math.random()*9)+1;
			this.num2=Math.floor(Math.random()*9)+1;
			op12=generateOperand(this.num1, this.num2);
			posneg=Math.floor(Math.random()*2);
			plusminus1="";
			posneg=0;
			if(posneg==0){
				plusminus1="-";
			}
			num12=eval("("+plusminus1+"("+this.num1+"))"+op12+"("+this.num2+")");
			if(structure!="twopairs"){
				this.num3=Math.floor(Math.random()*9)+1;
				op123=generateOperand(num12, this.num3);
				num123=eval("("+num12+")"+op123+"("+this.num3+")");
			}
			else{
				this.num3=Math.floor(Math.random()*9)+1;
				num3=2;
				this.num4=Math.floor(Math.random()*9)+1;
				num4=3;
				op34=generateOperand(this.num3, this.num4);
				posneg=Math.floor(Math.random()*2);
				plusminus2="";
				if(posneg==0){
					plusminus2="-";
				}
				num34=eval("("+plusminus2+"("+this.num3+"))"+op34+"("+this.num4+")");
			}
			if(structure=="straight"){
				this.num4=Math.floor(Math.random()*9)+1;
				op1234=generateOperand(num123, this.num4);
				num1234=eval("("+num123+")"+op1234+"("+this.num4+")");
			}
			if(structure=="twopairs"){
				op1234=generateOperand(num12, num34);
				num1234=eval("("+num12+")"+op1234+"("+num34+")");
			}
			if(structure=="fullhouse"){
				this.num4=Math.floor(Math.random()*9)+1;
				this.num5=Math.floor(Math.random()*9)+1;
				op45=generateOperand(this.num4, this.num5);
				posneg=Math.floor(Math.random()*2);
				plusminus2="";
				if(posneg==0){
					plusminus2="-";
				}
				num45=eval("("+plusminus2+"("+this.num4+"))"+op45+"("+this.num5+")");
			}
			if(structure!="fullhouse"){
				this.num5=Math.floor(Math.random()*9)+1;
				op12345=generateOperand(num1234, this.num5);
				num12345=eval("("+num1234+")"+op12345+"("+this.num5+")");
			}
			if(structure=="fullhouse"){
				op12345=generateOperand(num123, num45);
				num12345=eval("("+num123+")"+op12345+"("+num45+")");
			}
			if(num12345>=10&&num12345<100){
				generate=false;
			}
		}
		this.solution=num12345;
		if(structure=="straight"){
			if(testHierarchy(op1234, op12345)){this.equation+="(";}
			if(testHierarchy(op123, op1234)){this.equation+="(";}
			if(testHierarchy(op12, op123)){this.equation+="(";}
			if(plusminus1=="-"&&op12=="**"){this.equation+="(";}
			this.equation+=plusminus1+this.num1;
			if(plusminus1=="-"&&op12=="**"){this.equation+=")";}
			this.equation+=op12+this.num2;
			if(testHierarchy(op12, op123)){this.equation+=")";}
			this.equation+=op123+this.num3;
			if(testHierarchy(op123, op1234)){this.equation+=")";}
			this.equation+=op1234+this.num4;
			if(testHierarchy(op1234, op12345)){this.equation+=")";}
			this.equation+=op12345+this.num5;
		}
		if(structure=="twopairs"){
			if(testHierarchy(op1234, op12345)){this.equation+="(";}
			if(testHierarchy(op12, op1234)){this.equation+="(";}
			if(plusminus1=="-"&&op12=="**"){this.equation+="(";}
			this.equation+=plusminus1+this.num1;
			if(plusminus1=="-"&&op12=="**"){this.equation+=")";}
			this.equation+=op12+this.num2;
			if(testHierarchy(op12, op1234)){this.equation+=")";}
			this.equation+=op1234;
			if(testHierarchyReverse(op1234, op34)&&operandLevel(op1234)!=1){
				this.equation+="(";
			}
			if(plusminus2=="-"&&(((!testHierarchyReverse(op1234, op34))&&operandLevel(op1234)!=1)||op34=="**")){
				this.equation+="(";
			}
			this.equation+=plusminus2+this.num3;
			if(plusminus2=="-"&&(((!testHierarchyReverse(op1234, op34))&&operandLevel(op1234)!=1)||op34=="**")){
				this.equation+=")";
			}
			if(op1234=="-"&&op34=="+"){
				this.equation+="-";
			}
			else if(op1234=="-"&&op34=="-"){
				this.equation+="+";
			}
			else{
				this.equation+=op34;
			}
			this.equation+=this.num4;
			if(testHierarchyReverse(op1234, op34)&&operandLevel(op1234)!=1){
				this.equation+=")";
			}
			if(testHierarchy(op1234, op12345)){this.equation+=")";}
			this.equation+=op12345+this.num5;
		}
		if(structure=="fullhouse"){
			if(testHierarchy(op123, op12345)){this.equation+="(";}
			if(testHierarchy(op12, op123)){this.equation+="(";}
			if(plusminus1=="-"&&op12=="**"){this.equation+="(";}
			this.equation+=plusminus1+this.num1;
			if(plusminus1=="-"&&op12=="**"){this.equation+=")";}
			this.equation+=op12+this.num2;
			if(testHierarchy(op12, op123)){this.equation+=")";}
			this.equation+=op123+this.num3;
			if(testHierarchy(op123, op12345)){this.equation+=")";}
			this.equation+=op12345;
			if(testHierarchyReverse(op12345, op45)&&operandLevel(op12345)!=1){
				this.equation+="(";
			}
			if(plusminus2=="-"&&(((!testHierarchyReverse(op12345, op45))&&operandLevel(op1234)!=1)||op45=="**")){
				this.equation+="(";
			}
			this.equation+=plusminus2+this.num4;
			if(plusminus2=="-"&&(((!testHierarchyReverse(op12345, op45))&&operandLevel(op1234)!=1)||op45=="**")){
				this.equation+=")";
			}
			if(op12345=="-"&&op45=="+"){
				this.equation+="-";
			}
			else if(op12345=="-"&&op45=="-"){
				this.equation+="+";
			}
			else{
				this.equation+=op45;
			}
			this.equation+=this.num5;
			if(testHierarchyReverse(op12345, op45)&&operandLevel(op12345)!=1){
				this.equation+=")";
			}
		}
		this.equation=this.equation.replace(/\+\-/g, "-").replace(/\-\-/g, "+").replace(/\*\*/g, "^");

		var span1=document.getElementById("num1");
		var span2=document.getElementById("num2");
		var span3=document.getElementById("num3");
		var span4=document.getElementById("num4");
		var span5=document.getElementById("num5");
		var solspan=document.getElementById("solution");
		var exprspan=document.getElementById("expr");
		var validationspan=document.getElementById("validation");

		span1.innerHTML="<b>"+this.num1+"</b>";
		span2.innerHTML="<b>"+this.num2+"</b>";
		span3.innerHTML="<b>"+this.num3+"</b>";
		span4.innerHTML="<b>"+this.num4+"</b>";
		span5.innerHTML="<b>"+this.num5+"</b>";
		solspan.innerHTML="<b>"+this.solution+"</b>";
		exprspan.innerHTML="<br/>";
		validationspan.innerHTML="<br/><br/>";
		this.t0=performance.now();
	},

	processSubmission: function(expr){
		var exprhtml=document.getElementById("expr");
		var validation=document.getElementById("validation");
		var resetbutton=document.getElementById("resetbutton");
		if(expr==""){
			exprhtml.innerHTML="Come on, type something in!";
		}
		else{
			exprhtml.innerHTML="You entered the expression: <b>"+expr+"</b>";
		}
		expr=expr.replace(/\–/g, "-").replace(/\—/g, "-").replace(/\x/g, "*");
		if(expr==""){
			validation.innerHTML="<br/><br/>";
		}
		else if(!validateExpression(expr)){
			validation.innerHTML="Invalid expression format. <br/><br/>";
		}
		else{
			if(expr.match(/.*?\-\d\^\d.*/)){
				validation.innerHTML="Invalid expression format. <br/>Please do not include expressions in the form of <b>-x^y</b> without adding parenthesees. <br/>";
			}
			else if((!validateFormat(expr))||(!validateNumbers(expr, this.num1, this.num2, this.num3, this.num4, this.num5))){
				expr=expr.replace(/\^/g, "**");
				if(isNaN(eval(expr))){
					validation.innerHTML="You didn't enter the numbers correctly. <br/>Your expression doesn't even work.";
				}
				else{
					validation.innerHTML="You didn't enter the numbers correctly. <br/>Your expression evaluates to <b>"+eval(expr)+"</b>.";
				}
			}
			else{
				expr=expr.replace(/\^/g, "**");
				if(isNaN(eval(expr))){
					validation.innerHTML="Very funny. Try again, smartass. <br/><br/>";
				}
				else if(eval(expr)!=this.solution){
					validation.innerHTML="Wrong answer. <br/>Your expression evaluates to <b>"+eval(expr)+"</b>.";
				}
				else{
					this.t1=performance.now();
					time=this.t1-this.t0;
					if(time<60000){
						validation.innerHTML="You got <b>"+this.solution+"</b>: you win! <br/>You took <b>"+(time/1000).toFixed(2)+" seconds</b>.<br/>";
					}
					else if(time<120000){
						validation.innerHTML="You got <b>"+this.solution+"</b>: you win! <br/>You took <b>"+Math.floor(time/60000)+" minute and "+((time/1000)%60).toFixed(2)+" seconds</b>.<br/>";
					}
					else{
						validation.innerHTML="You got <b>"+this.solution+"</b>: you win! <br/>You took <b>"+Math.floor(time/60000)+" minutes and "+((time/1000)%60).toFixed(2)+" seconds</b>.<br/>";
					}
					this.running=false;
					document.getElementById("submitbutton").onclick=gameOver;
					document.getElementById("resetbutton").onclick=reset;
					resetbutton.setAttribute("value", "Play again");
				}
			}
		}
	}
}

function generateOperand(n1, n2){
	var rand;
	var operand;
	var limit=1000;
	if(Number.isInteger(n1/n2)&&((Math.abs(n1**n2)<limit)&&(Number.isInteger(n1**n2)))){
		rand=Math.floor(Math.random()*5)+1;
	}
	else if(Number.isInteger(n1/n2)&&((Math.abs(n1**n2)>=limit)||(!Number.isInteger(n1**n2)))){
		rand=Math.floor(Math.random()*4)+1;
	}
	else if((!Number.isInteger(n1/n2))&&((Math.abs(n1**n2)<limit)&&(Number.isInteger(n1**n2)))){
		rand=Math.floor(Math.random()*4)+1;
		if(rand==4){
			rand=5;
		}
	}
	else if((!Number.isInteger(n1/n2))&&((Math.abs(n1**n2)>=limit)||(!Number.isInteger(n1**n2)))){
		rand=Math.floor(Math.random()*3)+1;
	}
	switch(rand){
		case 1:
			operand="+";
			break;
		case 2:
			operand="-";
			break;
		case 3:
			operand="*";
			break;
		case 4:
			operand="/";
			break;
		case 5:
			operand="**";
			break;
		default:
	}
	return operand;
}

function operandLevel(operand){
	var level;
	switch(operand){
		case "+":
			level=1;
			break;
		case "-":
			level=1;
			break;
		case "*":
			level=2;
			break;
		case "/":
			level=2;
			break;
		case "**":
			level=3;
			break;
		default:
	}
	return level;
}

function testHierarchy(innerOp, outerOp){
	var innerLevel;
	var outerLevel;
	innerLevel=operandLevel(innerOp);
	outerLevel=operandLevel(outerOp);
	if((innerLevel<outerLevel)||(innerLevel==3&&outerLevel==3)){
		return true;
	}
	return false;
}

function testHierarchyReverse(outerOp, innerOp){
	var outerLevel;
	var innerLevel;
	innerLevel=operandLevel(innerOp);
	outerLevel=operandLevel(outerOp);
	if(((outerOp=="+"&&innerOp=="+")||((outerOp=="*"&&innerOp=="*")))||innerLevel>outerLevel){
		return false;
	}
	return true;
}

function validateBrackets(expr){
	var bracketcount=0;
	for(i=0;i<expr.length;i++){
		if(expr[i]=="("){
			bracketcount++;
		}
		if(expr[i]==")"){
			bracketcount--;
		}
		if(bracketcount<0){
			return false;
		}
	}
	return bracketcount==0;
}

function validateExpression(expr){
	if(!validateBrackets(expr)){
		return false;
	}
	return expr.match(/^(|\+|\-)?(((\()+)((|\+|\-)?))*((\()*)(\d)+((\))*)((\+|\-|\*|\/|\^)(((\()+)((|\+|\-)?))*((\()*)(\d)+((\))*))*$/);
}

function validateFormat(expr){
	if(!validateBrackets(expr)){
		return false;
	}
	return expr.match(/^(|\+|\-)?(((\()+)((|\+|\-)?))*((\()*)\d((\))*)((\+|\-|\*|\/|\^)(((\()+)((|\+|\-)?))*((\()*)\d((\))*)){4}$/);
}

function validateNumbers(expr, num1, num2, num3, num4, num5){
	var randomnums=[num1, num2, num3, num4, num5];
	var exprnums=[];
	for(i=0;i<expr.length;i++){
		if(expr[i]>="0"&&expr[i]<="9"){
			exprnums.push(parseInt(expr[i]));
		}
	}
	randomnums.sort();
	exprnums.sort();
	for(i=0;i<5;i++){
		if(randomnums[i]!=exprnums[i]){
			return false;
		}
	}
	return true;
}

function handleSubmission(){
	game.processSubmission(document.getElementById("textentry").value);
}

function handleKeyPress(e){
	e=e||window.event;
	if(e.keyCode===13){
		if(game.running){
			handleSubmission();
		}
		return false;
	}
}

function forfeit(){
	document.getElementById("resetbutton").onclick=reset;
	resetbutton.setAttribute("value", "Play again");
	document.getElementById("textentry").value=("");
	document.getElementById("expr").innerHTML=("One possible solution is: <b>"+game.equation+"</b>");
	document.getElementById("validation").innerHTML=("<br/><br/>");
	document.getElementById("submitbutton").onclick=gameOver;
}

function reset(){
	document.getElementById("submitbutton").onclick=handleSubmission;
	document.getElementById("resetbutton").onclick=forfeit;
	resetbutton.setAttribute("value", "I give up");
	document.getElementById("textentry").value=("");
	document.getElementById("expr").innerHTML=("");
	game.running=true;
	game.generateEquation();
}

function gameOver(){
	game.running=false;
}

function init(){
	document.getElementById("submitbutton").onclick=handleSubmission;
	document.getElementById("textentry").onkeypress=handleKeyPress;
	document.getElementById("resetbutton").onclick=forfeit;
	game.generateEquation();
}

window.onload=init;