using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Classlink.web.Models
{
    public class configdata
    {

        public ClientConfigDataLists ClientConfigDataList { get; set; }
        public string ResultCode { get; set; }
        public string ResultDescription { get; set; }

        public string[] ssosignouturls { get; set; }
        public userprefrences userprefrence { get; set; }

    }
}