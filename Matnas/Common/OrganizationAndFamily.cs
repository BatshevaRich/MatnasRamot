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
        public int IdFamily { get; set; }
        public int IdOrganization { get; set; }
        public Nullable<int> IdCategory { get; set; }
        public string Comments { get; set; }
        public Nullable<System.DateTime> DateAdded { get; set; }
    }
}
