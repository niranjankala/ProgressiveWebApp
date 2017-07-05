


var app = [

btnlogin = document.getElementById('btnlogin')

]


/////////////////////  Adding event to button for login process/////////////////////////


document.getElementById('btnlogin').addEventListener('click', function () {


    if ($('#txtname').val().trim() == "") {
        alert('Enter Name');
        $('#txtname').focus();

        return false;
    }
    else if ($('#txtpwd').val().trim() == "") {
        alert('Enter Password');
        $('#txtpwd').focus();

        return false;
    }
    else {
        $(".loader").fadeIn();
       
        if ($('#txtcode').val().trim() == "") {
            generatedtokennonad();
        }
        else {


            // GETTING API for AD USER
            $.ajax({
                url: 'https://betanodeapi.classlink.com/auth/userdn',
                type: 'GET',
                dataType: 'json',
                headers: {
                    'apikey': 'xxx-xxx-xxx'
                },
                contentType: 'application/json; charset=utf-8',
                data: {
                    //Passing data
                    code: '' + $("#txtcode").val() + '',
                    username: '' + $("#txtname").val() + ''
                },

                success: function (result) {
                    autherizeUser(result.UserDomainList[0].DN);
                    console.log(result);
                

                },
                error: function (error) {
                    alert('error'); return false;
                    console.log('error', error);
                    $(".loader").fadeOut("slow");
                }
            });
        }
    }


});


//////////////////////////// Autherizing User for login process/////////////////////////

function autherizeUser(DN) {

    $.ajax({

        url: 'https://betanodeapi.classlink.com/auth',
        type: 'POST',
        dataType: 'json',
        headers: {
            'apikey': 'xxx-xxx-xxx'
        },
        contentType: 'application/x-www-form-urlencoded',
        data: { //Passing data

            username: '' + $("#txtname").val() + '',
            password: '' + $("#txtpwd").val() + '',
            code: '' + $("#txtcode").val() + '',
            userdn: DN
        },

        success: function (result) {

            generatedtoken(result.AuthUserBasicDetail.GWSToken);
            console.log(result);
           

        },
        failure: function (response) {
            alert('failure');
            $(".loader").fadeOut("slow");
        },
        error: function (error) {

            alert('error');
            return false;
            console.log('error', error);
            $(".loader").fadeOut("slow");

        }
    });
}


///////////////////////////////// Genrating Tokken for login process////////////////////

function generatedtoken(gwstoken) {
 
    $.ajax({

        url: 'https://betanodeapi.classlink.com/auth/configurationdata',
        type: 'GET',
        dataType: 'json',
        headers: {
            'gwstoken': gwstoken
        },
        contentType: 'application/json; charset=utf-8',


        success: function (result) {
           
            jump(result, gwstoken);

        },
        failure: function (response) {
            console.log(result);
            $(".loader").fadeOut("slow");


            alert('error'); return false;
        },
        error: function (error) {

            alert('error'); return false;
            $(".loader").fadeOut("slow");

        }
    });
}


///////////////////////////////////for nonAD user///////////////////////////////////////

function autherizeUsernonad() {

    $.ajax({

        url: 'https://betanodeapi.classlink.com/auth',
        type: 'POST',
        dataType: 'json',
        headers: {
            'apikey': 'xxx-xxx-xxx'
        },
        contentType: 'application/x-www-form-urlencoded',
        data: { //Passing data

            username: '' + $("#txtname").val() + '',
            password: '' + $("#txtpwd").val() + '',
        },

        success: function (result) {

            generatedtoken(result.AuthUserBasicDetail.GWSToken);
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

/////////////////// Genrating Tokken for login process ////////////////////////////////

function generatedtokennonad(gwstoken) {

    $.ajax({

        url: 'https://betanodeapi.classlink.com/auth/configurationdata',
        type: 'GET',
        dataType: 'json',
        headers: {
            'gwstoken': gwstoken
        },
        contentType: 'application/json; charset=utf-8',


        success: function (result) {

            jump(result, gwstoken);

        },
        failure: function (response) {
            console.log(result);


            alert('error'); return false;
        },
        error: function (error) {

            alert('error'); return false;

        }
    });
}


$(".loader").fadeOut("slow");


function jump(result, tokken) {

    debugger;
    var dd = JSON.stringify(result);
    document.getElementById("hdn1").value = dd;
    document.getElementById("hdn2").value = tokken;
    document.getElementById("signupform").submit()

}


////////////////This is the "Offline copy of pages" service worker///////////////////////

//Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
if (navigator.serviceWorker.controller) {
    console.log('[PWA Builder] active service worker found, no need to register')
} else {
    //Register the ServiceWorker
    navigator.serviceWorker.register('../pwabuilder-sw.js').then(function (reg) {
        console.log('Service worker has been registered for scope:' + reg.scope);
    });
}