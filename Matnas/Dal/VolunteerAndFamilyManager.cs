﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public static class VolunteerAndFamilyManager
    {
        public static void AddVolunteerAndFamily(Common.VolunteerAndFamily vaf)
        {
            VolunteerAndFamily g = Mapper.CastVolunteerAndFamily(vaf);
            using (dbRamotEntities db = new dbRamotEntities())
            { //if (db.VolunteerAndFamily.Contains(g)) 
                Categories c = null;
                if (vaf.Category != null)
                    c = db.Categories.FirstOrDefault(ca => ca.Id == vaf.Category.Id);
                var v = db.Volunteers.FirstOrDefault(ca => ca.Id == vaf.Volunteer.Id);
                var f = db.Families.FirstOrDefault(ca => ca.Id == vaf.Family.Id);
                g.Categories = c;
                g.Volunteers = v;
                g.Families = f;
                db.VolunteerAndFamily.Add(g);
                db.SaveChanges();
            }
        }
        public static void RemoveVolunteerAndFamily(int id)
        {

            using (dbRamotEntities db = new dbRamotEntities())
            {
                db.VolunteerAndFamily.Remove(db.VolunteerAndFamily.Find(id));
                db.SaveChanges();
            }
        }
        public static void UpdateVolunteerAndFamily(Common.VolunteerAndFamily vaf)
        {
            VolunteerAndFamily g = Mapper.CastVolunteerAndFamily(vaf);
            using (dbRamotEntities db = new dbRamotEntities())
            {

                db.Entry<VolunteerAndFamily>(db.Set<VolunteerAndFamily>().Find(g.Id)).CurrentValues.SetValues(g);
                db.SaveChanges();
            }
        }
        public static IEnumerable<Common.VolunteerAndFamily> GetVolunteerAndFamilies()
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                List<Common.VolunteerAndFamily> vafs = new List<Common.VolunteerAndFamily>();
                foreach (var g in db.VolunteerAndFamily.ToList())
                {
                    vafs.Add(Mapper.CastVolunteerAndFamilyToComon(g));
                }
                return vafs;
            }
        }

        public static Common.VolunteerAndFamily GetVolunteerAndFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                return Mapper.CastVolunteerAndFamilyToComon(db.VolunteerAndFamily.Find(id));

            }
        }
        public static IEnumerable<Common.VolunteerAndFamily> GetVolunteerAndFamilyForVolunteer(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {
                var query = from vf in db.VolunteerAndFamily
                            where vf.Volunteers.Id == id
                            select vf;
                List<Common.VolunteerAndFamily> volunteerAction = new List<Common.VolunteerAndFamily>();
                foreach (var item in query.AsEnumerable())
                {
                    volunteerAction.Add(Mapper.CastVolunteerAndFamilyToComon(item));
                }
                return volunteerAction;
                //return Mapper.CastVolunteerAndFamilyToComon(query.First()).Family;

            }
        }

        public static IEnumerable<Common.VolunteerAndFamily> GetVolunteerAndFamilyForFamily(int id)
        {
            using (dbRamotEntities db = new dbRamotEntities())
            {//////////////////////////////////////////////////////////////
                var query = from vf in db.VolunteerAndFamily
                            where vf.Families.Id == id
                            select vf;
                List<Common.VolunteerAndFamily> volunteerAction = new List<Common.VolunteerAndFamily>();
                foreach (var item in query.AsEnumerable())
                {
                    volunteerAction.Add(Mapper.CastVolunteerAndFamilyToComon(item));
                }
                return volunteerAction;
                //return Mapper.CastVolunteerAndFamilyToComon(query.First()).Family;

            }
        }
    }
}
