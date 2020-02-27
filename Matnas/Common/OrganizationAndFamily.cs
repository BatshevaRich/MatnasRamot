using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class OrganizationAndFamily
    {
        public int Id { get; set; }
        public Family Family { get; set; }
        public Organization Organization { get; set; }
        public Category Category { get; set; }
        public string Comments { get; set; }
        public Nullable<System.DateTime> DateAdded { get; set; }
    }
}
