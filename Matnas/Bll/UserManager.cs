using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
   public static class UserManager
    {
        public static void AddUser(User user)
        {
            Dal.UserManager.AddUser(user);
        }
        public static void RemoveUser(User user)
        {
            Dal.UserManager.RemoveUser(user);
        }
        public static void UpdateUser(User user)
        {
            Dal.UserManager.UpdateUser(user);
        }
        public static IEnumerable<User> GetUsers()
        {
            return Dal.UserManager.GetUsers();
        }
    }
}
