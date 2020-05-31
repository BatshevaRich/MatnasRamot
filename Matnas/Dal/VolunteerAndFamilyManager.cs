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
            {//////////////////////////////////////////////////////////////
                return Mapper.CastVolunteerAndFamilyToComon(db.VolunteerAndFamily.Find(id));

            }
        }
        public static IEnumerable<Common.Family> GetVolunteerAndFamilyForVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {//////////////////////////////////////////////////////////////
                var query = from vf in db.VolunteerAndFamily
                            where vf.Volunteers.Id == id
                            select vf;
                List<Common.Family> families = new List<Common.Family>();
                foreach (var item in query.AsEnumerable())
                {
                    families.Add(Mapper.CastVolunteerAndFamilyToComon(item).Family);
                }
                return families;
                //return Mapper.CastVolunteerAndFamilyToComon(query.First()).Family;

            }
        }

        public static IEnumerable<Common.Volunteer> GetVolunteerAndFamilyForFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {//////////////////////////////////////////////////////////////
                var query = from vf in db.VolunteerAndFamily
                            where vf.Families.Id == id
                            select vf;
                List<Common.Volunteer> volunteers = new List<Common.Volunteer>();
                foreach (var item in query.AsEnumerable())
                {
                    volunteers.Add(Mapper.CastVolunteerAndFamilyToComon(item).Volunteer);
                }
                return volunteers;
                //return Mapper.CastVolunteerAndFamilyToComon(query.First()).Family;

            }
        }
    }
}
