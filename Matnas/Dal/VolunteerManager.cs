using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class VolunteerManager
    {
        public static void AddVolunteer(Volunteer volunteer)
        {
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Volunteers.Add(v);
                db.SaveChanges();
            }
        }
        public static void RemoveVolunteer(Volunteer volunteer)
        {
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Volunteers.Remove(v);
                db.SaveChanges();
            }
        }
        public static void UpdateVolunteer(Volunteer volunteer)
        {
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Entry<Volunteers>(db.Set<Volunteers>().Find(v.Id)).CurrentValues.SetValues(v);
                db.SaveChanges();
            }
        }

        public static void RemoveVolunteer(int id)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Volunteers.Remove(db.Volunteers.Find(id));
                db.SaveChanges();
            }
        }

        public static IEnumerable<Volunteer> GetVolunteers()
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                List<Volunteer> volunteers = new List<Volunteer>();
                foreach (var v in db.Volunteers.ToList())
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(v));
                }
                return volunteers;
            }
        }
        public static List<string> GetCategoriesForVolunteer(Volunteer volunteer)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                return db.Families.Find(volunteer.Id).Categories.Select(c => c.Name).ToList();
            }
        }
        public static Volunteer GetVolunteer(int id)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                return Mapper.CastVolunteerToComon(db.Volunteers.Find(id));
            }
        }
    }
}
