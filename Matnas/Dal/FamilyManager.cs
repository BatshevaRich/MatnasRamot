using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class  FamilyManager
    {
        public static void AddFamily(Family family)
        {
            Families f = Mapper.CastFamily(family);
            using (dbRamotEntities db=new dbRamotEntities())
            {
                db.Families.Add(f);
                db.SaveChanges();
            }
        }
        public static void RemoveFamily(Family family)
        {
            Families f = Mapper.CastFamily(family);
            using (dbRamotEntities db=new dbRamotEntities())
            {
                db.Families.Remove(f);
                db.SaveChanges();
            }
        }
        public static void UpdateFamily(Family family)
        {
            Families f = Mapper.CastFamily(family);
            using (dbRamotEntities db=new dbRamotEntities())
            {
                db.Entry<Families>(db.Set<Families>().Find(f.Id)).CurrentValues.SetValues(f);
                db.SaveChanges();
            }
        }
        public static void AddCategotyToFamily(int id,Category category)
        {
          
            using (dbRamotEntities db = new dbRamotEntities())
            {
                Families f = db.Families.Find(id);
                f.Categories.Add(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        public static void RemoveCategotyFromFamily(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Families f = db.Families.Find(id);
                f.Categories.Remove(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        public static List<Category> GetCategoriesOfFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                IEnumerable<Categories> c=db.Families.Find(id).Categories.ToList();
                List<Category> categories = new List<Category>();
                foreach (var category in c)
                {
                    categories.Add(Mapper.CastCategoryToCommon(category));
                }
                return categories;
            }
        }
        public static void AddCategoriesToFamily(Family family,IEnumerable<Category> categories)
        {
            
        }

        public static void AddCategoriesToFamily(IEnumerable<Category> categories)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                Families f = db.Families.ToArray()[0];//last element!!!
                foreach (var category in categories)
                {
                   f.Categories.Add(Mapper.CastCategory(category));
                }
                db.SaveChanges();
            }
        }
           
        public static void RemoveFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Families.Remove(db.Families.Find(id));
                db.SaveChanges();
            }
        }

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
        
        public static Family GetFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastFamilyToComon( db.Families.Find(id));
            }
        }
        public static IEnumerable<Volunteer> GetVolunteers(int id)
        {
            List<Volunteer> volunteers  = new List<Volunteer>();
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
                Volunteers v = db.Volunteers.Find(id);
                var f = db.OrganizationAndFamily.Where(g => g.IdFamily == id).Select(g => g.IdOrganization).ToArray();
                foreach (var o in f)
                {
                   organizations.Add(Mapper.CastOrganizationToComon(db.Organization.Find(id)));
                }
            }
            return organizations;
        }
    }
}
