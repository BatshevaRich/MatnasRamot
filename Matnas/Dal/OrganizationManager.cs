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
        public static int AddOrganization(Common.Organization organization, Category[] categories)
        {
            int x = 0;
            Organization e = Mapper.CastOrganization(organization);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                foreach (var item in categories)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    e.Categories.Add(c);
                }
                db.Organization.Add(e);
                db.SaveChanges();
                x = db.Organization.Local[0].Id;
            }
            return x;
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

        public static int UpdateOrganization(Common.Organization organization, Category[] categories)
        {
            int x = 0;
            Organization e = Mapper.CastOrganization(organization);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Organization.Find(organization.Id).Categories.Clear();
                foreach (var item in categories)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    db.Organization.Find(organization.Id).Categories.Add(c);
                }
                db.Entry<Organization>(db.Set<Organization>().Find(e.Id)).CurrentValues.SetValues(e);
                db.SaveChanges();
                x = db.Organization.Local[0].Id;
            }
            return x;
        }

        public static void RemoveOrganization(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var query = from row in db.OrganizationAndFamily.AsEnumerable() where row.IdOrganization == id select row;
                if (query.ToList().Count > 0)
                {
                    db.OrganizationAndFamily.FirstOrDefault().Families = null;
                    // db.VolunteerAndFamily.Remove(db.VolunteerAndFamily.Find(query.FirstOrDefault().Id));
                }
                db.Organization.Find(id).Categories.Clear();
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
                var c = db.Categories.FirstOrDefault(ca => ca.Id == e.Id);
                e.Categories.Add(c);
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
        public static Common.Organization GetMostOrganization()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var organization = db.Organization.OrderBy(f => f.OrganizationAndFamily.Count).ToList();
                return Mapper.CastOrganizationToComon(organization.Last());
            }
        }
    }
}
