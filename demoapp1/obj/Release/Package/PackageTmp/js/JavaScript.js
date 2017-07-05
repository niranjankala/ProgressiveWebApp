function parentfolders(DN) {
    localStorage.dn = DN;
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
            $('#classlink_parent_child').empty();;
            for (var i = 0; i < result.response.length; i++) {
                debugger;
                id = result.response[i].id;
                result.response[i].filesfolder_name
                append1 = '<a href="#' + result.response[i].id + '_child" class="list-group-item" id="' + result.response[i].id + '" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-right"></span>' + result.response[i].filesfolder_name + '</a><div class="list-group collapse" id="' + result.response[i].id + '_child"> </div> ';
                $('#classlink_parent_child').append(append1);

            }


     



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
            //var append = ' <li> <a href="#" class="waves-effect"  ><i class="fa fa-folder-open" aria-hidden="true" id="' + prop + '_child"></i>' + prop + '</a></li>';
            //$("#child-clbody").append(append);
        }
        
        else if (prop == "googledrive") {
         
            var append = '<a href="#googledrive_parent" class="list-group-item" data-toggle="collapse" id="Dropbox_parent" ><span class="glyphicon glyphicon-chevron-right"></span>Google drive</a> </div>';

            $('#parentappend').append(append);
        }

        else if (prop == "dropbox") {
            //var append = '<li "> <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-hand-pointer-o"></i>Drop Box<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="drop_child">    </ul></div></li> ';
            //$("#nav-main").append(append);
            var append = '<a href="#classlink" class="list-group-item" data-toggle="collapse" id="Dropbox_parent" ><span class="glyphicon glyphicon-chevron-right"></span>Dropbox</a> </div>';

            $('#parentappend').append(append);
        }

        else if (prop == "office365") {
            //var append = '<li " > <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-hand-pointer-o"></i>Office 365<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="office_child">    </ul></div>    </li> ';
            //$("#nav-main").append(append);
            var append = '<a href="#classlink" class="list-group-item" data-toggle="collapse" id="Office365_parent" ><span class="glyphicon glyphicon-chevron-right"></span>Office 365</a> </div>';

            $('#parentappend').append(append);
        }

        else if (prop == "skydrive") {
            //var append = '<li  > <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-hand-pointer-o"></i>Sky Drive<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="sky_child">    </ul></div>    </li> ';
            //$("#nav-main").append(append);
            var append = '<a href="#classlink" class="list-group-item" data-toggle="collapse" id="Skydrive_parent" ><span class="glyphicon glyphicon-chevron-right"></span>Sky drive</a> </div>';

            $('#parentappend').append(append);
        }

        else {
            //var append = '<li > <a class="collapsible-header waves-effect arrow-r"><i class="fa fa-windows"></i>Sky Drive<i class="fa fa-angle-down rotate-icon"></i></a><div class="collapsible-body"><ul id="sky_child">    </ul></div>    </li> ';
            //$("#nav-main").append(append);
        }
        //  propCount++; skydrive
    }

    //$('#nav-mai.menu li:first-child').addClass('active');
}


function nextpara() {

    var data = localStorage.data;
    localStorage.clear();
    var data1 = localStorage.data;
}


function myclick(e,f) {


    ////alert(e.firstElementChild.innerText);
    //debugger;
    var ff = $(e).children("a").find(".collapsible-body")
    var id = '#' + f;
    $(f).css("display", "block");
    if ($(id).hasClass("collapsible-body"))//$(id).class == 'collapsible-body')
     {
        $(id).removeClass('collapsible-body');
    }
    else {
        $(id).addClass('collapsible-body');
     }


    event.stopPropagation();
}


///////////////   not to be changed at any cost frustated  //////////////////////////
function childfolders(result1) {
    //var count = result1.response.length;
    debugger;
    var id = result1;
   
   
     
        $.ajax({

            url: 'https://betanodeapi.classlink.com/clouddrive/folder',
            type: 'GET',
            dataType: 'json',
            headers: {
                'gwstoken': localStorage.dn,
                'folder_id': id,
                'search': '',
                'sort': 'type',
                'order': 'asc',
                'type': 'all',
                'page': '1',
                'per_page': 50,
                'deleted': 0
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function (result) {
                debugger;
                var id;
                var append1 = "";
                var mm = "#" + result1 + "_child";
                $(mm).empty();
                for(var i=0;i<result.response.length;i++)
                {
                    id = result.response[i].id;
                    result.response[i].filesfolder_name
                    var mm = "#"+result1 + "_child"
                    append1 = '<a href="#" class="list-group-item"><span class="glyphicon glyphicon-chevron-right"></span>' + result.response[i].filesfolder_name + '</a><div class="list-group collapse" id="' + result.response[i].id + '"></div>'
                    $(mm).append(append1);
                }

        
                console.log(result);
            
          


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

