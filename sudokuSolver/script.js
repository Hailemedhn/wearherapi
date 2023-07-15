const allTds = document.getElementsByTagName("td");
const allPs = document.body.querySelector(".container").querySelectorAll("p");
const startButton = document.querySelector(".button");
const resetButton = document.querySelector(".reset");
const eraseButton =  document.body.querySelector(".container").querySelector("span");


startButton.addEventListener("click",initialMark);
resetButton.addEventListener("click", ()=>{
    for(let i=0; i< allTds.length; ++i){
        allTds[i].innerHTML="";
    }
})

let selected = "";

eraseButton.addEventListener("click",()=>{selected=""})
for(let i=0; i<allTds.length; ++i){
    allTds[i].addEventListener("click",(event)=>{
        event.target.innerText = selected})
}

for(let i=0; i<allPs.length; ++i){
    allPs[i].addEventListener("click",function (event){
        selected = event.target.innerText;
    })
}
 
let sudoku = new Array(9)
for(let i=0; i< 9; ++i){
    sudoku[i]= new Array(9);
    for(let j=0; j< 9; ++j){
        sudoku[i][j] = new Array ("O","O","O","O","O","O","O","O","O");
    }   
}
populateSudoku()
function populateSudoku(){
    let hardSudoku=[
        0,0,0,0,9,0,0,2,0,
        4,0,2,5,0,0,0,6,0,
        0,5,3,0,7,0,0,4,0,
        0,7,8,0,0,1,0,0,0,
        9,0,0,0,5,0,0,0,0,
        0,4,0,6,0,0,0,0,0,
        0,0,0,0,0,7,0,0,2,
        5,0,0,0,4,0,7,0,0,
        0,0,0,0,0,0,1,0,6
    ]
    for(let i=0; i<81;i++){
        if(hardSudoku[i]!==0){
            allTds[i].innerHTML=hardSudoku[i];
        }
    }
}
function initialMark(){
    let counter=0;
    let complete=false;
    for(let i=0; i<9; ++i){
        for(let j=0; j<9; ++j){
            if(allTds[counter].innerHTML.trim()!==""){
                sudoku[i][j].length=1;
                sudoku[i][j][0]=allTds[counter].innerHTML.trim();
            }
            counter++
        }
    }
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