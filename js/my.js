//=============================================================================

// JavaScript Document Creted By pavan solanke

//===================================== Set config File For Crousal =======================================

var xmlPath="config.xml"
var imageListArr;	
var fontSet;
var bacgrounImage;	
var crousalHeight;
var crousalWidth;
var crousalPostion;
var descriptionBackrounColor;
var descriptionBackrounOpacity;
var descriptionFontColor ;
var popupWidth;
var popupHeight;
var popupX;
var	popupY;
var imageBorderDefaultColor;
var imageBorderSelectedColor;

var imagepathArr= ["Holi_1.jpg","Holi_2.jpg","Holi_3.jpg","Holi_4.jpg","Holi_5.jpg","Holi_6.jpg","Holi_7.jpg","Holi_8.jpg","Holi_9.jpg","Holi_10.jpg","Holi_11.jpg","Holi_12.jpg","Holi_13.jpg","Holi_14.jpg","Holi_15.jpg","Holi_16.jpg","Holi_17.jpg","Holi_18.jpg","Holi_19.jpg","Holi_20.jpg","Holi_21.jpg","Holi_22.jpg"];
var playlistimageTitle =["One","two","three","Four","Five","Six","Seven","Eight","Nine","One","two","three","Four","Five","Six","Seven","Eight","Nine",,"Six","Seven","Eight","Nine"];
var playlistimageDescription = ["One","two","three","Four","Five","Six","Seven","Eight","Nine","One","two","three","Four","Five","Six","Seven","Eight","Nine",,"Six","Seven","Eight","Nine"];


var myXmlLoader = function (path)
{
this.main(path);
}


$.extend(myXmlLoader.prototype, {

path: '',

main: function(path) {
this.path = path;	
},

	xmlLoad: function ()
	{
		currentData=null;
		$.ajax({
		type: "GET",
		url: this.path,
		dataType: "xml",
		success: loadData
	});

}
});




// ========================= parce config.xml file ============================================================================

function loadData(data) {
$(data).find('configuration').each(function(){
//imageListArr = $(this).find('imageListArr').text();	
fontSet = $(this).find('fontSet').text();
backgrounImage = $(this).find('backgroundUrl').text();	
crousalHeight = $(this).find('crousalHeight').text();
crousalWidth = $(this).find('crousalWidth').text();

crousalPostion = $(this).find('crousalPostion').text();


descriptionBackrounColor = $(this).find('descriptionBackrounColor').text();
descriptionBackrounOpacity = $(this).find('descriptionBackrounOpacity').text();
descriptionFontColor = $(this).find('descriptionFontColor').text();

popupWidth =$(this).find('popupWidth').text();	
popupHeight =$(this).find('popupHeight').text();

popupX =$(this).find('popupX').text();
popupY =$(this).find('popupY').text();
imageBorderDefaultColor =$(this).find('imageBorderDefaultColor').text();
imageBorderSelectedColor =$(this).find('imageBorderSelectedColor').text();	

$("#popup").css("margin-left",popupX+"px");
$("#popup").css("margin-top",popupX+"px");


$("body").css("background", "#daeef9 url('"+backgrounImage+"') no-repeat center top");	
var colorConvert = convertToHexColor(descriptionBackrounColor).split(")")[0]+","+descriptionBackrounOpacity+")";
$("#imageDetails").css("background-color",colorConvert).css("color",descriptionFontColor);

$('body').css('font-family', fontSet);

if(crousalPostion=="left")
{
$("#playListThumb").css("float",crousalPostion);	
$("#playListThumb").css("margin-left","-200px");
$("#imageTitle").css("float","right");
$("#imageDescription").css("float","right");
}

//create crousal object 


var widget1 = new MyWidget(imagepathArr,crousalWidth,crousalHeight);
widget1.createCrousal();

});
}

//=============================== Convert color code hexadecimal to rgb==================================	

function convertToHexColor(englishColor) {
var div = $('<div></div>').appendTo("body").css('background-color', englishColor);
var computedStyle = window.getComputedStyle(div[0]);	
var computedColor = computedStyle.backgroundColor;
div.remove();	
var convertrgba = computedColor.substring(0, 3)+ 'a' +computedColor.substring(3);	
return convertrgba;
};	



//==============================Create Crousal ===========================

MyWidget = function(_imageListArr, _radiusX, _radiusY) {
this.init(_imageListArr,_radiusX,_radiusY);
}

$.extend(MyWidget.prototype, {
// object variables
_imageListArr: '',
_radiusX:'',
_radiusY:'',

init: function(_imageListArr, _radiusX, _radiusY) {
// do initialization here
this._imageListArr = _imageListArr;
this._radiusX = _radiusX;
this._radiusY = _radiusY;
},

/* getPlayer:function ()
{
return this.createCrousal.currentHighestDepthId;
},*/

createCrousal: function() 
{
var imageListArr = this._imageListArr; 
var radiusX =this._radiusX ;
var radiusY =this._radiusY ;

var centerX = 0;
var centerY = 300;
var addData = -1;
var currentHighestDepthId;

//======================= Parse json and create img element ===================================================
function parseJson()
{

var depth = imagepathArr.length;

$.each(imagepathArr, function(i, item) {

var angle = i * (Math.PI*2) / imagepathArr.length;
var angleDegrees = angle * 180/Math.PI;
//console.log(angleDegrees);

var left = centerX + Math.cos(angle) * radiusX;
var top = centerY + Math.sin(angle) * radiusY;

var feedTitle = imagepathArr[i]; 
var thumb = "images/"+ imagepathArr[i];

var ImageItems = $('<li class="ImageItem" data-angle="'+angleDegrees+'" data-left="'+left+'px;" data-top="'+top+'px;" id="item_'+i+'" style="top:'+centerY+'px;left:'+centerX+'px;z-index:'+depth+';" ><img id="image_'+ i +'"height="150" width="250" alt="'+ feedTitle+'" src="'+ thumb +'"+</li>');

depth--;

$("#playListThumb").append(ImageItems);

});

$(".ImageItem").each(function(index, element) {
	var valTop = parseFloat($(this).attr('data-top'));
	var valLeft = parseFloat($(this).attr('data-left'));
	$(element).animate({
	top:valTop,
	left:valLeft,
},600, function ()
{	
//var intervalID = setInterval(mover, 100);	
	cheakMousePostion();
	createjs.Ticker.setFPS(40);
	createjs.Ticker.addEventListener("tick", mover);
})
});


}

//========================== Rotet Imageg rouned circle ==========================

function mover()
{
	
	$(".ImageItem").each(function(index, element) {
	
	var angDeg = parseFloat($(element).attr("data-angle"));
	angDeg+=addData;
	
	var angRad = angDeg * Math.PI/180;
	
	var left = centerX + Math.cos(angRad) * radiusX;
	var top = centerY + Math.sin(angRad) * radiusY;
	var zIndexNew = Math.round(Math.cos(angRad - Math.PI)*80);
	
	if(crousalPostion=="left")
	zIndexNew = Math.round(Math.cos(angRad - Math.PI*2)*80);
	
	TweenLite.to($(element),0, {top:top, left:left,zIndex:zIndexNew});
	
	setBorderImage(zIndexNew,$(element));
	
	$(element).attr("data-angle",angDeg);
	
	});

}

//================================ Set the Border Of Higest Dept Image and Assien event Image ================================

function setBorderImage(getzIntex,elem){

if(getzIntex===findHighestZIndex(".ImageItem"))
{
	$(elem).find('img').css({
	'border':'1px solid'+imageBorderSelectedColor,
	'cursor':'pointer',
	});	
	
	$(elem).css({
	'margin-top': '-4px'
	})

var tempId = ($(elem).attr('id')).split("_")[1];
if(currentHighestDepthId=="" || currentHighestDepthId !=tempId)
{
	$(elem).bind("click",onImageClickPlayImage);
	$("#imageTitle").html(playlistimageTitle[tempId]);
	$("#imageDescription").html(playlistimageDescription[tempId]);

	var curHeight = $('#ImageDetails').height();
	$('#ImageDetails').css('height', 'auto');
	var autoHeight = parseInt($('#ImageDetails').height())+20;
	$('#ImageDetails').height(curHeight).animate({height: autoHeight}, 200);

}
	currentHighestDepthId = tempId;

}else
{
	$(elem).unbind("click",onImageClickPlayImage);
	$(elem).find('img').css({
	'border':'1px solid'+imageBorderDefaultColor,
	'cursor':'default'	
});	

}

}


//========== Hight dept Find ==========================================================
function findHighestZIndex(element) {
var allObjects = $(element);
var allObjectsArray = $.makeArray(allObjects);
var zIndexArray = [0];
var largestZindex = 0;
for (var i = 0; i < allObjectsArray.length; i++) {
var zIndex = $(allObjectsArray[i]).css('z-index');
zIndexArray.push(zIndex);
}
var largestZindex = Math.max.apply(Math, zIndexArray);
return largestZindex;
};

//============================ On ThumbImage Click ===============================

function onImageClickPlayImage()
{
	$("#popup").css("display","block");	
	var newImages = "<img src='"+$(this).find('img').attr('src')+"' width='"+popupWidth+"px' height='"+popupHeight+"px' >"; 
	//alert(newImages)
	$("#imageData").find('img').remove();
	$("#imageData").append(newImages);
	var Imageborder = "2px solid"+imageBorderSelectedColor;
	$("#imageData").find('img').css('border',Imageborder);
	//$(this).find('img').attr('src');	
	$(this).unbind("click",onImageClickPlayImage);
	$("#closeBtn").bind("click",closePlayer);
	
	//TweenMax.to( $("#popup"), 1, {opacity:0, repeat:0, yoyo:true});
	//TweenMax.to($("#popup"), 1, {opacity:1, rotation:45});
	TweenLite.to($("#popup"), 1, {css:{scale:2,rotation:-20}});
	TweenLite.to($("#popup"), 0.1, {css:{alpha:1}});
	createjs.Ticker.removeEventListener("tick", mover);
	//var currentImageId = path.split("/")[4];
	

}


//============================ close popup ==================================================================

function closePlayer(){
//player.stopImage();
createjs.Ticker.addEventListener("tick", mover);
	TweenLite.to($("#popup"), 1, {css:{scale:1,rotation:0, alpha:0 }});

	//$("#popup").css("display","none");	
	//$('#imageTitle').html("Title");
	//$('#imageDescription').html("Description");	

	$("#closeBtn").unbind("click",closePlayer);
}

//======================== event for window resize ==========================================================

$(window).resize(function() {
//cheakMousePostion()
});

//===================== Cheak mouse postion =======================================================================

function cheakMousePostion()
{
var mouseY = 0;
var documnetHeight = parseInt($(window).height());
var imageDetailsToppostion = documnetHeight*40 /100;
var coursorStopPostion = imageDetailsToppostion + parseInt($('#imageDetails').height());

$('#ImageDetails').css('margin-top',imageDetailsToppostion);	
//var temp = (100/documnetHeight)+4;
var temp = ((documnetHeight-(radiusY*2))/2)-80;

//$('#playListThumb').css('margin-top',(temp+"%"));
$('#playListThumb').css('margin-top',(temp));
//console.log("documnetHeight"+documnetHeight+" temp >>" +temp);
$(window).bind("mousemove",function(e){
var newdocumnetHeight = documnetHeight/2;

var mainHeight = parseInt($('#Main').css('height'));

var center = (mainHeight/2) - mouseY;

if(imageDetailsToppostion>mouseY){

addData = (mouseY/imageDetailsToppostion)-2 ;
//(mouseY/imageDetailsToppostion)-2;
//console.log(parseInt("1") - (mouseY/imageDetailsToppostion));
}
else if(mouseY >(imageDetailsToppostion) && mouseY < coursorStopPostion)
{
addData = 0;
//console.log("Middle");
}else
{
var currentY = mouseY - coursorStopPostion;
var currentHeight = documnetHeight -coursorStopPostion;
//console.log("mouseY"+ mouseY + " >> "+currentY/currentHeight);
addData = currentY/currentHeight+1;
}

mouseY = e.pageY;
})
}

parseJson();
}
});

