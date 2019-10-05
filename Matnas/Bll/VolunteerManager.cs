using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Bll
{
    public static class VolunteerManager
    {
        public static void AddVolunteer(Volunteer volunteer)
        {
            Dal.VolunteerManager.AddVolunteer(volunteer);
        }
        public static void RemoveVolunteer(Volunteer volunteer)
        {
            Dal.VolunteerManager.RemoveVolunteer(volunteer);
        }
        public static void UpdateVolunteer(Volunteer volunteer)
        {
            Dal.VolunteerManager.UpdateVolunteer(volunteer);
        }
        public static IEnumerable<Volunteer> GetVolunteers()
        {
            return Dal.VolunteerManager.GetVolunteers();
        }
        public static List<string> GetCategoriesForVolunteer(Volunteer volunteer)
        {
            return Dal.VolunteerManager.GetCategoriesForVolunteer(volunteer);
        }
        public static Volunteer GetVolunteer(int id)
        {
            return Dal.VolunteerManager.GetVolunteer(id);
        }

        public static void RemoveVolunteer(int id)
        {
            Dal.VolunteerManager.RemoveVolunteer(id);
        }
    }
}
