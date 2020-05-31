using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Common;

namespace WebApi.Controllers
{
    public class VolunteerAndFamilyController : ApiController
    {
        // GET: api/VolunteerAndFamily
        public IEnumerable<Common.VolunteerAndFamily> Get()
        {
            return Bll.VolunteerAndFamilyManager.GetVolunteerAndFamilys();
        }

        // GET: api/VolunteerAndFamily/5
        [Route("api/VolunteerAndFamily/Getvaf/{Id}")]
        [HttpGet]
        public VolunteerAndFamily Getvaf(int id)
        {
            return Bll.VolunteerAndFamilyManager.GetVolunteerAndFamily(id);
        }


        // GET: api/VolunteerAndFamily/5
        public IEnumerable<Family> Get(int id)
        {
            return Bll.VolunteerAndFamilyManager.GetVolunteerAndFamilyForVolunteer(id);
        }

        [Route("api/VolunteerAndFamily/Getvf/{fId}")]
        [HttpGet]
        public IEnumerable<Volunteer> Getvf(int fId)
        {
            return Bll.VolunteerAndFamilyManager.GetVolunteerAndFamilyForFamily(fId);
        }

        // POST: api/VolunteerAndFamily
        public void Post([FromBody]VolunteerAndFamily value)
        {
            Bll.VolunteerAndFamilyManager.AddVolunteerAndFamily(value);
        }

        // PUT: api/VolunteerAndFamily/5
        public void Put(int id, [FromBody]VolunteerAndFamily value)
        {
            Bll.VolunteerAndFamilyManager.UpdateVolunteerAndFamily(value);
        }

        // DELETE: api/VolunteerAndFamily/5
        public void Delete(int id)
        {
            Bll.VolunteerAndFamilyManager.RemoveVolunteerAndFamily(id);
        }
    }
}
