using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class VolunteerManager
    {
        public static int AddVolunteer(Volunteer volunteer, Category[] category)
        {
            int x = 0;
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                foreach (var item in category)
                {
                    var test = Mapper.CastCategory(item);
                    v.Categories.Add(test);
                }
                db.Volunteers.Add(v);
                db.SaveChanges();
                x = db.Volunteers.Local[0].Id;
            }

            //AddCategotyToVolunteer(x, category);
            return x;
        }
        public static void RemoveVolunteer(Volunteer volunteer)
        {
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.Volunteers.Remove(v);
                db.SaveChanges();
            }
        }
        public static void UpdateVolunteer(Volunteer volunteer, Category[] categories)
        {
            Volunteers v = Mapper.CastVolunteer(volunteer);
            using (dbRamotEntities db = new dbRamotEntities())
            {/////////////////////////////////need to fix categories!
                db.Entry<Volunteers>(db.Set<Volunteers>().Find(v.Id)).CurrentValues.SetValues(v);
                db.SaveChanges();
            }
        }

        public static void RemoveVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {/////////////need to remove categories first- foreign key problem
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

        public static IEnumerable<Volunteer> GetVolunteersByCategoryAndFamily(int idFamily, Category category)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var volunteersDb = db.Volunteers.Where(v => v.Categories.Any(c => c.Name == category.Name) && !v.VolunteerAndFamily.Any(vf => vf.IdFamily == idFamily));
                List<Volunteer> volunteers = new List<Volunteer>();
                foreach (var v in volunteersDb)
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(v));
                }
                return volunteers;
            }
        }

        public static Volunteer GetVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastVolunteerToComon(db.Volunteers.Find(id));
            }
        }

        public static void AddCategotyToVolunteer(int id, Category[] category)
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
        public static void RemoveCategotyFromVolunteer(int id, Category category)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                Volunteers v = db.Volunteers.Find(id);
                v.Categories.Remove(Mapper.CastCategory(category));
                db.SaveChanges();
            }
        }
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
