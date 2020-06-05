using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
   public class OrganizationManager
    {
        public static void AddOrganization(Common.Organization organization)
        {
            Organization e = Mapper.CastOrganization(organization);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Organization.Add(e);
                db.SaveChanges();
            }
        }
        public static void RemoveOrganization(Common.Organization organization)
        {
            Organization e = Mapper.CastOrganization(organization);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Organization.Remove(e);
                db.SaveChanges();
            }
        }

        public static Common.Organization GetOrganization(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastOrganizationToComon(db.Organization.Find(id));

            }
        }

        public static void UpdateOrganization(Common.Organization organization)
        {
            Organization e = Mapper.CastOrganization(organization);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Entry<Organization>(db.Set<Organization>().Find(e.Id)).CurrentValues.SetValues(e);
                db.SaveChanges();
            }
        }

        public static void RemoveOrganization(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Organization.Remove(db.Organization.Find(id));
                db.SaveChanges();
            }
        }

        public static IEnumerable<Common.Organization> GetOrganizations()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Common.Organization> organizations = new List<Common.Organization>();
                foreach (var e in db.Organization.ToList())
                {
                    organizations.Add(Mapper.CastOrganizationToComon(e));
                }
                return organizations;
            }
        }
        public static void AddCategoryToOrganization(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Organization e = db.Organization.Find(id);
                e.Categories.Add(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        public static void RemoveCategoryFromOrganization(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Organization e = db.Organization.Find(id);
                e.Categories.Remove(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        public static List<Category> GetCategoriesOfOrganization(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                IEnumerable<Categories> c = db.Organization.Find(id).Categories.ToList();
                List<Category> categories = new List<Category>();
                foreach (var category in c)
                {
                    categories.Add(Mapper.CastCategoryToCommon(category));
                }
                return categories;
            }
        }
        public static IEnumerable<Family> GetFamilies(int id)
        {
            List<Family> families = new List<Family>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var f = db.OrganizationAndFamily.Where(g => g.IdOrganization == id).Select(g => g.IdFamily).ToArray();
                foreach (var i in f)
                {
                    families.Add(Mapper.CastFamilyToComon(db.Families.Find(i)));
                }

            }
            return families;
        }
    }
}
