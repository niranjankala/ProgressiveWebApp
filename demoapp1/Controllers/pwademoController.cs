using Microsoft.Owin.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Classlink.Dashboard.Web.Models;
using System.Web.Script.Serialization;

namespace Classlink.Dashboard.Web.Controllers
{
    [RequireHttps]
    public class pwademoController : Controller
    {
        // GET: Home
        Login pwalog = new Login();

        public pwademoController()
        {

        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult Index(string returnUrl)
        {
            if (Session["Data"] != null)
            {
                return Redirect("~/pwademo/Home");
            }
            else
            {
                ViewBag.ReturnUrl = returnUrl;
              
            }
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Index()
        {
            try
            {
                string ss2 = Request.Form["hdn1"];
                configdata condata = JsonConvert.DeserializeObject<configdata>(ss2);
                Session["gwstokken"]= Request.Form["hdn2"];
                Session["back"] = condata.ClientConfigDataList.GroupWallpaper;
                Session["profile"] = condata.ClientConfigDataList.UserImagePath;
                Session["data"] = condata;
                return Redirect("~/pwademo/Home");
            }
            catch (Exception ex)
            {

            }
            return View();
            
        }


        public ActionResult Home(object ss)
        {

            configdata conda = new configdata();
            if (Session["Data"] == null)
            {
                return Redirect("~/pwademo/Index");
            }
            try
            {
                conda = Session["data"] as configdata;
            }
            catch (Exception ex)
            {
                return Redirect("~/pwademo/Index");
            }

            return View(conda);
        }


        public ActionResult Logout(int Length)
        {
            if (Length == 4)
            {
                try
                {

                    Session.Clear();
                    Session.Abandon();

                }
                catch (Exception ex)
                {
                    return Redirect("~/pwademo/Index");
                }

                return Redirect("~/pwademo/Index");
            }
            return Redirect("~/Error.html");
        }



        public ActionResult MyFiles()
        {
            configdata condata = new configdata();
            condata = Session["data"] as configdata;
            string dfdf = Session["gwstokken"].ToString();
            ViewBag.data = condata.ClientConfigDataList.TWSToken;
            ViewBag.services = @"{'status': 1,
            'services': {'googledrive': 1,'skydrive': 1,'dropbox': 1,'office365': 1,'my_classes': 1,'my_documents': 1,'my_shared': 1},  'fromCache': 1}";
            return View();
        }


        public ActionResult TESTFILE()
        {
            if (Session["Data"] == null)
            {
                return Redirect("~/pwademo/Index");
            }
            else
            {
                return View();
            }
        }

    }
}