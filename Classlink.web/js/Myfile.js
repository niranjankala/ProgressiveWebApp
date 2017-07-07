function jump() {
    debugger;
    localStorage.dn = localStorage.demo;
    $.ajax({
        url: 'https://betanodeapi.classlink.com/clouddrive/folder',
        type: 'GET',
        dataType: 'json',
        headers: {
            'gwstoken': localStorage.demo
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (result) {
            console.log(result);
            var count = result.response.length;
           // $('#classlink_parent_child').empty();
            $('#sidemenu').empty();
            for (var i = 0; i < result.response.length; i++) {
                debugger;
                id = result.response[i].id;
                result.response[i].filesfolder_name;
                var append = '<a href="#' + result.response[i].id + '" id="' + result.response[i].id + '" onclick="childfolders(' + result.response[i].id + ')"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center google-drive"><div class="box-body"><h2 class="no-margin">' + result.response[i].filesfolder_name + '</h2><span class="icon-scope"><i><img style="max-width: 55px" src="../images/icon/folder.png" /></i> </span></div></div></div></a>';
                $('#sidemenu').append(append);

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


};

function addElementToLi(result) {
    console.log(result);
    var prop;
    debugger;
    for (prop in result.services) {
        items = prop;
    
        if (prop == "my_classes" || prop == "my_documents" || prop == "my_shared") {
        
        }

        else if (prop == "googledrive") {

            var append = '<a href="##gdrive" id="gdrive"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center google-drive"><div class="box-body"><span class="icon-scope"><i><img src="../images/icon/gdrive.PNG" /></i> </span></div></div></div></a>';

            $('#sidemenu').append(append);
        }

        else if (prop == "dropbox") {

            var append = ' <a href="#drop" id="drop"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center dropbox"><div class="box-body"><span class="icon-scope"><i> <img src="../images/icon/drop.PNG" /></i></span></div> </div></div> </a>';

            $('#sidemenu').append(append);
        }

        else if (prop == "office365") {

            var append = '<a href="#office365" id="office365"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center ms-office"><div class="box-body"><span class="icon-scope"> <i><img src="../images/icon/office365.PNG" /></i></span></div></div> </div></a> </div> </section></div></div>';

            $('#sidemenu').append(append);
        }

        else if (prop == "skydrive") {

            var append = '<a href="#skydrive" id="skydrive"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center ms-office" style="background-color: #0949b0;"><div class="box-body"><span class="icon-scope"> <i><img src="../images/icon/sky.PNG" /></i></span></div></div> </div></a> </div> </section></div></div>';

            $('#sidemenu').append(append);
        }

        else {
            
        }
       
    }


}


function nextpara() {

    var data = localStorage.data;
    localStorage.clear();
    var data1 = localStorage.data;
}


function myclick(e, f) {


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
            $('#sidemenu').empty();
           // var mm = "#" + result1 + "_child";
           // $(mm).empty();
            for (var i = 0; i < result.response.length; i++) {
                id = result.response[i].id;
                result.response[i].filesfolder_name
                var mm = "#sidemenu"; //"#" + result1 + "_child"
                var append = '<a href="#' + result.response[i].id + '" id="' + result.response[i].id + '" ><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center google-drive"><div class="box-body"><h2 class="no-margin">' + result.response[i].filesfolder_name + '</h2><span class="icon-scope"><i><img style="max-width: 55px" src="../images/icon/folder.png" /></i> </span></div></div></div></a>';
                $('#sidemenu').append(append);

                //append1 = '<a href="#" class="list-group-item"><span class="glyphicon glyphicon-chevron-right"></span>' + result.response[i].filesfolder_name + '</a><div class="list-group collapse" id="' + result.response[i].id + '"></div>'
                //$(mm).append(append1);
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

