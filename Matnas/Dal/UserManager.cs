using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Dal
{
    public static class UserManager
    {
        public static void AddUser(Common.User user)
        {
            User u = Mapper.CastUser(user);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.User.Add(u);
                db.SaveChanges();
            }
        }
        public static void RemoveUser(Common.User user)
        {
            User u = Mapper.CastUser(user);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.User.Remove(u);
                db.SaveChanges();
            }
        }
        public static void UpdateUser(Common.User user)
        {
            User u = Mapper.CastUser(user);
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Entry<User>(db.Set<User>().Find(u.Id)).CurrentValues.SetValues(u);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Common.User> GetUsers()
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                List<Common.User> users = new List<Common.User>();
                foreach (var g in db.User.ToList())
                {
                    users.Add(Mapper.CastUserToComon(g));
                }
                return users;
            }
        }
    }
}
