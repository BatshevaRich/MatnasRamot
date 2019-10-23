using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class VolunteerAndFamily
    {
        public int Id { get; set; }
        public int IdFamily { get; set; }
        public int IdVolunteer { get; set; }
        public Nullable<int> IdCategory { get; set; }
        public string Comments { get; set; }
        public Nullable<System.DateTime> DateAdded { get; set; }

    }
}
