function parentfolders(DN) {

    $.ajax({

        url: 'https://betanodeapi.classlink.com/clouddrive/folder',
        type: 'GET',
        dataType: 'json',
        headers: {
            'gwstoken': DN
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (result) {
            console.log(result);
            var count = result.response.length;
            debugger;
            for (var i = 0; i < count; i++) {
                // var append4 = '<ul> <li id="remove"> <ul class="collapsible collapsible-accordion"> <li> <a class="collapsible-header waves-effect arrow-r">  <i class="fa fa-folder"> </i> Submit blog <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body"> </div> </li> </ul>  </li> </ul>';
                // var append3 = '<ul> <li id="remove"> <ul class="collapsible collapsible-accordion">  <li> <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder"> </i> Submit blog <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body">'+append4+' </div> </li></ul> </li> </ul>  ';
               // var append7 = ' <li id="remove"> <ul class="collapsible collapsible-accordion"> <li> <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder"> </i> Submit blog <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body"> </div> </li> </ul> </li>';
               // var append6 = '<ul>  <li id="remove"> <ul class="collapsible collapsible-accordion"> <li> <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder"> </i> Submit blog <i class="fa fa-angle-down rotate-icon">  </i> </a> <div class="collapsible-body">' + append7 + ' </div> </li> </ul> </li> </ul>';
                //var append = '<li id="remove"> <ul class="collapsible collapsible-accordion"> <li> <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder" id="' + result.response[i].filesfolder_name + '_child" > </i> ' + result.response[i].filesfolder_name + ' <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body" >  </div><span id="' + result.response[i].id + '_child"></span> </li> </ul>';
                var append2 = '<a href="#SubMenu1" class="list-group-item" data-toggle="collapse" data-parent="#' + result.response[i].id+ '">' + result.response[i].filesfolder_name + '<i class="fa fa-caret-down"></i></a>'
                // $("#child-clbody").append(append3);
                // $("#child-clbody").append(append3);
                $('#class_child_1').append(append2);
                //$('#' + result.response[i].id + '_child').append(append2);
            }
            $("#remove>ul").css({
                "margin-left": "-15px",
                "margin-right": "-7%",

            });



        },
        failure: function (response) {
            alert('failure');
        },
        error: function (error) {

            alert('error');
            return false;
            console.log('error', error);

        }
    });


}

function addElementToLi(result) {
    console.log(result);
    var prop;

    for (prop in result.services) {
        items = prop;
        //
        if (prop == "my_classes" || prop == "my_documents" || prop == "my_shared") {
            
        }

        else if (prop == "googledrive") {
            var append = '<a href="#demo4" class="list-group-item list-group-item" data-toggle="collapse" data-parent="#MainMenu">Google drive</a> <div class="collapse" id="Google_child_1" > </div>';
            $("#nav-main").append(append);
        }

        else if (prop == "dropbox") {
            var append = '<a href="#demo4" class="list-group-item list-group-item" data-toggle="collapse" data-parent="#MainMenu">Dropbox</a> <div class="collapse" id="Dropbox_child_1" > </div>';
            $("#nav-main").append(append);
        }

        else if (prop == "office365") {
            var append = '<a href="#demo4" class="list-group-item list-group-item" data-toggle="collapse" data-parent="#MainMenu">Office365</a> <div class="collapse" id="Office365_child_1" > </div>';
            $("#nav-main").append(append);
        }

        else if (prop == "skydrive") {
            var append = '<a href="#demo4" class="list-group-item list-group-item" data-toggle="collapse" data-parent="#MainMenu">Skydrive</a> <div class="collapse" id="Skydrive_child_1" > </div>';
            $("#nav-main").append(append);
        }

        else {
            var append = '<a href="#demo4" class="list-group-item list-group-item" data-toggle="collapse" data-parent="#MainMenu">Skydrive</a> <div class="collapse" id="Skydrive_child_1" > </div>';
            $("#nav-main").append(append);
        }
        //  propCount++; skydrive
    }

    //$('#nav-mai.menu li:first-child').addClass('active');
}


function nextpara() {
    debugger;
    var data = localStorage.data;
    localStorage.clear();
    var data1 = localStorage.data;
}


function myclick(e,f) {

    alert(e.firstElementChild.innerText);
    var append2 = '<ul> <li id="remove"> <li id="remove"> <ul class="collapsible collapsible-accordion"> <li onclick=" myclick(this) " > <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder"  > </i> demo1231 <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body" >  </div> </li> </ul></li></ul>';
    var id = '#' + f+'_child';
    $(id).append(append2);
    debugger;
    event.stopPropagation();

}