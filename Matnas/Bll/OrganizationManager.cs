using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
   public class OrganizationManager
    {
        public static int AddOrganization(Organization organization, Category[] categories)
        {
            return Dal.OrganizationManager.AddOrganization(organization, categories);
        }
        public static void RemoveOrganization(Organization organization)
        {
            Dal.OrganizationManager.RemoveOrganization(organization);
        }
        public static int UpdateOrganization(Organization organization, Category[] categories)
        {
            return Dal.OrganizationManager.UpdateOrganization(organization, categories);
        }

        public static Organization GetOrganization(int id)
        {
            return Dal.OrganizationManager.GetOrganization(id);
        }

        public static IEnumerable<Organization> GetOrganizations()
        {
            return Dal.OrganizationManager.GetOrganizations();
        }

        public static void RemoveOrganization(int id)
        {
            Dal.OrganizationManager.RemoveOrganization(id);
        }

        public static void RemoveCategory(int id, Category category)
        {
            Dal.OrganizationManager.RemoveCategoryFromOrganization(id, category);
        }

        public static void AddCategory(int id, Category category)
        {
            Dal.OrganizationManager.AddCategoryToOrganization(id, category);
        }
        public static List<Category> GetCategories(int id)
        {
            return Dal.OrganizationManager.GetCategoriesOfOrganization(id);
        }
        public static IEnumerable<Family> GetFamilies(int id)
        {
            return Dal.OrganizationManager.GetFamilies(id);
        }
    }
}
