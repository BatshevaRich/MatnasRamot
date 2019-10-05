using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Match
    {
        public int Id { get; set; }
        public int IdFamilyOrIdEvent { get; set; }
        public int IdVolunteerOrGroup { get; set; }
        public Nullable<int> IdCategory { get; set; }
        public string Comments { get; set; }
        public System.DateTime DateAdded { get; set; }

        public virtual Category Category { get; set; }
    }
}
