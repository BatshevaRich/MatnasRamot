using Common;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.Controllers
{
    [RoutePrefix("api/event")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EventController : ApiController
    {
        // GET: api/Event
        public IEnumerable<Event> Get()
        {
            return Bll.EventManager.GetEvents();
        }

        // GET: api/Event/5
        public Event Get(int id)
        {
            return Bll.EventManager.GetEvent(id);
        }
        [Route("volunteers/{id}")]
        public IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Bll.EventManager.GetVolunteers(id);
        }
        // POST: api/Event
        public int Post([FromBody] JObject data)
        {
            Event newEvent = data["event"].ToObject<Event>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.EventManager.AddEvent(newEvent, category);
        }

        // PUT: api/Event/5
        public int Put([FromBody] JObject data)
        {
            Event newEvent = data["event"].ToObject<Event>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.EventManager.UpdateEvent(newEvent, category);
        }

        // DELETE: api/Event/5
        public void Delete(int id)
        {
            Bll.EventManager.RemoveEvent(id);
        }
        [Route("categoriesOfEvent/{id}")]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.EventManager.GetCategories(id);
        }
        [Route("api/addCategoryToEvent")]
        public void AddCategory(int id, [FromBody] Category category)
        {
            Bll.EventManager.AddCategory(id, category);
        }
        [Route("api/removeCategoryFromEvent")]
        public void RemoveCategory(int id, [FromBody] Category category)
        {
            Bll.EventManager.RemoveCategory(id, category);
        }

        [Route("volunteer/{id}")]
        public IEnumerable<Event> GetEventsForVolunteer(int id)
        {
            return Bll.EventManager.GetEventsForVolunteer(id);
        }
    }
}
