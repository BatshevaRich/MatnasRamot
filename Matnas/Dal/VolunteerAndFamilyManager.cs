using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public static class VolunteerAndFamilyManager
    {
        public static void AddVolunteerAndFamily(Common.VolunteerAndFamily vaf)
        {
            VolunteerAndFamily g = Mapper.CastVolunteerAndFamily(vaf);
            using (dbRamotEntities db = new dbRamotEntities())
            { //if (db.VolunteerAndFamily.Contains(g)) 
                db.VolunteerAndFamily.Add(g);
                db.SaveChanges();
            }
        }
        public static void RemoveVolunteerAndFamily(int id)
        {
          
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.VolunteerAndFamily.Remove(db.VolunteerAndFamily.Find(id));
                db.SaveChanges();
            }
        }
        public static void UpdateVolunteerAndFamily(Common.VolunteerAndFamily vaf)
        {
            VolunteerAndFamily g = Mapper.CastVolunteerAndFamily(vaf);
            using (dbRamotEntities db = new dbRamotEntities())
            {

                db.Entry<VolunteerAndFamily>(db.Set<VolunteerAndFamily>().Find(g.Id)).CurrentValues.SetValues(g);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Common.VolunteerAndFamily> GetVolunteerAndFamilies()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Common.VolunteerAndFamily> vafs = new List<Common.VolunteerAndFamily>();
                foreach (var g in db.VolunteerAndFamily.ToList())
                {
                    vafs.Add(Mapper.CastVolunteerAndFamilyToComon(g));
                }
                return vafs;
            }
        }
        public static Common.VolunteerAndFamily GetVolunteerAndFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastVolunteerAndFamilyToComon(db.VolunteerAndFamily.Find(id));

            }
        }
    }
}
