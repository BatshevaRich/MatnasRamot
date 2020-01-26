using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Common;

namespace WebApi.Controllers
{
    [RoutePrefix("api/family")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FamilyController : ApiController
    {
        // GET: api/Family
        public IEnumerable<Family> Get()
        {
            return Bll.FamilyManager.GetFamilies();
        }
        [Route("api/categoriesOfFamily")]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.FamilyManager.GetCategories(id);
        }
        [Route("api/addCategoryToFamily")]
        public void AddCategory(int id,[FromBody] Category category)
        {
             Bll.FamilyManager.AddCategory(id,category);
        }
        [Route("api/removeCategoryFromFamily")]
        public void RemoveCategory(int id, [FromBody] Category category)
        {
            Bll.FamilyManager.RemoveCategory(id,category);
        }
        // GET: api/Family/5
        public Family Get(int id)
        {
            return Bll.FamilyManager.GetFamily(id);
        }

        // POST: api/Family
        public void Post([FromBody]Family family)
        {
            Bll.FamilyManager.AddFamily(family);
        }

        // PUT: api/Family/5
        public void Put(int id, [FromBody]Family family)
        {
            Bll.FamilyManager.UpdateFamily(family);
        }
        [HttpDelete]
        // DELETE: api/Family/5
        public void Delete(int id)
        {
            Bll.FamilyManager.RemoveFamily(id);
        }
        [Route("api/family/volunteers")]
        public IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Bll.FamilyManager.GetVolunteers(id);
        }
        [Route("api/family/organizations")]
        public IEnumerable<Organization> GetOrganizations(int id)
        {
            return Bll.FamilyManager.GetOrganizations(id);
        }
    }
}
