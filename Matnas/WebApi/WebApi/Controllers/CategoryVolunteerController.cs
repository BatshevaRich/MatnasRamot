using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
    public class CategoryVolunteerController : ApiController
    {
        // GET: api/CategoryVolunteer
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/CategoryVolunteer/5
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.VolunteerManager.GetCategories(id);
        }

        public void AddCategory(int id, [FromBody] Category[] category)
        {
            Bll.VolunteerManager.AddCategory(id, category);
        }

        // POST: api/CategoryVolunteer
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/CategoryVolunteer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/CategoryVolunteer/5
        public void Delete(int id)
        {
        }
    }
}
