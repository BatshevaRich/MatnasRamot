using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;


namespace Bll
{
    public static class EventManager
    {
        public static void AddEvent(Event eventt)
        {
            Dal.EventManager.AddEvent(eventt);
        }
        public static void RemoveEvent(Event eventt)
        {
            Dal.EventManager.RemoveEvent(eventt);
        }
        public static void UpdateEvent(Event eventt)
        {
            Dal.EventManager.UpdateEvent(eventt);
        }
        public static IEnumerable<Event> GetEvents()
        {
            return Dal.EventManager.GetEvents();
        }
    }
}
