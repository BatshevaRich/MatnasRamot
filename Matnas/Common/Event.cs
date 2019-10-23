using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Event
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> DateAdded { get; set; }
    }
}
