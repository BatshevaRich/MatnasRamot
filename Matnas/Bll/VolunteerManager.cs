using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Bll
{
    /// <summary>
    /// Manager for volunteers
    /// </summary>
    public static class VolunteerManager
    {
        /// <summary>
        /// Get all volunteers
        /// </summary>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteers()
        {
            return Dal.VolunteerManager.GetVolunteers();
        }

        /// <summary>
        /// Get volunteer by id
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>Volunteer object</returns>
        public static Volunteer GetVolunteer(int id)
        {
            return Dal.VolunteerManager.GetVolunteer(id);
        }
        
        /// <summary>
        /// Add volunteer by volunteer object
        /// </summary>
        /// <param name="volunteer">Volunteer object</param>
        /// <param name="category">list of categories</param>
        /// <returns>Id of added volunteer</returns>
        public static int AddVolunteer(Volunteer volunteer, Category[] category)
        {
            return Dal.VolunteerManager.AddVolunteer(volunteer, category);
        }

        /// <summary>
        /// Update volunteer with new information, including categories
        /// </summary>
        /// <param name="volunteer">Volunteer object</param>
        /// <param name="categories">List of categories</param>
        public static void UpdateVolunteer(Volunteer volunteer, Category[] categories)
        {
            Dal.VolunteerManager.UpdateVolunteer(volunteer, categories);
        }

        /// <summary>
        /// Remove Volunteer from db
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        public static void RemoveVolunteer(int id)
        {
            try
            {
                Dal.VolunteerManager.RemoveVolunteer(id);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        /// <summary>
        /// Get categories of volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>List of categories</returns>
        public static IEnumerable<Category> GetCategories(int id)
        {
            return Dal.VolunteerManager.GetCategoriesOfVolunteer(id);
        }
        
        /// <summary>
        /// Remove category from volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <param name="category">Category object</param>
        public static void RemoveCategory(int id, Category category)
        {
            Dal.VolunteerManager.RemoveCategoryFromVolunteer(id, category);
        }

        /// <summary>
        /// Add category to volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <param name="category">List of categories</param>
        public static void AddCategory(int id, Category[] category)
        {
            Dal.VolunteerManager.AddCategoryToVolunteer(id, category);
        }

        /// <summary>
        /// Get families of volunteer, volunteers by them.
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamilies(int id)
        {
            return Dal.VolunteerManager.GetFamilies(id);
        }

        /// <summary>
        /// Get volunteers by category
        /// </summary>
        /// <param name="idCategory">Id of category</param>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteersByCategory(int idCategory)
        {
            return Dal.VolunteerManager.GetVolunteersByCategory(idCategory);
        }

        /// <summary>
        /// Get volunteers by specific category and family.
        /// </summary>
        /// <param name="idFamily">Id of family</param>
        /// <param name="idCategory">Id of category</param>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteersByCategoryAndFamily(int idFamily, int idCategory)
        {
            return Dal.VolunteerManager.GetVolunteersByCategoryAndFamily(idFamily, idCategory);
        }
        public static IEnumerable<Group> GetGroups(int id)
        {
          return  Dal.VolunteerManager.GetGroups(id);
        }
        public static IEnumerable<Volunteer> GetVolunteersForFamily(int id)
        {
            return Dal.VolunteerManager.GetVolunteersForFamily(id);
        }
        public static IEnumerable<Event> GetEvents(int id)
        {
            return Dal.VolunteerManager.GetEvents(id);
        }

        public static Volunteer GetMostVolunteer()
        {
            return Dal.VolunteerManager.GetMostVolunteer();
        }
    }
}
