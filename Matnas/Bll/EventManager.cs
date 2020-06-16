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
        public static int AddEvent(Event eventt, Category[] categories)
        {
            return Dal.EventManager.AddEvent(eventt, categories);
        }
        public static void RemoveEvent(Event eventt)
        {
            Dal.EventManager.RemoveEvent(eventt);
        }
        public static void UpdateEvent(Event eventt, Category[] categories)
        {
            Dal.EventManager.UpdateEvent(eventt, categories);
        }

        public static Event GetEvent(int id)
        {
            return Dal.EventManager.GetEvent(id);
        }

        public static IEnumerable<Event> GetEvents()
        {
            return Dal.EventManager.GetEvents();
        }

        public static void RemoveEvent(int id)
        {
            Dal.EventManager.RemoveEvent(id);
        }

        public static void RemoveCategory(int id, Category category)
        {
            Dal.EventManager.RemoveCategoryFromEvent(id, category);
        }

        public static void AddCategory(int id, Category category)
        {
            Dal.EventManager.AddCategoryToEvent(id, category);
        }
        public static List<Category> GetCategories(int id)
        {
            return Dal.EventManager.GetCategoriesOfEvent(id);
        }
        public static IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Dal.EventManager.GetVolunteers(id);
        }

    }
}

