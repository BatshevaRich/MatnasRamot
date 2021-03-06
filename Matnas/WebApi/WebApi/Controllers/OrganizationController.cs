﻿using Common;
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
    [RoutePrefix("api/Organization")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrganizationController : ApiController
    {
        // GET: api/Organization
        public IEnumerable<Organization> Get()
        {
            return Bll.OrganizationManager.GetOrganizations();
        }

        // GET: api/Organization/5
        public Organization Get(int id)
        {
            return Bll.OrganizationManager.GetOrganization(id);
        }

        // POST: api/Organization
        public int Post([FromBody] JObject data)
        {
            Organization newOrganization = data["organization"].ToObject<Organization>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.OrganizationManager.AddOrganization(newOrganization, category);
        }

        // PUT: api/Organization/5
        public int Put([FromBody] JObject data)
        {
            Organization newOrganization = data["organization"].ToObject<Organization>();
            Category[] category = data["categories"].ToObject<Category[]>();
            return Bll.OrganizationManager.UpdateOrganization(newOrganization, category);
        }

        // DELETE: api/Organization/5
        public void Delete(int id)
        {
            Bll.OrganizationManager.RemoveOrganization(id);
        }

        [Route("families/{id}")]
        [HttpGet]
        public IEnumerable<Family> GetFamilies(int id)
        {
            return Bll.OrganizationManager.GetFamilies(id);
        }

        [Route("categories/{id}")]
        public IEnumerable<Category> GetCategories(int id)
        {
            return Bll.OrganizationManager.GetCategories(id);
        }
        [Route("api/organization/addcategory")]
        public void AddCategory(int id, [FromBody] Category category)
        {
            Bll.OrganizationManager.AddCategory(id, category);
        }
        [Route("api/organization/removecategory")]
        public void RemoveCategory(int id, [FromBody] Category category)
        {
            Bll.OrganizationManager.RemoveCategory(id, category);
        }
    }
}
