using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
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
        [Route("api/event/volunteers")]
        public IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Bll.EventManager.GetVolunteers(id);
        }
        // POST: api/Event
        public void Post([FromBody]Event family)
        {
            Bll.EventManager.AddEvent(family);
        }

        // PUT: api/Event/5
        public void Put(int id, [FromBody]Event family)
        {
            Bll.EventManager.UpdateEvent(family);
        }

        // DELETE: api/Event/5
        public void Delete(int id)
        {
            Bll.EventManager.RemoveEvent(id);
        }
        [Route("api/categoriesOfEvent")]
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
    }
}
