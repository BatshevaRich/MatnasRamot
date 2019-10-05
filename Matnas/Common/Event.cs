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
        public string description { get; set; }
        public Nullable<System.DateTime> dateAdded { get; set; }
    }
}
