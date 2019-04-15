﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MovieSite.Models
{
    public class Movie
    {
        [Key]
        public string Name { get; set; }
        [Key]
        public DateTime Published { get; set; }
        public string Director { get; set; }
        public string Description { get; set; }



    }
}
