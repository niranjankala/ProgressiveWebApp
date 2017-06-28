using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace demoapp1.Models
{
    public class userprefrences
    {
        public string wallpaper_image { get; set; }
        public string singleclick { get; set; }
        public string show_welcome_screen { get; set; }
        public string show_guided_tour { get; set; }
        public string theme { get; set; }
        public string font_style { get; set; }
        public string font_size { get; set; }
        public string icon_style { get; set; }
        public string icon_size { get; set; }
    }
}