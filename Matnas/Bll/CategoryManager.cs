using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bll
{
   public static class CategoryManager
    {
        public static void AddCategory(Category category)
        {
            Dal.CategoryManager.AddCategory(category);
        }
        public static void RemoveCategory(Category category)
        {
            Dal.CategoryManager.RemoveCategory(category);
        }
        public static void UpdateCategory(Category category)
        {
            Dal.CategoryManager.UpdateCategory(category);
        }

        public static Category GetCategory(int id)
        {
            return Dal.CategoryManager.GetCategory(id);
        }

        public static IEnumerable<Category> GetCategories()
        {
            return Dal.CategoryManager.GetCategories();
        }

        public static void RemoveCategory(int id)
        {
            Dal.CategoryManager.RemoveCategory(id);
        }
    }
}
