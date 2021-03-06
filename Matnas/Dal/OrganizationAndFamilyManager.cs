﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public static class OrganizationAndFamilyManager
    {
        public static void AddOrganizationAndFamily(Common.OrganizationAndFamily oaf)
        {
            OrganizationAndFamily g = Mapper.CastOrganizationAndFamily(oaf);
            using (dbRamotEntities db = new dbRamotEntities())
            {
                Categories c = null;
                if (oaf.Category != null)
                    c = db.Categories.FirstOrDefault(ca => ca.Id == oaf.Category.Id);
                var f = db.Families.FirstOrDefault(ca => ca.Id == oaf.Family.Id);
                var o = db.Organization.FirstOrDefault(ca => ca.Id == oaf.Organization.Id);
                g.Categories = c;
                g.Families = f;
                g.Organization = o;
                db.OrganizationAndFamily.Add(g);
                db.SaveChanges();
            }
        }
        public static void RemoveOrganizationAndFamily(int id)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.OrganizationAndFamily.Remove(db.OrganizationAndFamily.Find(id));
                db.SaveChanges();
            }
        }
        public static void UpdateOrganizationAndFamily(Common.OrganizationAndFamily oaf)
        {
            OrganizationAndFamily g = Mapper.CastOrganizationAndFamily(oaf);
            using (dbRamotEntities db = new dbRamotEntities())
            {

                db.Entry<OrganizationAndFamily>(db.Set<OrganizationAndFamily>().Find(g.Id)).CurrentValues.SetValues(g);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Common.OrganizationAndFamily> GetOrganizationAndFamilies()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Common.OrganizationAndFamily> oafs = new List<Common.OrganizationAndFamily>();
                foreach (var g in db.OrganizationAndFamily.ToList())
                {
                    oafs.Add(Mapper.CastOrganizationAndFamilyToComon(g));
                }
                return oafs;
            }
        }
        public static Common.OrganizationAndFamily GetOrganizationAndFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastOrganizationAndFamilyToComon(db.OrganizationAndFamily.Find(id));

            }
        }
    }
}
