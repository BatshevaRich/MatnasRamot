using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
   public static class VolunteerAndFamilyManager
    {
        public static void AddVolunteerAndFamily(VolunteerAndFamily volunteerAndFamily)
        {
            Dal.VolunteerAndFamilyManager.AddVolunteerAndFamily(volunteerAndFamily);
        }
        public static void UpdateVolunteerAndFamily(VolunteerAndFamily volunteerAndFamily)
        {
            Dal.VolunteerAndFamilyManager.UpdateVolunteerAndFamily(volunteerAndFamily);
        }

        public static IEnumerable<VolunteerAndFamily> GetVolunteerAndFamilyForVolunteer(int id)
        {
            return Dal.VolunteerAndFamilyManager.GetVolunteerAndFamilyForVolunteer(id);
        }
        public static IEnumerable<VolunteerAndFamily> GetVolunteerAndFamilyForFamily(int id)
        {
            return Dal.VolunteerAndFamilyManager.GetVolunteerAndFamilyForFamily(id);
        }
        public static VolunteerAndFamily GetVolunteerAndFamily(int id)
        {
            return Dal.VolunteerAndFamilyManager.GetVolunteerAndFamily(id);
        }

        public static IEnumerable<VolunteerAndFamily> GetVolunteerAndFamilys()
        {
            return Dal.VolunteerAndFamilyManager.GetVolunteerAndFamilies();
        }

        public static void RemoveVolunteerAndFamily(int id)
        {
            Dal.VolunteerAndFamilyManager.RemoveVolunteerAndFamily(id);
        }

    }
}
