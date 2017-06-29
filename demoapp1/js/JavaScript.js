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
                var append2 = '<ul> <li id="remove"> <li id="remove"> <ul class="collapsible collapsible-accordion"> <li onclick=" myclick(this,' + result.response[i].id + ') " > <a class="collapsible-header waves-effect arrow-r"> <i class="fa fa-folder" id="' + result.response[i].filesfolder_name + '_child" > </i> ' + result.response[i].filesfolder_name + ' <i class="fa fa-angle-down rotate-icon"> </i> </a> <div class="collapsible-body"> <span id="' + result.response[i].id + '_child"></span> </div> </li> </ul></li></ul>'
                // $("#child-clbody").append(append3);
                // $("#child-clbody").append(append3);
                 $('#child-clbody').append(append2);
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

    //$('li #nav-main').on("click","li", function () {
    //    debugger;
    //    event.stopPropagation()
    //    event.preventDefault();
    //    var data = this.firstElementChild.innerText;
    //    console.log(data);
    //    alert(data);
    //});

   

    //$(' li').on("click", function () {
    //    debugger;
    //    var data = this.firstElementChild.innerText;
    //    console.log(data);
    //    //var append2 = '<ul> <li><a href="#" class="waves-effect">For bloggers</a></li><li><a href="#" class="waves-effect">For authors</a></li></ul>';
    //    //$('#28_child').append(append2);
    //});
    //$('#nav-main li').bind("click", function (e) {
    //    debugger;
    //    e = e || window.event;
    //    var ul = $(this).parent();
    //    var data = this.firstElementChild.innerText;
    //    var index = ul.children().index(this);
    //    if (localStorage.data == null) {
    //        localStorage.data = data + index;
    //    }
    //    nextpara();
    //});
}

function addElementToLi(result) {
    console.log(result);
    var prop;

    for (prop in result.services) {
        items = prop;
        //
        if (prop == "my_classes" || prop == "my_documents" || prop == "my_shared") {
            //var append = ' <li> <a href="#" class="waves-effect"  ><i class="fa fa-folder-open" aria-hidden="true" id="' + prop + '_child"></i>' + prop + '</a></li>';
            //$("#child-clbody").append(append);
        }

        else if (prop == "googledrive") {
            var append = '<li onclick=" myclick(this) "> <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-google"></i>Google Drive<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="google_child">    </ul></div>    </li> ';
            $("#nav-main").append(append);
        }

        else if (prop == "dropbox") {
            var append = '<li onclick=" myclick(this) "> <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-hand-pointer-o"></i>Drop Box<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="drop_child">    </ul></div></li> ';
            $("#nav-main").append(append);
        }

        else if (prop == "office365") {
            var append = '<li onclick=" myclick(this) " > <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-hand-pointer-o"></i>Office 365<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="office_child">    </ul></div>    </li> ';
            $("#nav-main").append(append);
        }

        else if (prop == "skydrive") {
            var append = '<li onclick=" myclick(this) " > <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-hand-pointer-o"></i>Sky Drive<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="sky_child">    </ul></div>    </li> ';
            $("#nav-main").append(append);
        }

        else {
            var append = '<li onclick=" myclick(this) "> <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-windows"></i>Sky Drive<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="sky_child">    </ul></div>    </li> ';
            $("#nav-main").append(append);
        }
        //  propCount++; skydrive
    }

    $('#nav-mai.menu li:first-child').addClass('active');
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