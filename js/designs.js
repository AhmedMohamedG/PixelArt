$( document ).ready(function pageScript(){
/*
Table of content
* ===1 canvas object and values===
* ===2 canvas Function ===
* ===3 layout modifying ===
*/
/*
* ===1 canvas object and values===
*/
/*declaring an object for the canvas that has initial values and a method to create, clear and random fill a drawing canvas also the object has a method to display and hide divs 
 */
const pixelsCanvas = {
    height : $('#input_height').val(),
    width : $('#input_width').val(),
    color : $('#colorPicker').val(),
    id : '#pixel_canvas',
    cellSize: $('#cell_size').val(),
    setgrid : function() {
            for (let i=0 ; i < pixelsCanvas.height ; i++){
                const rowid = "rowof"+i ;
                $(pixelsCanvas.id).append("<tr id="+rowid+"></tr>");
          
                for (let x=0 ; x<pixelsCanvas.width ; x++ ){
                    const  cellid = "cellof"+x+rowid ; 
                    $("#"+rowid).append("<td id="+cellid+" class=\"\"></td>");
                }
            }
            $('td , tr').css({"height": pixelsCanvas.cellSize , "width": pixelsCanvas.cellSize });
            $(pixelsCanvas.id).on( "mouseout mouseover click no-drop", function(e){
                if(pixelsCanvas.isMouseClicked || e.type === "click" ){
                        pixelsCanvas.paint(e.target);   
                }else{
                    return;
                }
            });
            $(pixelsCanvas.id).on("dblclick",function(e){
                pixelsCanvas.eraser(e.target); 
            });
            },
    paint : function(cell){
            $(cell).css({"background-color": pixelsCanvas.color});
            $(cell).addClass("painted")
            },
    random : function(){  
            let trs = $(pixelsCanvas.id).children('tr').length;
            let tds = $(pixelsCanvas.id).children('tr').children('td').length; 
            for (let i=0 ; i < trs ; i++){
                const rowsrows = "rowof"+i ;
                for (let x=0 ; x< tds ; x++ ){
                    const  cellidcellid = "cellof"+x+rowsrows ; 
                    let randomnumber = Math.round(Math.pow((Math.random() + 9) , Math.random())) , r,g,b; 
                    switch(randomnumber){
                        case 1:
                            r= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            g= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            b= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            break; 
                        case 2: 
                            r= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            g= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            b= 255
                            break; 
                        case 3:
                            r= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            g= 255
                            b= 255
                            break; 
                        case 4:
                            r= 255 
                            g= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            b= 255
                            break; 
                        case 5:
                            r= 255
                            g= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            b= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            break; 
                        case 6:
                            r= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            g= 255 
                            b= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            break;
                        case 7:
                            r=0 
                            g=0  
                            b=0
                            break;
                        case 8:
                            r= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            g= 0 
                            b= 255/Math.round(Math.pow((Math.random() + 9) , Math.random())); 
                            break; 
                        default: 
                            r= 255
                            g= 255
                            b= 255
                            break;                       
                    }
                    let rgb = "rgb("+ r +","+ g +","+b +")";
                    let loopedCell = $("#"+cellidcellid);
                    if(!loopedCell.hasClass("painted")){
                        loopedCell.css("background-color", rgb);
                    }
                }
            }
        },
    isMouseClicked: false,
    clear: function(){  
                const allCells = $('td , tr');
                allCells.removeClass('painted');
                allCells.css("background-color","");
            },
    eraser: function (cell){
                $(cell).css("background-color","");
                $(cell).removeClass("painted")
            },
    /* the show Hide has 6 parameters for the inted div id, the button id that it is applied to, text and font awesome classes for the button default and pressed states*/
    showHide: function(divId , buttonID , defButtonTxt , altButtonTxt , deffaclass, altfaclass) {
                let identifiersDisplayed = $("#"+divId).css("display")
                if(identifiersDisplayed === "none"){
                        $("#"+divId).css("display","block");
                        $("#"+buttonID).html(" "+ defButtonTxt);
                        //font awesome class:
                        $("#"+buttonID).attr('class',deffaclass)
                }else{
                        $("#"+divId).css("display","none");
                        $("#"+buttonID).html(" "+ altButtonTxt);
                        //font awesome class:
                        $("#"+buttonID).attr('class',altfaclass)
                }
             }
        }
//TODO: toggle the values of the canvas object according to the user's choices
$('#input_height').change(function(){
    pixelsCanvas.height = $('#input_height').val();
}); 
$('#input_width').change(function(){
    pixelsCanvas.width = $('#input_width').val();
});
$('#colorPicker').change(function(){
    pixelsCanvas.color = $('#colorPicker').val();
});
$('#cell_size').change(function(){
    pixelsCanvas.cellSize = $('#cell_size').val();
});
/*
* ===2 canvas Function ===
*/
/*
TODO: create the grid using the the canvas setgrid method it also allow the user to recreate the canvas with different values : height and width. 
TODO: Allow the user to set multiple background colors to the table cells
the function also hide the selectors area and shows the canvas area that is by default hidden.
*/
//let numberofrows='';
$('#submit_button').click(function makeGrid(e) {
    e.preventDefault();
    let gridlength  = $(pixelsCanvas.id).html().length;
    if(gridlength === 0 ){
         pixelsCanvas.setgrid();
    }else{   
        $(pixelsCanvas.id).remove();
        $('#table_pixles').append('<tbody id="pixel_canvas"></tbody>');
        pixelsCanvas.setgrid();
     }
    $('#canvasModifiers').css("display","none");   
    $('#canvasArea').css({ "display": "block"});
    $('#bordercontroler').html("hide borders!");
});
/*
TODO: Toggle the pixelCanvas property isMouseClicked as the mouse is clicked or released
*/
$(document).on("mousedown" , function(e){
     pixelsCanvas.isMouseClicked = true;
});
$(document).on("mouseup  drag" , function(e){
     pixelsCanvas.isMouseClicked = false;
});
//TODO: set and clear interval for pixelCanvas method random.    
let counter = true ; 
let randomWithInterval;    
$('#randomness').click(function (e) {
    e.preventDefault();
    if(counter){
        pixelsCanvas.random();
        randomWithInterval = setInterval(function(){ pixelsCanvas.random() }, 2000);  ;      
        $('#randomness').css({"box-shadow": "none" , "border": "1px solid black"});
        counter= false;
     }else{        
        clearInterval(randomWithInterval);
        counter=true;
        return;
     }
});
//TODO: Clear all cells.    
$('#clearAll').click(function(e){
    e.preventDefault();
    pixelsCanvas.clear();
});    
/*
* ===3 layout modifying ===
*/
//TODO: Show or hide the selectors area.
$('#resizeCanvasButton').click(function resizeCanvas(e) {
    e.preventDefault();
    pixelsCanvas.showHide("canvasModifiers" , "resizeCanvasButton", " Hide selectors" , " Show selectors" ,"icon-collapse-top", "icon-collapse");
});
//TODO: Show or hide the table's border
let isBorderRemoved = 0;
$('#bordercontroler').click(function toggleborder(e){
    e.preventDefault();
    if(isBorderRemoved===0){
        $('table, tr ,td').css("border","none");
        isBorderRemoved++
        $('#bordercontroler').html("Show borders!");
    }else{
        $('table, tr ,td').css("border","1px solid black");
        isBorderRemoved--
        $('#bordercontroler').html("hide borders!");
        }
       });
//TODO: Changes the layout of buttons and input type submit elemnts on mouseHover.
$('button,input[type=submit]').mousemove(function(e){
    $(e.target).css("box-shadow","5px 5px 10px red");
    if(!counter){
        $('#randomness').css({"box-shadow": "none" , "border": "1px solid black"})
          }
});
$('button,input[type=submit]').mouseleave(function(e){
    $(e.target).css("box-shadow","2px 2px 5px red")
    !counter? $('#randomness').css({"box-shadow": "none" , "border": "1px solid black"}):$('#randomness').css({"box-shadow": "2px 2px 5px red" , "border": ""});
});
/* TODO: Show and hide footer */    
$('#InstructionsButton').click(function(e){
    e.preventDefault();
    pixelsCanvas.showHide("InstructionsDiv" , "InstructionsButton", "Hide Instructions" , "Show Instructions" ,"", "");
});
});