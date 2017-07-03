if ($(e).children("a").class == 'collapsible-header waves-effect arrow-r')
{
    $(e).children("a").removeClass == 'collapsible-header waves-effect arrow-r'
    $(e).children("a").addClass('collapsible-header waves-effect arrow-r active');
}
else {
    $(e).children("a").removeClass('collapsible-header waves-effect arrow-r active');
    $(e).children("a").addClass('collapsible-header waves-effect arrow-r');
}


var append2 = '<ul> <li id="remove"> <li id="remove"> <ul class="collapsible collapsible-accordion"> <li onclick=" myclick(this) " > <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder"  > </i> demo1231 <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body" >  </div> </li> </ul></li></ul>';
var id = '#' + f + '_child';
$(id).append(append2);//collapsible li a:hover
var ff = $(e).children("div").find(".collapsible-body");
if (ff.css('display') == 'none')
{

    // $(e).children("div").find(".collapsible-body").css("display", "block");

    //alert(e.firstElementChild.innerText);


var ff = $(e).children("div").find(".collapsible-body")
if (ff.css('display') == 'none') {
    $(e).children("div").find(".collapsible-body").css("display", "block");
}


}
else {
    $(e).children("div").find(".collapsible-body").css("display", "block");
}
console.log(hh);
event.stopPropagation();