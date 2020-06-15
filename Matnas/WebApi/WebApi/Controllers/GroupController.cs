using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
        public void Post([FromBody]Group group)
        {
            Bll.GroupManager.AddGroup(group);
        }

        // PUT: api/Group/5
        public void Put(int id, [FromBody]Group group)
        {
            Bll.GroupManager.UpdateGroup(group);
        }

        // DELETE: api/Group/5
        public void Delete(int id)
        {
            Bll.GroupManager.RemoveGroup(id);
        }
        [Route("api/group/volunteers")]
        public IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Bll.GroupManager.GetVolunteers(id);
        }

        [Route("api/group/categoriesOfGroup/{id}")]
        [HttpGet]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.GroupManager.GetCategories(id);
        }
    }
}
