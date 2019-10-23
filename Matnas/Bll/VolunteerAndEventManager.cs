using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
    public static class VolunteerAndEventManager
    {
        public static void AddVolunteerAndEvent(VolunteerAndEvent volunteerAndEvent)
        {
            Dal.VolunteerAndEventManager.AddVolunteerAndEvent(volunteerAndEvent);
        }
        public static void UpdateVolunteerAndEvent(VolunteerAndEvent volunteerAndEvent)
        {
            Dal.VolunteerAndEventManager.UpdateVolunteerAndEvent(volunteerAndEvent);
        }

        public static VolunteerAndEvent GetVolunteerAndEvent(int id)
        {
            return Dal.VolunteerAndEventManager.GetVolunteerAndEvent(id);
        }

        public static IEnumerable<VolunteerAndEvent> GetVolunteerAndEvents()
        {
            return Dal.VolunteerAndEventManager.GetVolunteerAndEvents();
        }

        public static void RemoveVolunteerAndEvent(int id)
        {
            Dal.VolunteerAndEventManager.RemoveVolunteerAndEvent(id);
        }
    }
}
