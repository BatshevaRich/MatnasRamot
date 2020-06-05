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
        /// <summary>
        /// Get all volunteers
        /// </summary>
        /// <returns>List of volunteers</returns>
        // GET: api/Volunteer
        public IHttpActionResult Get()
        {
            return Ok(Bll.VolunteerManager.GetVolunteers());
        }

        /// <summary>
        /// Get volunteer by id.
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>Volunteer object</returns>
        // GET: api/Volunteer/5
        public Volunteer Get(int id)
        {
            return Bll.VolunteerManager.GetVolunteer(id);
        }

        /// <summary>
        /// Post volunteer to db.
        /// </summary>
        /// <param name="data">Volunteer object and Category list</param>
        /// <returns></returns>
        // POST: api/Volunteer
        public int Post([FromBody] JObject data)
        {
            Volunteer newVolunteer = data["volunteer"].ToObject<Volunteer>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.VolunteerManager.AddVolunteer(newVolunteer, category);
        }

        /// <summary>
        /// Update volunteer by data sent.
        /// </summary>
        /// <param name="data">Volunteer object and Category list</param>
        [HttpPut]
        // PUT: api/Volunteer/5
        public void Put([FromBody] JObject data)
        {
            Volunteer newVolunteer = data["volunteer"].ToObject<Volunteer>();
            Category[] category = data["categories"].ToObject<Category[]>();
            Bll.VolunteerManager.UpdateVolunteer(newVolunteer, category);
        }

        /// <summary>
        /// Delete volunteer from db.
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        // DELETE: api/Volunteer/5
        public void Delete(int id)
        {
            //return Request.CreateResponse(HttpStatusCode.BadRequest, new Exception("Error saving volunteer in database"));
            Bll.VolunteerManager.RemoveVolunteer(id);
        }

        /// <summary>
        /// Get categories of volunteers.
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>List of categories</returns>
        [Route("api/categoriesOfVolunteer")]
        [HttpGet]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.VolunteerManager.GetCategories(id);
        }
        
        /// <summary>
        /// Add category to volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <param name="category">List of categories</param>
        [Route("api/addCategoryToVolunteer")]
        public void AddCategory(int id, [FromBody] Category[] category)
        {
            Bll.VolunteerManager.AddCategory(id, category);
        }
        
        /// <summary>
        /// Remove category from volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <param name="category">Category of volunteer</param>
        [Route("api/removeCategoryFromVolunteer")]
        public void RemoveCategory(int id, [FromBody] Category category)
        {/////////////////need to check if works
            Bll.VolunteerManager.RemoveCategory(id, category);
        }
        
        /// <summary>
        /// Get families of volunteer
        /// </summary>
        /// <param name="id">Id of volunteer</param>
        /// <returns>List of families</returns>
        [Route("api/volunteer/families")]
        [HttpGet]
        public IEnumerable<Family> GetFamilies(int id)
        {
            return Bll.VolunteerManager.GetFamilies(id);
        }

        /// <summary>
        /// Get volunteers by category sent.
        /// </summary>
        /// <param name="idCategory">Id of category</param>
        /// <returns>List of volunteers</returns>
        [Route("api/volunteer/volunteersbycategory/{idCategory}")]
        public IEnumerable<Volunteer> GetVolunteersByCategory(int idCategory)
        {
            return Bll.VolunteerManager.GetVolunteersByCategory(idCategory);
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
    }
}
