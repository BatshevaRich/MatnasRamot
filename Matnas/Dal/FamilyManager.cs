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
        public static void AddFamily(Family Family)
        {
            Families v = Mapper.CastFamily(Family);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Families.Add(v);
                db.SaveChanges();
            }
        }
        public static void RemoveFamily(Family Family)
        {
            Families v = Mapper.CastFamily(Family);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Families.Remove(v);
                db.SaveChanges();
            }
        }
        public static void UpdateFamily(Family Family)
        {
            Families v = Mapper.CastFamily(Family);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Entry<Families>(db.Set<Families>().Find(v.Id)).CurrentValues.SetValues(v);
                db.SaveChanges();
            }
        }

        public static void RemoveFamily(int id)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Volunteers.Remove(db.Volunteers.Find(id));
                db.SaveChanges();
            }
        }

        public static IEnumerable<Family> GetFamilies()
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                List<Family> families = new List<Family>();
                foreach (var v in db.Families.ToList())
                {
                    families.Add(Mapper.CastFamilyToComon(v));
                }
                return families;
            }
        }
        public static List<string> GetCategoriesForFamily(Family Family)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                return db.Families.Find(Family.Id).Categories.Select(c => c.Name).ToList();
            }
        }
        public static Family GetFamily(int id)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                return Mapper.CastFamilyToComon(db.Families.Find(id));
            }
        }
    }
}
