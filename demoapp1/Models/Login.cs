using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace demoapp1.Models
{
    public class Login
    {
        [Required/*,MinLength(5)*/]
        public string Name { get; set; }

        [Required/*,MinLength(7)*/]
        public string Password { get; set; }

       
        public string Code { get; set; }

    }
}