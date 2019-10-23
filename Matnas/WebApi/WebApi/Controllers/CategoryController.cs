using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
    public class CategoryController : ApiController
    {
        // GET: api/Category
        public IEnumerable<Category> Get()
        {
            return Bll.CategoryManager.GetCategories();
        }

        // GET: api/Category/5
        public Category Get(int id)
        {
            return Bll.CategoryManager.GetCategory(id);
        }

        // POST: api/Category
        public void Post([FromBody]Category category)
        {
            Bll.CategoryManager.AddCategory(category);
        }

        // PUT: api/Category/5
        public void Put(int id, [FromBody]Category category)
        {
            Bll.CategoryManager.UpdateCategory(category);
        }

        // DELETE: api/Category/5
        public void Delete(int id)
        {
            Bll.CategoryManager.RemoveCategory(id);
        }
    }
}
