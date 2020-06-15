using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class GroupManager
    {
        public static void AddGroup(Group group)
        {
            Groups g = Mapper.CastGroup(group);
            using (dbRamotEntities db = new dbRamotEntities())
            { //if (db.Groups.Contains(g)) 
                db.Groups.Add(g);
                db.SaveChanges();
            }
        }
        public static void RemoveGroup(int id)
        {
            
            using (dbRamotEntities db = new dbRamotEntities())
            {
                Groups g = db.Groups.Find(id);
                db.Groups.Remove(g);
                db.SaveChanges();
            }
        }

        public static Group GetGroup(int id)
        {
            using (dbRamotEntities db=new dbRamotEntities())
            {
                return Mapper.CastGroupToComon(db.Groups.Find(id));
            }
        }

        public static void UpdateGroup(Group group)
        {
            Groups g = Mapper.CastGroup(group);
            using (dbRamotEntities db = new dbRamotEntities())
            {

                db.Entry<Groups>(db.Set<Groups>().Find(g.Id)).CurrentValues.SetValues(g);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Group> GetGroups()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Group> groups = new List<Group>();
                foreach (var g in   db.Groups.ToList())
                {
                    groups.Add(Mapper.CastGroupToComon(g));
                } 
                return groups;
            }
        }
        public static IEnumerable<Common.Volunteer> GetVolunteers(int id)
        {
            List<Volunteer> volunteers = new List<Volunteer>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var g = db.Groups.Find(id).Volunteers.ToList();
                foreach (var v in g)
                {
                    volunteers.Add(Mapper.CastVolunteerToComon(v));
                }

            }
            return volunteers;
        }

        public static IEnumerable<Common.Category> GetCategories(int id)
        {
            List<Category> categories = new List<Category>();
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var g = db.Groups.Find(id).Categories.ToList();
                foreach (var c in g)
                {
                    categories.Add(Mapper.CastCategoryToCommon(c));
                }

            }
            return categories;
        }
    }
}
