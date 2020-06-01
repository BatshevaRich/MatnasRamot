using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Common;
using Newtonsoft.Json.Linq;
namespace WebApi.Controllers
{
    public class VolunteerController : ApiController
    {
        // GET: api/Volunteer
        public IHttpActionResult Get()
        {
            return Ok(Bll.VolunteerManager.GetVolunteers());
        }

        // GET: api/Volunteer/5
        public Volunteer Get(int id)
        {
            return Bll.VolunteerManager.GetVolunteer(id);
        }

        // POST: api/Volunteer
        public int Post([FromBody] JObject data)
        {
            Volunteer newVolunteer = data["volunteer"].ToObject<Volunteer>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.VolunteerManager.AddVolunteer(newVolunteer, category);
        }

        [HttpPut]
        // PUT: api/Volunteer/5
        public void Put([FromBody] JObject data)
        {
            Volunteer newVolunteer = data["volunteer"].ToObject<Volunteer>();
            Category[] category = data["categories"].ToObject<Category[]>();
            Bll.VolunteerManager.UpdateVolunteer(newVolunteer, category);
        }

        // DELETE: api/Volunteer/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new Exception("Error saving volunteer in database"));
                // Bll.VolunteerManager.RemoveVolunteer(id);
                
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, e);
            }
            
        }
       
        [Route("api/categoriesOfVolunteer")]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.VolunteerManager.GetCategories(id);
        }
        [Route("api/addCategoryToVolunteer")]
        public void AddCategory(int id, [FromBody] Category[] category)
        {
            Bll.VolunteerManager.AddCategory(id, category);
        }
        [Route("api/removeCategoryFromVolunteer")]
        public void RemoveCategory(int id, [FromBody] Category category)
        {
            Bll.VolunteerManager.RemoveCategory(id, category);
        }
        [Route("api/volunteer/families")]
        public IEnumerable<Family> GetFamilies(int id)
        {
            return Bll.VolunteerManager.GetFamilies(id);
        }
        [Route("api/volunteer/groups")]
        public IEnumerable<Group> GetGroups(int id)
        {
            return Bll.VolunteerManager.GetGroups(id);
        }
        [Route("api/volunteer/events")]
        public IEnumerable<Event> GetEvents(int id)
        {
            return Bll.VolunteerManager.GetEvents(id);
        }
        [Route("api/volunteer/familyandcategory")]
        public IEnumerable<Volunteer> GetVolunteersByCategoryAndFamily(int idFamily, [FromBody] Category category)
        {
            return Bll.VolunteerManager.GetVolunteersByCategoryAndFamily(idFamily, category);
        }
    }
}
