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
        public static void AddEvent(Event eventt)
        {
            Events e = Mapper.CastEvent(eventt);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Events.Add(e);
                db.SaveChanges();
            }
        }
        public static void RemoveEvent(Event eventt)
        {
            Events e = Mapper.CastEvent(eventt);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Events.Remove(e);
                db.SaveChanges();
            }
        }
        public static void UpdateEvent(Event eventt)
        {
            Events e = Mapper.CastEvent(eventt);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Entry<Events>(db.Set<Events>().Find(e.Id)).CurrentValues.SetValues(e);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Event> GetEvents()
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                List<Event> events = new List<Event>();
                foreach (var e in db.Events.ToList())
                {
                    events.Add(Mapper.CastEventToComon(e));
                }
                return events;
            }
        }
    }
}
