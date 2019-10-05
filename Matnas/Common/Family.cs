using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class Family
    {
        public int Id { get; set; }
        public string FirstNameFather { get; set; }
        public string FirstNameMother { get; set; }
        public string LastName { get; set; }
        public string Telephone { get; set; }
        public string PelephoneFather { get; set; }
        public string PelephoneMother { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
        public int NumChildren { get; set; }
        public string Reference { get; set; }
        public string Reason { get; set; }
    }
}
