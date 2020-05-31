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
        public static int AddVolunteer(Volunteer volunteer, Category[] category)
        {
            return Dal.VolunteerManager.AddVolunteer(volunteer, category);
        }
        public static void RemoveVolunteer(Volunteer volunteer)
        {
            Dal.VolunteerManager.RemoveVolunteer(volunteer);
        }
        public static void UpdateVolunteer(Volunteer volunteer, Category[] categories)
        {
            Dal.VolunteerManager.UpdateVolunteer(volunteer, categories);
        }
        public static IEnumerable<Volunteer> GetVolunteers()
        {
            return Dal.VolunteerManager.GetVolunteers();
        }
        
        public static Volunteer GetVolunteer(int id)
        {
            return Dal.VolunteerManager.GetVolunteer(id);
        }

        public static void RemoveVolunteer(int id)
        {
            Dal.VolunteerManager.RemoveVolunteer(id);
        }

        public static IEnumerable<Category> GetCategories(int id)
        {
            return Dal.VolunteerManager.GetCategoriesOfVolunteer(id);
        }
        public static void RemoveCategory(int id, Category category)
        {
            Dal.VolunteerManager.RemoveCategotyFromVolunteer(id, category);
        }

        public static void AddCategory(int id, Category[] category)
        {
            Dal.VolunteerManager.AddCategotyToVolunteer(id, category);
        }
        public static IEnumerable<Group> GetGroups(int id)
        {
          return  Dal.VolunteerManager.GetGroups(id);
        }
        public static IEnumerable<Family> GetFamilies(int id)
        {
            return Dal.VolunteerManager.GetFamilies(id);
        }
        public static IEnumerable<Event> GetEvents(int id)
        {
            return Dal.VolunteerManager.GetEvents(id);
        }

        public static IEnumerable<Volunteer> GetVolunteersByCategoryAndFamily(int idFamily, Category category)
        {
            return Dal.VolunteerManager.GetVolunteersByCategoryAndFamily(idFamily, category);
        }
    }
}
