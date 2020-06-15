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
    [RoutePrefix("api/OrganizationAndFamily")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrganizationAndFamilyController : ApiController
    {
        // GET: api/OrganizationAndFamily
        public IEnumerable<Common.OrganizationAndFamily> Get()
        {
            return Bll.OrganizationAndFamilyManager.GetOrganizationAndFamilys();
        }

        // GET: api/OrganizationAndFamily/5
        public OrganizationAndFamily Get(int id)
        {
            return Bll.OrganizationAndFamilyManager.GetOrganizationAndFamily(id);
        }

        // POST: api/OrganizationAndFamily
        public void Post([FromBody]OrganizationAndFamily value)
        {
            Bll.OrganizationAndFamilyManager.AddOrganizationAndFamily(value);
        }

        // PUT: api/OrganizationAndFamily/5
        public void Put(int id, [FromBody]OrganizationAndFamily value)
        {
            Bll.OrganizationAndFamilyManager.UpdateOrganizationAndFamily(value);
        }

        // DELETE: api/OrganizationAndFamily/5
        public void Delete(int id)
        {
            Bll.OrganizationAndFamilyManager.RemoveOrganizationAndFamily(id);
        }
    }
}
