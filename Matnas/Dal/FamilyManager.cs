using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class FamilyManager
    {
        /// <summary>
        /// Get all families.
        /// </summary>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamilies()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Family> families = new List<Family>();
                foreach (var f in db.Families.ToList())
                {
                    families.Add(Mapper.CastFamilyToComon(f));
                }
                return families;
            }
        }

        /// <summary>
        /// Get family by id
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <returns>Family object</returns>
        public static Family GetFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastFamilyToComon(db.Families.Find(id));
            }
        }

        /// <summary>
        /// Add family to db.
        /// </summary>
        /// <param name="family">Family object</param>
        /// <param name="categories">List of categories</param>
        /// <returns>Id of added family</returns>
        public static int AddFamily(Family family, Category[] categories)
        {
            int x = 0;
            Family newFamily = null;
            Families f = Mapper.CastFamily(family);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                foreach (var item in categories)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    f.Categories.Add(c);
                }
                db.Families.Add(f);
                db.SaveChanges();
                x = db.Families.Local[0].Id;
                newFamily = Mapper.CastFamilyToComon(db.Families.Local[0]);
            }
            return x;

        }

        /// <summary>
        /// Update family with new information, including categories.
        /// </summary>
        /// <param name="family">Family object</param>
        /// <param name="categories">List of categories</param>
        public static void UpdateFamily(Family family, Category[] categories)
        {
            Families v = Mapper.CastFamily(family);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Families.Find(family.Id).Categories.Clear();
                foreach (var item in categories)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    db.Families.Find(family.Id).Categories.Add(c);
                }
                db.Entry<Families>(db.Set<Families>().Find(v.Id)).CurrentValues.SetValues(v);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// Remove family by id.
        /// </summary>
        /// <param name="id">Id of family</param>
        public static void RemoveFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var query = from row in db.VolunteerAndFamily.AsEnumerable() where row.IdFamily == id select row;
                if (query.ToList().Count > 0)
                {
                    db.VolunteerAndFamily.FirstOrDefault().Families = null;
                    // db.VolunteerAndFamily.Remove(db.VolunteerAndFamily.Find(query.FirstOrDefault().Id));
                }
                db.Families.Find(id).OrganizationAndFamily.Clear();
                db.Families.Find(id).Categories.Clear();
                db.Families.Remove(db.Families.Find(id));
                db.SaveChanges();
            }
        }

        /// <summary>
        /// Get categories of family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <returns>List of categories</returns>
        public static List<Category> GetCategoriesOfFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                IEnumerable<Categories> c = db.Families.Find(id).Categories.ToList();
                List<Category> categories = new List<Category>();
                foreach (var category in c)
                {
                    categories.Add(Mapper.CastCategoryToCommon(category));
                }
                return categories;
            }
        }

        /// <summary>
        /// Add category to family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <param name="category">Category object</param>
        public static void AddCategoryToFamily(int id, Category[] category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Families f = db.Families.Find(id);
                foreach (var item in category)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    f.Categories.Add(c);
                }

                db.SaveChanges();
            }
        }

        /// <summary>
        /// Remove category from family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <param name="category">Category object</param>
        public static void RemoveCategoryFromFamily(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Families f = db.Families.Find(id);
                f.Categories.Remove(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }

        /// <summary>
        /// Get volunteers of family.
        /// </summary>
        /// <param name="id">Id of family</param>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteers(int id)
        {
            List<Volunteer> volunteers = new List<Volunteer>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var f = db.VolunteerAndFamily.Where(g => g.IdFamily == id).Select(g => g.Volunteers).ToArray();
                foreach (var i in f)
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(i));
                }

            }
            return volunteers;
        }

        public static IEnumerable<Common.Organization> GetOrganizations(int id)
        {
            List<Common.Organization> organizations = new List<Common.Organization>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                Families v = db.Families.Find(id);
                var f = db.OrganizationAndFamily.Where(g => g.IdFamily == id).Select(g => g.IdOrganization).ToArray();
                foreach (var o in f)
                {
                    organizations.Add(Mapper.CastOrganizationToComon(db.Organization.Find(o)));
                }
            }
            return organizations;
        }

        /// <summary>
        /// Get families for specific category.
        /// </summary>
        /// <param name="idCategory">Id of category</param>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamiliesByCategory(int idCategory)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var familiesDb = db.Families.Where(f => f.Categories.Any(c => c.Id == idCategory));
                List<Family> families = new List<Family>();
                foreach (var f in familiesDb)
                {
                    families.Add(Mapper.CastFamilyToComon(f));
                }
                return families;
            }
        }

        /// <summary>
        /// Get families by specific category and volunteer.
        /// </summary>
        /// <param name="idCategory">Id of category</param>
        /// <param name="idVolunteer">Id of volunteer</param>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamiliesByCategoryAndVolunteer(int idCategory, int idVolunteer)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var familiesDb = db.Families.Where(f => f.Categories.Any(c => c.Id == idCategory) && !f.VolunteerAndFamily.Any(vf => vf.IdVolunteer == idVolunteer));
                List<Family> families = new List<Family>();
                foreach (var f in familiesDb)
                {
                    families.Add(Mapper.CastFamilyToComon(f));
                }
                return families;
            }
        }

        public static IEnumerable<Family> GetFamiliesWithoutVolunteer()
        {
            List<Family> families = new List<Family>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var fam = db.Families.Where(f => f.VolunteerAndFamily.Count == 0).ToArray();
                foreach (var f in fam)
                {
                    families.Add(Mapper.CastFamilyToComon(f));
                }
            }
            return families;
        }

        public static Family GetMostFamily()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var family = db.Families.OrderBy(f => f.VolunteerAndFamily.Count + f.OrganizationAndFamily.Count).ToList();
                return Mapper.CastFamilyToComon(family.Last());
            }
        }
    }
}
