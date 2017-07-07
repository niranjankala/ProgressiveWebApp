function jump() {
   
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
               
                id = result.response[i].id;
             
                var append = '<a href="#parent" id="parent" onclick="childfolders(' + result.response[i].id + ')"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center google-drive"><div class="box-body"><h2 class="no-margin">' + result.response[i].filesfolder_name + '</h2><span class="icon-scope"><i><img style="max-width: 55px" src="../images/icon/folder.png" /></i> </span></div></div></div></a>';
                $('#sidemenu').append(append);

            }
            $('#backdiv').empty();
            var append = '<a href="#" style="margin:1%;" id="parent" onclick="parentclick()" >Back </a>';
            $('#backdiv').append(append);


        },
        failure: function (response) {
            alert('failure');
        },
        error: function (error) {

            alert('error');
          
            console.log('error', error);

        }
    });


};

function addElementToLi(result) {
    console.log(result);
    var prop;
    
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
    //
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
            
            var id;
            var append1 = "";
            $('#sidemenu').empty();
         
            for (var i = 0; i < result.response.length; i++) {
                id = result.response[i].id;
                result.response[i].filesfolder_name
                var mm = "#sidemenu";
                result.response[i].filesfolder_name;
                var foldername = result.response[i].filesfolder_name
                if (result.response[i].filesfolder_name.length > 18) {
                    foldername = foldername.substring(0, 15) + "...";
                }
     


                if (result.response[i].type == '0') {
                    var append = '<a href="#' + result.response[i].id + '" id="' + result.response[i].id + '" onclick="childfolders(' + result.response[i].id + ')" ><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center google-drive"><div class="box-body"><h2 class="no-margin">' + foldername + '</h2><span class="icon-scope"><i><img style="max-width: 55px" src="../images/icon/folder.png" /></i> </span></div></div></div></a>';
                    $('#sidemenu').append(append);
                }
                if (result.response[i].type == '1')
                {
                    var append = '<a href="#' + result.response[i].id + '" id="' + result.response[i].id + '" onclick="childfolders(' + result.response[i].id + ')" ><div class="col-lg-3 col-md-3 col-sm-6 col-xs-6"><div class="box box-default text-center google-drive" style="background-color: #afb5bd;"><div class="box-body"><h2 class="no-margin">' + foldername + '</h2><span class="icon-scope"><i><img style="max-width: 55px" src="../images/icon/exeicon.png" /></i> </span></div></div></div></a>';
                    $('#sidemenu').append(append);
                }

            }
         
            if (result.meta.name == "My Classes" || result.meta.name == "My Documents" || result.meta.name == "My Shared") {
                $('#backdiv').empty();
                var append = ' <a href="#' + result1 + '" style="margin:1%;" onclick="jump()" >Back </a>';
                $('#backdiv').append(append);
            }
            else {
                $('#backdiv').empty();
                var len = result.meta.ancestors.length - 1;
                var name = result.meta.ancestors[len].id;
                var append = ' <a href="#' + result1 + '" style="margin:1%;" onclick="childfolders(' + name + ')" >Back </a>';
                $('#backdiv').append(append);
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

