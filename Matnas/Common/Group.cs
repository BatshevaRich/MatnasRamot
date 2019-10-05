using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
   public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Comments { get; set; }
        public string email { get; set; }

        public override string ToString()
        {
            return Name+" "+ Phone;
        }
    }

}
