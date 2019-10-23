using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
    public static class OrganizationAndFamilyManager
    {
        public static void AddOrganizationAndFamily(OrganizationAndFamily organizationAndFamily)
        {
            Dal.OrganizationAndFamilyManager.AddOrganizationAndFamily(organizationAndFamily);
        }
        public static void UpdateOrganizationAndFamily(OrganizationAndFamily organizationAndFamily)
        {
            Dal.OrganizationAndFamilyManager.UpdateOrganizationAndFamily(organizationAndFamily);
        }

        public static OrganizationAndFamily GetOrganizationAndFamily(int id)
        {
            return Dal.OrganizationAndFamilyManager.GetOrganizationAndFamily(id);
        }

        public static IEnumerable<OrganizationAndFamily> GetOrganizationAndFamilys()
        {
            return Dal.OrganizationAndFamilyManager.GetOrganizationAndFamilies();
        }

        public static void RemoveOrganizationAndFamily(int id)
        {
            Dal.OrganizationAndFamilyManager.RemoveOrganizationAndFamily(id);
        }

    }
}
