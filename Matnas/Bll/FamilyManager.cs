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
        public static void AddFamily(Family family)
        {
            Dal.FamilyManager.AddFamily(family);
        }
        public static void RemoveFamily(Family family)
        {
            Dal.FamilyManager.RemoveFamily(family);
        }
        public static void UpdateFamily(Family family)
        {
            Dal.FamilyManager.UpdateFamily(family);
        }
        public static IEnumerable<Family> GetFamilies()
        {
            return Dal.FamilyManager.GetFamilies();
        }
        public static List<string> GetCategoriesForFamily(Family family)
        {
            return Dal.FamilyManager.GetCategoriesForFamily(family);
        }
        public static Family GetFamily(int id)
        {
            return Dal.FamilyManager.GetFamily(id);
        }

        public static void RemoveFamily(int id)
        {
            Dal.FamilyManager.RemoveFamily(id);
        }
    }
}
