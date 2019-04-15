using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query.Expressions;

namespace MovieSite.Models
{
    public class Users
    {
        [Key]
        [MinLength(5, ErrorMessage ="Username should be at least 5 character")]
        public string Username { get; set; }

        [DataType(DataType.Password)]
        protected string Password;
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }
        public bool IsAdmin { get; set; }

        public void PasswordUpdate(string newPassword)
        {
            this.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
        }
        public bool ComparePassword(string passwordToCompare)
        {
            return BCrypt.Net.BCrypt.Verify(passwordToCompare,Password);
        }


    }
}
