using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Common;
using Newtonsoft.Json.Linq;

namespace WebApi.Controllers
{
    [RoutePrefix("api/family")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FamilyController : ApiController
    {
        // GET: api/Family
        public IEnumerable<Family> Get()
        {
            return Bll.FamilyManager.GetFamilies();
        }
        [Route("api/categoriesOfFamily")]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.FamilyManager.GetCategories(id);
        }
        [Route("api/addCategoryToFamily")]
        public void AddCategory(int id,[FromBody] Category category)
        {
             Bll.FamilyManager.AddCategory(id,category);
        }
        [Route("api/removeCategoryFromFamily")]
        public void RemoveCategory(int id, [FromBody] Category category)
        {
            Bll.FamilyManager.RemoveCategory(id,category);
        }
        // GET: api/Family/5
        public Family Get(int id)
        {
            return Bll.FamilyManager.GetFamily(id);
        }

        // POST: api/Family
        public int Post([FromBody] JObject data)
        {
            Family newFamily = data["family"].ToObject<Family>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.FamilyManager.AddFamily(newFamily, category);
        }

        [HttpPut]
        // PUT: api/Volunteer/5
        public void Put([FromBody] JObject data)
        {
            Family newFamily = data["family"].ToObject<Family>();
            Category[] category = data["categories"].ToObject<Category[]>();
            Bll.FamilyManager.UpdateFamily(newFamily, category);
        }
        [HttpDelete]
        // DELETE: api/Family/5
        public void Delete(int id)
        {
            Bll.FamilyManager.RemoveFamily(id);
        }
        [Route("api/family/volunteers")]
        public IEnumerable<Volunteer> GetVolunteers(int id)
        {
            return Bll.FamilyManager.GetVolunteers(id);
        }
        [Route("api/family/organizations")]
        public IEnumerable<Organization> GetOrganizations(int id)
        {
            return Bll.FamilyManager.GetOrganizations(id);
        }
        
        [Route("familiesbycategory/{id}")]
        [HttpGet]
        public IEnumerable<Family> GetFamiliesByCategoryAndVolunteer(int id)
        {
            int idVolunteer = 0;
            var re = Request;
            var headers = re.Headers;

            if (headers.Contains("Authorization"))
            {
                idVolunteer = int.Parse(headers.GetValues("Authorization").First());
            }

            return Bll.FamilyManager.GetFamiliesByCategoryAndVolunteer(id, idVolunteer);
        }
    }
}
