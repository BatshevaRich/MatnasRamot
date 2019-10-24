﻿using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
   public class OrganizationManager
    {
        public static void AddOrganization(Organization organization)
        {
            Dal.OrganizationManager.AddOrganization(organization);
        }
        public static void RemoveOrganization(Organization organization)
        {
            Dal.OrganizationManager.RemoveOrganization(organization);
        }
        public static void UpdateOrganization(Organization organization)
        {
            Dal.OrganizationManager.UpdateOrganization(organization);
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
            Dal.OrganizationManager.RemoveCategotyFromOrganization(id, category);
        }

        public static void AddCategory(int id, Category category)
        {
            Dal.OrganizationManager.AddCategotyToOrganization(id, category);
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