using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Common;
namespace WebApi.Controllers
{
    public class GroupController : ApiController
    {
        // GET: api/Group
        public IEnumerable<Group> Get()
        {
            return Bll.GroupManager.GetGroups();
        }

        // GET: api/Group/5
        public Group Get(int id)
        {
            return Bll.GroupManager.GetGroup(id);
        }
        // POST: api/Group
        public void Post([FromBody]Group value)
        {
            Bll.GroupManager.AddGroup(value);
        }
        // PUT: api/Group/5
        public void Put(int id, [FromBody]Group value)
        {
            Bll.GroupManager.UpdateGroup(value);
        }

        // DELETE: api/Group/5
        public void Delete(int id)
        {
            Bll.FamilyManager.RemoveFamily(id);
        }
    }
}
