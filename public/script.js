let option_cont = document.querySelector(".option-cont");
let tool_box_cont = document.querySelector(".toolbox-cont");
let pencil_tool_cont = document.querySelector(".pencil-tool-cont");
let eraser_tool_cont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload") ;




let optionFlag = false;

// true : menu icon  and false : cross icon

option_cont.addEventListener("click", (e) => {
    optionFlag = !optionFlag;

    if (optionFlag) openTool();
    else closeTool();
})

function openTool() {
    let iconElem = option_cont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    tool_box_cont.style.display = "flex";
}

function closeTool() {
    let iconElem = option_cont.children[0];
    iconElem.classList.add("fa-bars");
    iconElem.classList.remove("fa-times");
    tool_box_cont.style.display = "none";
    pencil_tool_cont.style.display = " none";
    eraser_tool_cont.style.display = " none";

}


let pencilFlag = false;
let eraserFlag = false;

pencil.addEventListener("click", (e) => {

    pencilFlag = !pencilFlag;

    if (pencilFlag) {
        pencil_tool_cont.style.display = "block";
    }
    else {
        pencil_tool_cont.style.display = "none";
    }
})

eraser.addEventListener("click", (e) => {

    eraserFlag = !eraserFlag;

    if (eraserFlag) {
        eraser_tool_cont.style.display = "flex";
    }
    else {
        eraser_tool_cont.style.display = "none";
    }
});

sticky.addEventListener("click", (e) => {


    let stickyTemplate  = ` 

    <div class="header-cont">

        <div class="minimize"></div>
        <div class="remove"></div>
    </div>

    <div class="note-cont">

        <textarea spellcheck ="false"></textarea>

    </div>
    ` ;

    createSticky(stickyTemplate) ;
})

// upload sticky actions.

upload.addEventListener("click" , (e) => {

    // opening the file explorer.
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click() ;

    input.addEventListener("change" , (e) => {

        let image = input.files[0] ;

        let imgUrl = URL.createObjectURL(image) ;

        let stickyTemplate = ` 

        <div class="header-cont">
    
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
    
        <div class="note-cont">
    
            <img src ="${imgUrl}"/>
    
        </div>
        ` ;

        createSticky(stickyTemplate) ;

    })
})


function createSticky(stickyTemplate) {

    let stickyDiv = document.createElement("div");
    stickyDiv.setAttribute("class", "sticky-cont");

    stickyDiv.innerHTML = stickyTemplate ;

    document.body.appendChild(stickyDiv) ;

    let minimize = stickyDiv.querySelector(".minimize") ;
    let remove = stickyDiv.querySelector(".remove") ;

    stickyActions(minimize,remove,stickyDiv) ;


    stickyDiv.onmousedown = function(event) {

        dragAndDrop(stickyDiv,event) ;       

      };
      
      stickyDiv.ondragstart = function() {
        return false;
      };


    
}



function dragAndDrop(element , event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
    
}

function stickyActions(minimize,remove,stickyDiv) {

    remove.addEventListener("click", (e) => 
    {

        stickyDiv.remove() ;

    });
    

    minimize.addEventListener("click", (e) => {

        let noteCont = stickyDiv.querySelector(".note-cont") ;

        let noteValue = getComputedStyle(noteCont).getPropertyValue("display") ;

        if(noteValue === "none") noteCont.style.display = "block" ;
        else noteCont.style.display = "none" ;
    })
}