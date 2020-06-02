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
        public static int AddFamily(Family family, Category[] categories)
        {
            return Dal.FamilyManager.AddFamily(family, categories);
        }
        public static void RemoveFamily(Family family)
        {
            Dal.FamilyManager.RemoveFamily(family);
        }
        public static void UpdateFamily(Family family, Category[] categories)
        {
            Dal.FamilyManager.UpdateFamily(family, categories);
        }
        public static IEnumerable<Family> GetFamilies()
        {
            return Dal.FamilyManager.GetFamilies();
        }
        public static void RemoveCategory(int id, Category category)
        {
            Dal.FamilyManager.RemoveCategotyFromFamily(id, category);
        }

        public static void AddCategory(int id, Category category)
        {
            Dal.FamilyManager.AddCategotyToFamily(id, category);
        }
        public static List<Category> GetCategories(int id)
        {
            return Dal.FamilyManager.GetCategoriesOfFamily(id);
        }

        public static Family GetFamily(int id)
        {
            return Dal.FamilyManager.GetFamily(id);
        }

        public static void RemoveFamily(int id)
        {
            Dal.FamilyManager.RemoveFamily(id);
        }

        public static void AddCategoriesForFamily(Family family, IEnumerable<Category> categories)
        {
            Dal.FamilyManager.AddCategoriesToFamily(family, categories);
        }//??????

        public static void AddCategoriesForFamily(IEnumerable<Category> categories)
        {
            Dal.FamilyManager.AddCategoriesToFamily(categories);
        }////?????
        public static IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Dal.FamilyManager.GetVolunteers(id);
        }
        public static IEnumerable<Common.Organization> GetOrganizations(int id)
        {
            return Dal.FamilyManager.GetOrganizations(id);
        }

        public static IEnumerable<Family> GetFamiliesByCategoryAndVolunteer(int idCategory, int idVolunteer)
        {
            return Dal.FamilyManager.GetFamiliesByCategoryAndVolunteer(idCategory, idVolunteer);
        }
    }
}
