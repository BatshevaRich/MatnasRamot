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
            Groups v = Mapper.CastGroup(group);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Groups.Add(v);
                db.SaveChanges();
            }
        }
        public static void RemoveGroup(Group group)
        {
            Groups v = Mapper.CastGroup(group);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Groups.Remove(v);
                db.SaveChanges();
            }
        }
        public static void UpdateGroup(Group group)
        {
            Groups v = Mapper.CastGroup(group);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Entry<Groups>(db.Set<Groups>().Find(v.Id)).CurrentValues.SetValues(v);
                db.SaveChanges();
            }
        }

        public static void RemoveGroup(int id)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Groups.Remove(db.Groups.Find(id));
                db.SaveChanges();
            }
        }

        public static IEnumerable<Group> GetGroups()
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                List<Group> groups = new List<Group>();
                foreach (var v in db.Groups.ToList())
                {
                    groups.Add(Mapper.CastGroupToComon(v));
                }
                return groups;
            }
        }
        public static List<string> GetCategoriesForGroup(Group group)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                return db.Groups.Find(group.Id).Categories.Select(c => c.Name).ToList();
            }
        }
        public static Group GetGroup(int id)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                return Mapper.CastGroupToComon(db.Groups.Find(id));
            }
        }
    }
}
