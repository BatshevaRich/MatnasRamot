using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
   public static class VolunteerAndEventManager
    {
        public static void AddVolunteerAndEvent(Common.VolunteerAndEvent vae)
        {
            VolunteerAndEvent g = Mapper.CastVolunteerAndEvent(vae);
            using (dbRamotEntities db = new dbRamotEntities())
            { //if (db.VolunteerAndEvent.Contains(g)) 
                db.VolunteerAndEvent.Add(g);
                db.SaveChanges();
            }
        }
        public static void RemoveVolunteerAndEvent(int id)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.VolunteerAndEvent.Remove(db.VolunteerAndEvent.Find(id));
                db.SaveChanges();
            }
        }
        public static void UpdateVolunteerAndEvent(Common.VolunteerAndEvent vae)
        {
            VolunteerAndEvent g = Mapper.CastVolunteerAndEvent(vae);
            using (dbRamotEntities db = new dbRamotEntities())
            {

                db.Entry<VolunteerAndEvent>(db.Set<VolunteerAndEvent>().Find(g.Id)).CurrentValues.SetValues(g);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Common.VolunteerAndEvent> GetVolunteerAndEvents()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Common.VolunteerAndEvent> vaes = new List<Common.VolunteerAndEvent>();
                foreach (var g in db.VolunteerAndEvent.ToList())
                {
                    vaes.Add(Mapper.CastVolunteerAndEventToComon(g));
                }
                return vaes;
            }
        }
        public static Common.VolunteerAndEvent GetVolunteerAndEvent(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastVolunteerAndEventToComon(db.VolunteerAndEvent.Find(id));

            }
        }
    }
}
