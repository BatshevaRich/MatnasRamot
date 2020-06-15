using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    /// <summary>
    /// Manager of volunteer
    /// </summary>
    public static class VolunteerManager
    {

        /// <summary>
        /// Get all volunteers from db.
        /// </summary>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteers()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Volunteer> volunteers = new List<Volunteer>();
                foreach (var v in db.Volunteers.ToList())
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(v));
                }
                return volunteers;
            }
        }

        /// <summary>
        /// Get volunteer by id
        /// </summary>
        /// <param name="id">Id of volunteer searching for</param>
        /// <returns>Volunteer</returns>
        public static Volunteer GetVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastVolunteerToComon(db.Volunteers.Find(id));
            }
        }

        /// <summary>
        /// Add volunteer to db, and categories for that volunteer.
        /// </summary>
        /// <param name="volunteer">Volunteer object</param>
        /// <param name="category">Category</param>
        /// <returns>Id of added volunteer</returns>
        public static int AddVolunteer(Volunteer volunteer, Category[] category)
        {/////////////////////////////////////need to deal with category add
            int x = 0;
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                foreach (var item in category)
                {
                    var c = db.Categories.FirstOrDefault(ca => ca.Id == item.Id);
                    //var c =cc.FirstOrDefault(ca => ca.Id == item.Id);
                    v.Categories.Add(c);
                }
                db.Volunteers.Add(v);
                db.SaveChanges();
                x = db.Volunteers.Local[0].Id;
            }
            return x;
        }

        /// <summary>
        /// Remove volunteer from db by id, including volunteer actions of that volunteer.
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        public static void RemoveVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var query = from row in db.VolunteerAndFamily.AsEnumerable() where row.IdVolunteer == id select row;
                if (query.ToList().Count > 0)
                {
                    db.VolunteerAndFamily.Remove(db.VolunteerAndFamily.Find(query.FirstOrDefault().Id));
                }
                db.Volunteers.Find(id).Categories.Clear();
                db.Volunteers.Remove(db.Volunteers.Find(id));
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }

            }
        }

        /// <summary>
        /// Update volunteer with new information, including categories.
        /// </summary>
        /// <param name="volunteer">Volunteer object</param>
        /// <param name="categories">List of categories</param>
        public static void UpdateVolunteer(Volunteer volunteer, Category[] categories)
        {
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities db = new dbRamotEntities())
            {/////////////////////////////////need to fix categories!
                db.Entry<Volunteers>(db.Set<Volunteers>().Find(v.Id)).CurrentValues.SetValues(v);
                db.SaveChanges();
            }
        }

        /// <summary>
        /// Get categories of volunteer.
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>List of categories</returns>
        public static IEnumerable<Category> GetCategoriesOfVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                IEnumerable<Categories> c = db.Volunteers.Find(id).Categories.ToList();
                List<Category> categories = new List<Category>();
                foreach (var category in c)
                {
                    categories.Add(Mapper.CastCategoryToCommon(category));
                }
                return categories;
            }
        }


        /// <summary>
        /// Gets all volunteers that share the same category.
        /// </summary>
        /// <param name="idCategory">Id of category filtering by</param>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteersByCategory(int idCategory)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var volunteersDb = db.Volunteers.Where(v => v.Categories.Any(c => c.Id == idCategory));
                List<Volunteer> volunteers = new List<Volunteer>();
                foreach (var v in volunteersDb)
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(v));
                }
                return volunteers;
            }
        }

        /// <summary>
        /// Add category to volunter
        /// Helper func- does not work........
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <param name="category">Category object</param>
        public static void AddCategoryToVolunteer(int id, Category[] category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Volunteers v = db.Volunteers.Find(id);
                foreach (var item in category)
                {
                    var test = Mapper.CastCategory(item);

                    v.Categories.Add(Mapper.CastCategory(item));
                    db.SaveChanges();
                }

            }
        }

        /// <summary>
        /// Remove category from volunter
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <param name="category">Category object</param>
        public static void RemoveCategoryFromVolunteer(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Volunteers v = db.Volunteers.Find(id);
                v.Categories.Remove(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
        
        /// <summary>
        /// Get families of volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>List of families</returns>
        public static IEnumerable<Family> GetFamilies(int id)
        {
            List<Family> families = new List<Family>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var f = db.VolunteerAndFamily.Where(g => g.IdVolunteer == id).Select(g => g.IdFamily).ToArray();
                foreach (var i in f)
                {
                    families.Add(Mapper.CastFamilyToComon(db.Families.Find(i)));
                }

            }
            return families;
        }

        /// <summary>
        /// Get all volunteers for specific category and family.
        /// </summary>
        /// <param name="idFamily">Id of family</param>
        /// <param name="idCategory">Id of category</param>
        /// <returns>List of volunteers</returns>
        public static IEnumerable<Volunteer> GetVolunteersByCategoryAndFamily(int idFamily, int idCategory)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var volunteersDb = db.Volunteers.Where(v => v.Categories.Any(c => c.Id == idCategory) && !v.VolunteerAndFamily.Any(vf => vf.IdFamily == idFamily));
                List<Volunteer> volunteers = new List<Volunteer>();
                foreach (var v in volunteersDb)
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(v));
                }
                return volunteers;
            }
        }

        public static IEnumerable<Event> GetEvents(int id)
        {
            List<Event> events = new List<Event>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var f = db.VolunteerAndEvent.Where(g => g.IdVolunteer == id).Select(g => g.IdEvent).ToArray();
                foreach (var i in f)
                {
                    events.Add(Mapper.CastEventToComon(db.Events.Find(i)));
                }
            }
            return events;
        }
        public static IEnumerable<Group> GetGroups(int id)
        {
            List<Group> groups = new List<Group>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                Volunteers v = db.Volunteers.Find(id);
                var f = db.Groups.ToList();
                foreach (var g in f)
                {
                    var s = g.Volunteers.ToList();
                    if (s.Contains(v))
                        groups.Add(Mapper.CastGroupToComon(g));
                }
            }
            return groups;
        }
    }
}
