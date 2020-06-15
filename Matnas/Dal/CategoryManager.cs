using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
   public static class CategoryManager
    {
        public static void AddCategory(Category category)
        {
            Categories c = Mapper.CastCategory(category);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Categories.Add(c);
                db.SaveChanges();
            }
        }
        public static void RemoveCategory(Category category)
        {
            Categories c = Mapper.CastCategory(category);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                foreach (var item in db.Volunteers)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.Families)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.Events)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.Organization)
                {
                    item.Categories.Remove(c);
                }
                db.Categories.Remove(c);
                db.SaveChanges();
            }
        }

        public static Category GetCategory(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastCategoryToCommon(db.Categories.Find(id));

            }
        }

        public static void UpdateCategory(Category category)
        {
            Categories c = Mapper.CastCategory(category);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Entry<Categories>(db.Set<Categories>().Find(c.Id)).CurrentValues.SetValues(c);
                db.SaveChanges();
            }
        }

        public static void RemoveCategory(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var c = db.Categories.FirstOrDefault(i => i.Id == id);
                foreach (var item in db.Volunteers)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.Families)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.Events)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.Organization)
                {
                    item.Categories.Remove(c);
                }
                foreach (var item in db.OrganizationAndFamily)
                {/////////////////////////////////////
                    item.Categories = null;
                }
                foreach (var item in db.VolunteerAndFamily)
                {///////////////////////////////////////
                    item.Categories = null;
                }
                foreach (var item in db.VolunteerAndEvent)
                {
                    item.Categories = null;
                }
                db.Categories.Remove(db.Categories.Find(id));
                db.SaveChanges();
            }
        }

        public static IEnumerable<Category> GetCategories()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Category> events = new List<Category>();
                foreach (var c in db.Categories.ToList())
                {
                    events.Add(Mapper.CastCategoryToCommon(c));
                }
                return events;
            }
        }

        public static IEnumerable<Category> GetCategoriesForAllVolunteers()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Category> categories = new List<Category>();
                var all = db.Volunteers;
                foreach (var item in all)
                {
                    foreach (var cat in item.Categories)
                    {
                        categories.Add(Mapper.CastCategoryToCommon(cat));
                    }
                }
                return categories;
            }
            
            
        }
        public static IEnumerable<Category> GetCategoriesForAllFamilies()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Category> categories = new List<Category>();
                var all = db.Families;
                foreach (var item in all)
                {
                    foreach (var cat in item.Categories)
                    {
                        categories.Add(Mapper.CastCategoryToCommon(cat));
                    }
                }
                return categories;
            }
        }
    }
}
