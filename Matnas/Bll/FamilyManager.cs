using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;
using Dal;
namespace Bll
{
    public static class FamilyManager
    {
        /// <summary>
        /// Get all families in db.
        /// </summary>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamilies()
        {
            return Dal.FamilyManager.GetFamilies();
        }

        /// <summary>
        /// Get family by id.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <returns>Family object</returns>
        public static Family GetFamily(int id)
        {
            return Dal.FamilyManager.GetFamily(id);
        }

        /// <summary>
        /// Add family to db.
        /// </summary>
        /// <param name="family">Family object</param>
        /// <param name="categories">List of categories</param>
        /// <returns>Id of added family</returns>
        public static int AddFamily(Family family, Category[] categories)
        {
            return Dal.FamilyManager.AddFamily(family, categories);
        }

        /// <summary>
        /// Update family with new data, including categories.
        /// </summary>
        /// <param name="family">Family object</param>
        /// <param name="categories">List of categories</param>
        public static void UpdateFamily(Family family, Category[] categories)
        {
            Dal.FamilyManager.UpdateFamily(family, categories);
        }

        /// <summary>
        /// Remove family from db.
        /// </summary>
        /// <param name="id">Id of family</param>
        public static void RemoveFamily(int id)
        {
            Dal.FamilyManager.RemoveFamily(id);
        }

        /// <summary>
        /// Remove category from family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <param name="category">Category object</param>
        public static void RemoveCategory(int id, Category category)
        {
            Dal.FamilyManager.RemoveCategoryFromFamily(id, category);
        }

        /// <summary>
        /// Add category to family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <param name="category">Category object</param>
        public static void AddCategory(int id, Category[] category)
        {
            Dal.FamilyManager.AddCategoryToFamily(id, category);
        }
        
        /// <summary>
        /// Get categories of family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <returns>List of categories</returns>
        public static List<Category> GetCategories(int id)
        {
            return Dal.FamilyManager.GetCategoriesOfFamily(id);
        }

        /// <summary>
        /// Get volunteers of family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Dal.FamilyManager.GetVolunteers(id);
        }

        public static IEnumerable<Common.Organization> GetOrganizations(int id)
        {
            return Dal.FamilyManager.GetOrganizations(id);
        }

        /// <summary>
        /// Get families by specific volunteer and category.
        /// </summary>
        /// <param name="idCategory">Id of category</param>
        /// <param name="idVolunteer">Id of volunteer</param>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamiliesByCategoryAndVolunteer(int idCategory, int idVolunteer)
        {
            return Dal.FamilyManager.GetFamiliesByCategoryAndVolunteer(idCategory, idVolunteer);
        }

        /// <summary>
        /// Get families by specific category.
        /// </summary>
        /// <param name="idCategory">Id of category</param>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamiliesByCategory(int idCategory)
        {
            return Dal.FamilyManager.GetFamiliesByCategory(idCategory);
        }
    }
}
