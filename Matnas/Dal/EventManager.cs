using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class EventManager
    {
        public static int AddEvent(Event eventt, Category[] categories)
        {
            int x = 0;
            Events v = Mapper.CastEvent(eventt);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                foreach (var item in categories)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    //var c =cc.FirstOrDefault(ca => ca.Id == item.Id);
                    v.Categories.Add(c);
                }
                db.Events.Add(v);
                db.SaveChanges();
                x = db.Events.Local[0].Id;
            }
            return x;
        }
        public static void RemoveEvent(Event eventt)
        {
            Events e = Mapper.CastEvent(eventt);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Events.Remove(e);
                db.SaveChanges();
            }
        }

        public static Event GetEvent(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
               return Mapper.CastEventToComon( db.Events.Find(id));
                
            }
        }

        public static void UpdateEvent(Event eventt, Category[] categories)
        {
            Events e = Mapper.CastEvent(eventt);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Events.Find(eventt.Id).Categories.Clear();
                foreach (var item in categories)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    db.Events.Find(eventt.Id).Categories.Add(c);
                }
                db.Entry<Events>(db.Set<Events>().Find(e.Id)).CurrentValues.SetValues(e);
                db.SaveChanges();
            }
        }

        public static void RemoveEvent(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Events.Remove(db.Events.Find(id));
                db.SaveChanges();
            }
        }

        public static IEnumerable<Event> GetEvents()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Event> events = new List<Event>();
                foreach (var e in db.Events.ToList())
                {
                    events.Add(Mapper.CastEventToComon(e));
                }
                return events;
            }
        }
        public static void AddCategoryToEvent(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Events e = db.Events.Find(id);
                e.Categories.Add(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        public static void RemoveCategoryFromEvent(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Events e = db.Events.Find(id);
                e.Categories.Remove(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        public static List<Category> GetCategoriesOfEvent(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                IEnumerable<Categories> c = db.Events.Find(id).Categories.ToList();
                List<Category> categories = new List<Category>();
                foreach (var category in c)
                {
                    categories.Add(Mapper.CastCategoryToCommon(category));
                }
                return categories;
            }
        }
        public static IEnumerable<Volunteer> GetVolunteers(int id)
        {
            List<Volunteer> volunteers = new List<Volunteer>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var f = db.VolunteerAndEvent.Where(g => g.IdEvent == id).Select(g => g.IdVolunteer).ToArray();
                foreach (var i in f)
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(db.Volunteers.Find(i)));
                }

            }
            return volunteers;
        }
    }
}
