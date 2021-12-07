let canvas = document.querySelector("canvas");
let pencil_width_range = document.querySelector(".pencil-width-range");
let eraser_width_range = document.querySelector(".eraser-width-range");
let pencil_colors = document.querySelectorAll(".pencil-color");
let donwloadIcon = document.querySelector(".download") ;
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

// applying the height and width to canvas.
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;


let pencilWidth = pencil_width_range.value ;
let EraserWidth  = eraser_width_range.value ;
let penColor = "red" ;
let eraserColor = "white" ; 


let undoRedoArr = [] ; // it will have data
let Track = 0 ; // this will track undo redo data


// making tool
let tool = canvas.getContext("2d") ;

tool.lineWidth=pencilWidth;
tool.strokeStyle=penColor ;

let isMouseDown = false ;

canvas.addEventListener("mousedown", (e) => {
    isMouseDown = true ;
    tool.beginPath() ;
    tool.moveTo(e.clientX , e.clientY) ;
})

canvas.addEventListener("mousemove", (e) => {

    if(isMouseDown){
        tool.lineWidth = eraserFlag ? EraserWidth : pencilWidth ;
        tool.strokeStyle = eraserFlag ? eraserColor : penColor ;
        tool.lineTo(e.clientX , e.clientY ) ;
        tool.stroke() ;
    }
})

canvas.addEventListener("mouseup",(e) => {
    isMouseDown = false ;

    let data = canvas.toDataURL() ;
    undoRedoArr.push(data) ;
    Track = undoRedoArr.length - 1 ;
})



pencil_colors.forEach((colr_elem) => {

    colr_elem.addEventListener("click",(e) =>{
        let color = colr_elem.classList[0] ;
        penColor = color ;
        tool.strokeStyle = penColor ;
    })
} )

pencil_width_range.addEventListener("change" , (e) => {
    pencilWidth = pencil_width_range.value ;
    tool.lineWidth = pencilWidth ;
})

eraser.addEventListener("click",(e) => {
    if(eraserFlag){

        tool.lineWidth = EraserWidth ;
        tool.strokeStyle = eraserColor ;
    }
    else{

        tool.lineWidth = pencilWidth ;
        tool.strokeStyle = penColor ;
    }

})

eraser_width_range.addEventListener("change" , (e) => {

    EraserWidth = eraser_width_range.value ;
    tool.lineWidth = EraserWidth ;
        tool.strokeStyle = eraserColor ;

    
});


donwloadIcon.addEventListener("click" ,(e) => {

    let url = canvas.toDataURL() ;

    let a = document.createElement("a") ;
    a.href = url ;
    a.download = "board.jpg" ;
    a.click() ;
})


// undo and redo functionality.

undo.addEventListener("click", (e) => {
    console.log("undo");
    if(Track > 0) Track-- ;

    let trackObj = {
        trackValue : Track,
        UndoRedoArr: undoRedoArr
    }

    applyPreviousImage(trackObj) ;
})

redo.addEventListener("click",(e) =>{

    console.log("redo");
    if(Track < undoRedoArr.length - 1) Track++;

    let trackObj = {
        trackValue : Track,
        UndoRedoArr: undoRedoArr
    }
    applyPreviousImage(trackObj) ;
})

function applyPreviousImage(trackObj) {

    Track = trackObj.trackValue ;
    undoRedoArr = trackObj.UndoRedoArr ;
    
    console.log(undoRedoArr);
    let url = undoRedoArr[Track] ;
    console.log(url);
    let image = document.createElement("img");
    image.src = url ;
    image.onload = (e) => {
        tool.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    // tool.fillRect(0,0,canvas.width,canvas.height) ;

}

