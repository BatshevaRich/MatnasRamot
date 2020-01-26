using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Common;

namespace WebApi.Controllers
{
    public class VolunteerAndEventController : ApiController
    {
        // GET: api/VolunteerAndEvent
        public IEnumerable<Common.VolunteerAndEvent> Get()
        {
            return Bll.VolunteerAndEventManager.GetVolunteerAndEvents();
        }

        // GET: api/VolunteerAndEvent/5
        public VolunteerAndEvent Get(int id)
        {
            return Bll.VolunteerAndEventManager.GetVolunteerAndEvent(id);
        }

        // POST: api/VolunteerAndEvent
        public void Post([FromBody]VolunteerAndEvent value)
        {
            Bll.VolunteerAndEventManager.AddVolunteerAndEvent(value);
        }

        // PUT: api/VolunteerAndEvent/5
        public void Put(int id, [FromBody]VolunteerAndEvent value)
        {
            Bll.VolunteerAndEventManager.UpdateVolunteerAndEvent(value);
        }

        // DELETE: api/VolunteerAndEvent/5
        public void Delete(int id)
        {
            Bll.VolunteerAndEventManager.RemoveVolunteerAndEvent(id);
        }
    }
}