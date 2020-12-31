//hide sub pages
$(".result").hide();
$(".test").hide();

$(document).ready(()=>{

    let questions = ["The ratio 36 : 12 is the same as", "Quiver most nearly means", "The principle gas in the earth's atmosphere is"];
    let ansOpt_A = ["2:1", "Shake", "Argon"] //shake ans Q_2
    let ansOpt_B = ["3:1", "Dance", "Neon"] //3:1 ans Q_1
    let ansOpt_C = ["4:1", "Rest", "Nitrogen"] //nitrogen ans Q_3
    let ansOpt_D = ["5:1", "Run", "Oxygen"]
    let ans = [1, 0, 2];
    let questionNum = 0;

    let correctAns = 0;//reset when game over
    let playerName = "";
    let nextQ = false; //confirm if next question
    let ansClicked = false;


    //transition
    let transition = ()=> {
        $(".aft").addClass("nxt");
        setTimeout(()=>{
            $(".aft").removeClass("nxt");
        }, 2000)
    }
    // start Game
    $(".start div button").click(()=>{

        $(".next").hide();

        playerName = $(".name").val();
        //if name box is empty
        if(playerName === "") {
            $(".name").css({
                border: "2px solid red"
            })
        }
        else {
            //Start Game
            transition();
            setTimeout(()=>{
                $(".start").hide();
                $(".test").show();
                startGame();
            }, 1000)
        }
    })
    let startGame = ()=>{
        $(".player_name").text(playerName);
        setQA();
    }
    //set Question and Answer
    let setQA = () => {
        $(".que span").text(questionNum+1);

        $(".question p").text(questions[questionNum]);
        $(".opt:nth-child(1)").text(ansOpt_A[questionNum]);
        $(".opt:nth-child(2)").text(ansOpt_B[questionNum]);
        $(".opt:nth-child(3)").text(ansOpt_C[questionNum]);
        $(".opt:nth-child(4)").text(ansOpt_D[questionNum]);
    }
    // check ans
    $(".ans").on("click", ".opt",(event)=>{
        if(ansClicked === false) {
            $(".opt").css({
                border: 0
            })
            $(event.currentTarget).css({
                border: "3px solid white"
            })

            let checkedAns = $(event.currentTarget).index(".opt");
            console.log(checkedAns);
            isAnscorrect(checkedAns);
        }
    })

    //check if answer is correct
    let isAnscorrect = (checkedAns) => {
        if(checkedAns === ans[questionNum]) {
            console.log(true)
            correctAns++;
        }
        else
            console.log(false)

        nextQ = true;
    }
    // reveal answer
    $(".checkAns").click(()=>{
        $(".next").show();
        $(".checkAns").hide();
        ansClicked = true;

        //reveal on display
        $(".opt").each((index, element)=>{
            if(index === ans[questionNum]) {
                $(element).css({
                    "background-color" : "rgb(0, 129, 0)"
                })
            }
            else
                $(element).css({
                    "background-color" : "rgb(134, 29, 29)"
                })

        })

    })

    //next question and a small reset
    $(".next").on("click",()=>{
        if((questionNum < 2) && (nextQ === true)) {
            //transition
            $(".aft").addClass("nxtt");
            setTimeout(()=>{
                $(".aft").removeClass("nxtt");
            }, 1000)

            setTimeout(()=>{
                // 
                $(".next").hide();
                $(".checkAns").show();
                // 
                $(".opt").css({
                    border: 0
                })
                // 
                $(".opt").css({
                    "background-color": "rgba(0, 0, 0, 0.459)"
                })

                questionNum++;
                nextQ = false
                ansClicked = false;
                console.log("this");
                setQA();
            }, 500)
        }
        else{
            result();
        }
    })
    

    // display result
    let result = ()=> {
        //End Game
        transition();
        setTimeout(()=>{
            $(".test").hide();
            $(".result").show();
            startGame();
        }, 1000)
        // display
        // calculate result
        let ansResult = (correctAns/3) * 100;
        $(".score").text(ansResult.toFixed(2) + "%");
    }

    $(".retake").on("click", ()=> {
        location.reload();
    })
})