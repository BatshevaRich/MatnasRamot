using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Bll
{
   public static class GroupManager
    {
        public static void AddGroup(Group group)
        {
            Dal.GroupManager.AddGroup(group);
        }
        public static void RemoveGroup(int id)
        {
            Dal.GroupManager.RemoveGroup(id);
        }
        public static void UpdateGroup(Group group)
        {
            Dal.GroupManager.UpdateGroup(group);
        }

        public static Group GetGroup(int id)
        {
            return Dal.GroupManager.GetGroup(id);
        }

        public static IEnumerable<Group> GetGroups()
        {
           return Dal.GroupManager.GetGroups();
        }
        public static IEnumerable<Common.Volunteer> GetVolunteers(int id)
        {
            return Dal.GroupManager.GetVolunteers(id);
        }
    }
}
