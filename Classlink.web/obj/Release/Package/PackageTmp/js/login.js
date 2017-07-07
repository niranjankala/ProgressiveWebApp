


var app = [

btnlogin = document.getElementById('btnlogin')

]


/////////////////////  Adding event to button for login process/////////////////////////


document.getElementById('btnlogin').addEventListener('click', function () {

    try
    {
        if ($('#txtname').val().trim() == "") {
        
            $('#txtname').focus();

            return false;
        }
        else if ($('#txtpwd').val().trim() == "") {
        
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
                    
                        console.log('error1', error);
                        $(".loader").fadeOut("slow");
                    }
                });
            }
        }

    }
    catch(exception)
    {
        console.log('error1', error);
        console.log(exception);
    }
});


//////////////////////////// Autherizing User for login process/////////////////////////

function autherizeUser(DN) {
    try{
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
                localStorage.demo = result.AuthUserBasicDetail.GWSToken;
                console.log(result);


            },
            failure: function (response) {
                console.log('failure2', response);
                $(".loader").fadeOut("slow");
            },
            error: function (error) {

                console.log('error2', error);
              
                $(".loader").fadeOut("slow");

            }
        });
    }
    catch(exception)
    {
        console.log('error2', error);
        console.log(exception);
    }
}


///////////////////////////////// Genrating Tokken for login process////////////////////

function generatedtoken(gwstoken) {
    try{  
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
                //console.log(result);
                console.log('failure3', response);
                $(".loader").fadeOut("slow");


           
            },
            error: function (error) {

                console.log('error3', error);
                $(".loader").fadeOut("slow");

            }
        });
    }
    catch(ex)
    {
        console.log(ex);
    }
}


///////////////////////////////////for nonAD user///////////////////////////////////////

function autherizeUsernonad() {
    try{
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
                console.log('failnonad1',response);
                $(".loader").fadeOut("slow");
            },
            error: function (error) {


                $(".loader").fadeOut("slow");
                console.log('errornonad1', error);

            }
        });
    }
    catch(ex){
        console.log(ex);
    }
}

/////////////////// Genrating Tokken for login process ////////////////////////////////

function generatedtokennonad(gwstoken) {
    try{
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
                console.log('failure', response);
                $(".loader").fadeOut("slow");

            },
            error: function (error) {

                console.log('errornonad2', error);
                $(".loader").fadeOut("slow");

            }
        });
    }
    catch(ex){
        console.log(ex);
    }
}


$(".loader").fadeOut("slow");


function jump(result, tokken) {
   
    
    var dd = JSON.stringify(result);
    document.getElementById("hdn1").value = dd;
    document.getElementById("hdn2").value = tokken;
    document.getElementById("signupform").submit()

}


////////////////This is the "Offline copy of pages" service worker///////////////////////

//Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
//debugger;
//if (navigator.serviceWorker.controller) {
//    console.log('[PWA Builder] active service worker found, no need to register')
//} else {
//    Register the ServiceWorker
//    navigator.serviceWorker.register('../pwabuilder-sw.js').then(function (reg) {
//        console.log('Service worker has been registered for scope:' + reg.scope);
//    });
//}


$('#txtpwd').on('textchanged', function () {
    $("#txtpwd").parent().remove("<div class='validation' style='color:red;margin-bottom: 20px;'>Please enter email address</div>");

});



