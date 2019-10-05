using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
   public  class Volunteer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
        public string Pelephone { get; set; }
        public string Email { get; set; }
        public System.DateTime? Age { get; set; }
        public string Comments { get; set; }
        public bool? IsActive { get; set; }

    }
}
