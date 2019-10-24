﻿using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
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
        public void Post([FromBody]Organization organization)
        {
            Bll.OrganizationManager.AddOrganization(organization);
        }

        // PUT: api/Organization/5
        public void Put(int id, [FromBody]Organization organization)
        {
            Bll.OrganizationManager.UpdateOrganization(organization);
        }

        // DELETE: api/Organization/5
        public void Delete(int id)
        {
            Bll.OrganizationManager.RemoveOrganization(id);
        }
        [Route("api/volunteer/families")]
        public IEnumerable<Family> GetFamiliess(int id)
        {
            return Bll.OrganizationManager.GetFamilies(id);
        }
        [Route("api/organization/categories")]
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