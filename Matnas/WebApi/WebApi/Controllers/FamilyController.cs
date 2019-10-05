using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Common;

namespace WebApi.Controllers
{
    public class FamilyController : ApiController
    {
        // GET: api/Family
        public IEnumerable<Family> Get()
        {
            return Bll.FamilyManager.GetFamilies();
        }

        // GET: api/Family/5
        public Family Get(int id)
        {
            return Bll.FamilyManager.GetFamily(id);
        }

        // POST: api/Family
        public void Post([FromBody]Family newFamily)
        {
            Bll.FamilyManager.AddFamily(newFamily);
        }

        // PUT: api/Family/5
        public void Put(int id, [FromBody]Family value)
        {
            Bll.FamilyManager.UpdateFamily(value);
        }

        // DELETE: api/Family/5
        public void Delete(int id)
        {
            Bll.FamilyManager.RemoveFamily(id);
        }
    }
}
