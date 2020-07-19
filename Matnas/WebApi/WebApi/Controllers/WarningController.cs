using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
    public class WarningController : ApiController
    {
        // GET: api/Warning
        [Route("api/warning/family")]
        public IEnumerable<Family> Get()
        {
            return Bll.FamilyManager.GetFamiluesWithoutVolunteer();
        }

        // GET: api/Warning
        [Route("api/warning/event")]
        public IEnumerable<Event> GetEvents()
        {
            return Bll.EventManager.GetNextEvents();
        }

        [Route("api/warning/mostFamily")]
        public Family GetMostFamily()
        {
            return Bll.FamilyManager.GetMostFamily();
        }

    }
}
