const allTds = document.getElementsByTagName("td");
const allPs = document.body.querySelector(".container").querySelectorAll("p");
const startButton = document.querySelectorAll(".button");
const resetButton = document.querySelectorAll(".reset");
const eraseButton =  document.querySelector("span");
const generateButton = document.querySelector(".generate");
const gameOver=document.querySelector(".hidden");
const solveChoice = document.querySelectorAll(".welcomeChoice")[1];
const playChoice = document.querySelectorAll(".welcomeChoice")[0];
let mode;

solveChoice.addEventListener("click", ()=>{
    document.querySelector(".allContainer").style.display = "flex";
    document.querySelector(".welcomeContainer").style.display="none";
    document.querySelector(".generateContainer").style.display = "none";
    mode="solve"
})

playChoice.addEventListener("click", ()=>{
    document.querySelector(".allContainer").style.display = "flex";
    document.querySelector(".welcomeContainer").style.display="none";
    document.querySelector(".buttonContainer").style.display = "none";
    mode = "play";
})
generateButton.addEventListener("click", gernerateSudoku)
startButton[0].addEventListener("click",actuallyDo);
startButton[1].addEventListener("click",actuallyDo);
resetButton[0].addEventListener("click", ()=>{
    for(let i=0; i< allTds.length; ++i){
        allTds[i].innerHTML="";
    }
})
resetButton[1].addEventListener("click", ()=>{
    for(let i=0; i< allTds.length; ++i){
        allTds[i].innerHTML="";
    }
})

let selected = "";
let tdIndex;

eraseButton.addEventListener("click",()=>{selected=""})
for(let i=0; i<allTds.length; ++i){
    allTds[i].addEventListener("click",(event)=>{
        for(let k=0; k<9; ++k){
            allPs[k].style.backgroundColor="gray";
        }
        if(event.target.style.color !=="green"){
            event.target.innerText = selected;
            for(var x=0; x<81; ++x){
                if(allTds[x]===event.target){
                    break;
                }
            }
            tdIndex=x;
            if(resetArray[x]!==parseInt(event.target.innerHTML )&& mode==="play"){
                event.target.style.color = "red"
            }else{
                event.target.style.textDecoration = "none";
                let r;
                for( r=0; r<81; ++r){
                    if(parseInt(allTds[r].innerHTML)!==resetArray[r]){
                        break;
                    }
                }
                if(r===81){
                    gameOver.style.display="block";
                    gameOver.addEventListener("click",()=>{gameOver.style.display="none"; 
                })
                }
            }
            
        }
        })
}

for(let i=0; i<allPs.length; ++i){
    allPs[i].addEventListener("click",function (event){
        selected = event.target.innerText;
        for (item in [0,1,2,3,4,5,6,7,8]){
            allPs[item].style.backgroundColor = "gray";
        }
        event.target.style.backgroundColor = "rgb(25, 25, 25)";
    })
}
 
let sudoku = new Array(9)
for(let i=0; i< 9; ++i){
    sudoku[i]= new Array(9);
    for(let j=0; j< 9; ++j){
        sudoku[i][j] = new Array ("O","O","O","O","O","O","O","O","O");
    }   
}
let sudokuArray= new Array(9);
    for(let i=0; i<9;++i){
        sudokuArray[i]=new Array(0,0,0,0,0,0,0,0,0);
    }
    let g=0;
    let h=0;
    let resetArray=[]
function populateSudoku(){
    let hardSudoku=sudokuArray;
  
    let counter=0;
    for(let i=0; i<9;i++){
        for(let j=0;j<9;++j){
            allTds[counter].innerHTML=hardSudoku[i][j];
            resetArray[counter]=hardSudoku[i][j];
            counter++
        }
    }
}
function initialMark(){
    let counter=0;
    for(let i=0; i<9; ++i){
        for(let j=0; j<9; ++j){
            if(allTds[counter].innerHTML.trim()!==""){
                sudoku[i][j].length=1;
                sudoku[i][j][0]=allTds[counter].innerHTML.trim();
            }
            counter++
        }
    }
}
function actuallyDo(){
        initialMark();
        let complete=false;
        let howManyChanged = 0;
        let previous = 0;

        while(!complete){
            let i=0;
            crossOut();
            identifyLone();
            crossOut()
            findSeulPossibility();
            crossOut();
            transferToTable();
            for(i=0;i<81;++i){

                if(allTds[i].innerHTML.trim()===""){
                    break;
                }
            }
            for(let j=0; j< 81; j++){
                if(allTds[i].innerHTML.trim()!==""){
                    howManyChanged++
                }
            }
            if(previous === howManyChanged && mode==="solve"){
                alert("You might have made a mistake entering the sudoku.")
                break
            }
            howManyChanged = 0;
            if(i===81){
                complete=true;
            }
        }
}
function crossOut(){
    let counter=0;
    for(let i=0; i<9; ++i){
        for(let j=0; j<9; ++j){
            if(allTds[counter].innerHTML.trim()!==""){
                let num = parseInt(allTds[counter].innerHTML.trim())-1;
                for(let k=0; k<9; ++k){
                    if(sudoku[i][k].length>1){
                        sudoku[i][k][num]="X";
                    }
                }
                for(let k=0; k<9; ++k){
                    if(sudoku[k][j].length>1){
                        sudoku[k][j][num]="X";
                    }
                }
                for(let k=i-i%3; k<i-i%3 + 3; ++k){
                    for(let q=j-j%3;q< j-j%3+3; ++q ){
                        if(sudoku[k][q].length>1){
                            sudoku[k][q][num]="X";
                        }
                    }
                }
            }
            counter++
        }
    }
}
function identifyLone(){
    let counter=0;
    let xs=0;
    let num;
    for(let i=0; i<9; ++i){
        for(let j=0; j<9; ++j){
            for(let k=0; k<9; ++k){
                if(sudoku[i][j][k]==="X"){
                    xs++
                }else{
                    num=k+1;
                }
            }
            if(xs===8){
                sudoku[i][j].length=0;
                sudoku[i][j][0]=num;
                transferToTable();
                crossOut();
            }
            xs=0;
            counter++
        }
    }
}
function transferToTable(){
    let counter=0;
    for(let i=0; i<9; ++i){
        for(let j=0; j<9; ++j){
            if(sudoku[i][j].length===1 && allTds[counter].innerHTML.trim()===""){
                allTds[counter].innerHTML=sudoku[i][j][0];
            }
            counter++
        }
    }
}
//checks to see which box is the only one in a row/column/square with an O in a certain place like 2
function findSeulPossibility(){
    let counter=0;
    let place;
    let number;
    for(let k=0; k<9; ++k){
        for(let i=0; i<9; ++i){
            for(let j=0; j<9; ++j){
                if(sudoku[i][j][k]==="O"){
                    counter++;
                    place=j;
                }
            }
            if(counter===1){
                sudoku[i][place].length=1;
                sudoku[i][place][0]=k+1;
                transferToTable();
                crossOut();
                place=-1;
                counter=0;
            }else{
                counter=0;
            }
        }
    }
    // iterates over the column to find lonesome numbers with O
    let counteCol=0;
    let placeCol=-1;
    for(let k=0; k<9; ++k){
        for(let i=0; i<9; ++i){
            for(let j=0; j<9; ++j){
                if(sudoku[j][i][k] && sudoku[j][i][k]==="O"){
                    counteCol++;
                    placeCol=j;
                }
            }
            if(counteCol===1){
                sudoku[placeCol][i].length=1;
                sudoku[placeCol][i][0]=k+1;
                transferToTable();
                crossOut();
            }
                counteCol=0;
            
        }   
    }
// finds in every square if there is any lonesome O
    
    let count00=0;
    let placeK00,placeQ00;
    for(let i=0; i<9; ++i){
        for(let k=0; k<3; ++k){
            for(let q=0;q<3; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count00++
                    placeK00=k;
                    placeQ00=q;
                }
            }
        }
        if(count00===1){
            sudoku [placeK00][placeQ00].length=1;
            sudoku [placeK00][placeQ00][0]=i+1;
            count00=0;
            transferToTable();
            crossOut();
        }
    }
    let count01=0;
    let placeK01,placeQ01;
    for(let i=0; i<9; ++i){
        for(let k=0; k<3; ++k){
            for(let q=3;q<6; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count01++
                    placeK01=k;
                    placeQ01=q;
                }
            }
        }
        if(count01===1){
            sudoku [placeK01][placeQ01].length=1;
            sudoku [placeK01][placeQ01][0]=i+1;
            count01=0;
            transferToTable();
            crossOut();
        }
    }
    let count02=0;
    let placeK02,placeQ02;
    for(let i=0; i<9; ++i){
        for(let k=0; k<3; ++k){
            for(let q=6;q<9; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count02++
                    placeK02=k;
                    placeQ02=q;
                }
            }
        }
        if(count02===1){
            sudoku [placeK02][placeQ02].length=1;
            sudoku [placeK02][placeQ02][0]=i+1;
            count02=0;
            transferToTable();
            crossOut();
        }
    }
    let count10=0;
    let placeK10,placeQ10;
    for(let i=0; i<9; ++i){
        for(let k=3; k<6; ++k){
            for(let q=0;q<3; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count10++
                    placeK10=k;
                    placeQ10=q;
                }
            }
        }
        if(count10===1){
            sudoku [placeK10][placeQ10].length=1;
            sudoku [placeK10][placeQ10][0]=i+1;
            count10=0;
            transferToTable();
            crossOut();
        }
    }
    let count11=0;
    let placeK11,placeQ11;
    for(let i=0; i<9; ++i){
        for(let k=3; k<6; ++k){
            for(let q=3;q<6; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count11++
                    placeK11=k;
                    placeQ11=q;
                }
            }
        }
        if(count11===1){
            sudoku [placeK11][placeQ11].length=1;
            sudoku [placeK11][placeQ11][0]=i+1;
            count11=0;
            transferToTable();
            crossOut();
        }
    }
    let count12=0;
    let placeK12,placeQ12;
    for(let i=0; i<9; ++i){
        for(let k=3; k<6; ++k){
            for(let q=6;q<9; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count12++
                    placeK12=k;
                    placeQ12=q;
                }
            }
        }
        if(count12===1){
            sudoku [placeK12][placeQ12].length=1;
            sudoku [placeK12][placeQ12][0]=i+1;
            count12=0;
            transferToTable();
            crossOut();
        }
    }
    let count20=0;
    let placeK20,placeQ20;
    for(let i=0; i<9; ++i){
        for(let k=6; k<9; ++k){
            for(let q=0;q<3; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count20++
                    placeK20=k;
                    placeQ20=q;
                }
            }
        }
        if(count20===1){
            sudoku [placeK20][placeQ20].length=1;
            sudoku [placeK20][placeQ20][0]=i+1;
            count20=0;
            transferToTable();
            crossOut();
        }
    }
    let count21=0;
    let placeK21,placeQ21;
    for(let i=0; i<9; ++i){
        for(let k=6; k<9; ++k){
            for(let q=3;q<6; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count21++
                    placeK21=k;
                    placeQ21=q;
                }
            }
        }
        if(count21===1){
            sudoku [placeK21][placeQ21].length=1;
            sudoku [placeK21][placeQ21][0]=i+1;
            count21=0;
            transferToTable();
            crossOut();
        }
    }
    let count22=0;
    let placeK22,placeQ22;
    for(let i=0; i<9; ++i){
        for(let k=6; k<9; ++k){
            for(let q=6;q<9; ++q ){
                if(sudoku[k][q][i]==="O"){
                    count22++
                    placeK22=k;
                    placeQ22=q;
                }
            }
        }
        if(count22===1){
            sudoku [placeK22][placeQ22].length=1;
            sudoku [placeK22][placeQ22][0]=i+1;
            count22=0;
            transferToTable();
            crossOut();
        }
    }
}
function makeSudoku(){
    let randomArray=[];
    while(randomArray.length < 9){
        let randonumber = Math.floor(Math.random() * 9)+1;
        if(randomArray.indexOf(randonumber)===-1){
            randomArray.push(randonumber);
        }
    }
    outer:
    for(let i=1; i<10; ++i){
        for(let w=0; w<9; ++w){
            for(let j=0; j<9; ++j) {
                let entry = randomArray[j];
                if(checkValidity(entry)){
                    sudokuArray[g][h]=entry;
                    
                    if(h===8){
                        if(g==8){
                            break outer;
                        }
                        ++g;
                        h=-1;
                    }
                    ++h;
                }
                
            }
        }
    }
}
function checkValidity(newEntry){
    //check row

    for(let j=0; j<9; ++j){
        if(sudokuArray[g][j] && sudokuArray[g][j]===newEntry){
            return false;
        }
    }
    
    //check column
    
    for(let j=0; j<9; ++j){
        if(sudokuArray[j][h] && sudokuArray[j][h]=== newEntry){
            return false;
        }
    }

    //check squares
    let col = (g-g%3);
    let row = (h-h%3);
    for(let i=col; i<col+3 ; ++i){
        for(let j=row; j<row+3; ++j){
            if(sudokuArray[i][j]===newEntry){
                return false;
            }
        }
    }
    return true;
}

function eraseRandom(){
    let randomArray=[];
    let eraseArray=[];

    while(randomArray.length<81){
        let randomNumber = Math.floor(Math.random() *81);
        if(randomArray.indexOf(randomNumber)===-1){
            randomArray.push(randomNumber);
        }
    }
    outer:
    for(let i=0; i<81; ++i){
        let temp;
        temp=allTds[randomArray[i]].innerHTML;

        for(let k=0; k<eraseArray.length; ++k){
            allTds[eraseArray[k]].innerHTML="";
                     
        }
        allTds[randomArray[i]].innerHTML="";
            for(let z=0; z< 9; ++z){
                for(let h=0; h<9; ++h){
                    sudoku[z][h]=["O","O","O","O","O","O","O","O","O"];
                    
                }
            }
            initialMark();
            crossOut();
            identifyLone();
            findSeulPossibility();
            transferToTable();

            if(allTds[randomArray[i]].innerHTML!==""){
                eraseArray.push(randomArray[i]);
            }else{
                allTds[randomArray[i]].innerHTML=temp;
            }
        
    }
    for(let k=0; k<eraseArray.length; ++k){
        allTds[eraseArray[k]].innerHTML="";
    }
    for(let k=0; k<81; ++k){
        if(allTds[k].innerHTML!==""){
            allTds[k].style.color="green";
        }
    }
}
function gernerateSudoku(){
    makeSudoku()
    populateSudoku()
    eraseRandom();
} 
function multiColLonesome(){
    
}