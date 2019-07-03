var playing = false;
var score;
var timeRemaining;
var correctAnswer;
var counter;
//if we click on the start/reset button 
document.getElementById("startreset").onclick = function () {
    //if we are playing
    if(playing == true) {
        //reload the page
        location.reload(); //reload page
    }
    else {
        //if we are not playing
            //set score to zero
        playing = true;
        score = 0;
        hide("gameover");
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown box
        show("timeremaining");
        //start reducing the time by 1sec in loops
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        startCountdown();
        
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //generate new Q&A
        generateQA();
    }
}
        
for(i=1;i<5;i++) {
    document.getElementById("box" + i).onclick  = function() {
    
    //if we are playing
    if(playing == true) {
        var answer = this.innerHTML;
        
        //correct?
        if(answer == correctAnswer) {//yes
            
            //increase score
            score++;
            
            document.getElementById("scorevalue").innerHTML = score;
            show("correct");
            
            //show correct box for 1sec
            setTimeout(function () {
                hide("correct");
            }, 1000);
            
            //generate new Q&A
            generateQA();
        }
        else {//wrong?
            
            show("wrong");
            
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p> <p>Your Score is "+score+".</p>";
            document.getElementById("startreset").innerHTML = "Start Game";
            hide("timeremaining");

             //show try again box
            setTimeout(function () {
                hide("wrong");
            }, 1000);
            
            playing = false;
        }
    }
}
}
   

function startCountdown() {
        counter = setInterval(function () {
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        if(timeRemaining == 0) {//no->gameover
            stopCountDown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p> <p>Your Score is "+score+".</p>";
            hide("timeremaining"); 
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(counter);
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

function generateQA() {
    var x = 1 +(Math.round(Math.random()*9));
    var y = 1 + (Math.round(Math.random()*9));
    correctAnswer = x * y;
    var wrongAnswer;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + (Math.round(Math.random() * 3));
    
    //filling the correctPosition with correctAnswer
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    
    //generating the wrong answers and filling rest of boxes with them
    for(i=1;i<5;i++){
        if(i != correctPosition) {
            do{
                wrongAnswer = (1 + (Math.round(Math.random()*9))) * (1 + (Math.round(Math.random()*9)));
            }while(wrongAnswer == correctAnswer)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
        }
    }
}
