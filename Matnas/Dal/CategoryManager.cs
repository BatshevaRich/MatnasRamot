using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
   public static class CategoryManager
    {
        public static void AddCategory(string category)
        {
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
                db.Categories.Add(new Categories() { Name = category });//id????
                db.SaveChanges();
            }
        }
        public static void RemoveCategory(string category)
        {
         
            using (dbRamotEntities1 db = new dbRamotEntities1())
            {
               Categories c=  db.Categories.Where(c2=>c2.Name==category).First();
                db.Categories.Remove(c);
                db.SaveChanges();
            }
        }
    }
}
