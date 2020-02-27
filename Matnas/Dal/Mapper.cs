using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Dal
{
    public static class Mapper
    {
        public static Families CastFamily(Family family)
        {
            return new Families()
            {
                Id = family.Id,
                FirstNameFather = family.FirstNameFather,
                FirstNameMother = family.FirstNameMother,
                Address = family.Address,
                LastName = family.LastName,
                NumChildren = family.NumChildren,
                PelephoneFather = family.PelephoneFather,
                PelephoneMother = family.PelephoneMother,
                Reason = family.Reason,
                Reference = family.Reference,
                Status = family.Status,
                Telephone = family.Telephone
            };

        }

        internal static VolunteerAndEvent CastVolunteerAndEvent(Common.VolunteerAndEvent vae)
        {
           return new VolunteerAndEvent()
           {
               Id=vae.Id,
               Categories =CastCategory( vae.Category),
               Events =CastEvent( vae.Event),
               Volunteers =CastVolunteer (vae.Volunteer),
               Comments = vae.Comments,
               dateAdded =vae.DateAdded
           };
        }

        internal static OrganizationAndFamily CastOrganizationAndFamily(Common.OrganizationAndFamily oaf)
        {
            return new OrganizationAndFamily()
            {
                Id = oaf.Id,
                Categories = CastCategory(oaf.Category),
                Families = CastFamily(oaf.Family),
                Organization = CastOrganization(oaf.Organization),
                Comments = oaf.Comments,
                dateAdded = oaf.DateAdded
            };
        }

        internal static VolunteerAndFamily CastVolunteerAndFamily(Common.VolunteerAndFamily vaf)
        {
            return new VolunteerAndFamily()
            {
                Id = vaf.Id,
                Categories =Mapper.CastCategory( vaf.Category),
                Families = Mapper.CastFamily(vaf.Family),
                Volunteers = Mapper.CastVolunteer(vaf.Volunteer),
                Comments = vaf.Comments,
                dateAdded = vaf.DateAdded
            };
        }

        internal static Organization CastOrganization(Common.Organization organization)
        {
            return new Organization()
            {
                Id = organization.Id,
                Name = organization.Name,
                Address = organization.Address,
                email = organization.email,
                Comments = organization.Comments,
                Contact = organization.Contact,
                Phone = organization.Phone
            };
        }

        internal static Common.Organization CastOrganizationToComon(Organization organization)
        {
            return new Common.Organization()
            {
                Id = organization.Id,
                Name = organization.Name,
                Address = organization.Address,
                email = organization.email,
                Comments = organization.Comments,
                Contact = organization.Contact,
                Phone = organization.Phone
            };
        }

        internal static Common.VolunteerAndEvent CastVolunteerAndEventToComon(VolunteerAndEvent vae)
        {
            return new Common.VolunteerAndEvent()
            {
                Id = vae.Id,
                Category = CastCategoryToCommon(vae.Categories),
                Event = CastEventToComon(vae.Events),
                Volunteer = CastVolunteerToComon(vae.Volunteers),
                Comments = vae.Comments,
                DateAdded = vae.dateAdded
            }; 
        }

        internal static Common.OrganizationAndFamily CastOrganizationAndFamilyToComon(OrganizationAndFamily oaf)
        {
            return new Common.OrganizationAndFamily()
            {
                Id= oaf.Id,
                Category =CastCategoryToCommon (oaf.Categories),
                Family =CastFamilyToComon( oaf.Families),
                Organization =CastOrganizationToComon( oaf.Organization),
                Comments =oaf.Comments,
                DateAdded= oaf.dateAdded
            };
        }

        internal static Common.VolunteerAndFamily CastVolunteerAndFamilyToComon(VolunteerAndFamily vaf)
        {
            return new Common.VolunteerAndFamily()
            {
                Id = vaf.Id,
                Category = Mapper.CastCategoryToCommon(vaf.Categories),
                Family = Mapper.CastFamilyToComon(vaf.Families),
                Volunteer = Mapper.CastVolunteerToComon(vaf.Volunteers),
                Comments = vaf.Comments,
                DateAdded = vaf.dateAdded
            }; 
        }

        public static Family CastFamilyToComon(Families family)
        {
            return new Family()
            {
                Id = family.Id,
                FirstNameFather = family.FirstNameFather,
                FirstNameMother = family.FirstNameMother,
                Address = family.Address,
                LastName = family.LastName,
                NumChildren = family.NumChildren,
                PelephoneFather = family.PelephoneFather,
                PelephoneMother = family.PelephoneMother,
                Reason = family.Reason,
                Reference = family.Reference,
                Status = family.Status,
                Telephone = family.Telephone
            };

        }

        public static Categories CastCategory(Category category)
        {
            return new Categories
            {
                Id = category.Id,
                Name = category.Name
            };
        }
        public static Category CastCategoryToCommon(Categories category)
        {
            return new Category
            {
                Id = category.Id,
                Name = category.Name
            };
        }
        public static Group CastGroupToComon(Groups group)
        {
            return new Group()
            {
                Id = group.Id,
                Address = group.Address,
                Comments = group.Comments,
                Contact = group.Contact,
                email = group.email,
                Name = group.Name,
                Phone = group.Phone
            };
        }
        public static Events CastEvent(Event eventt)
        {
            return new Events()
            {
                dateAdded = eventt.DateAdded,
                description = eventt.Description,
                Id = eventt.Id
            };
        }
        public static Event CastEventToComon(Events eventt)
        {
            return new Event()
            {
                DateAdded = eventt.dateAdded,
                Description = eventt.description,
                Id = eventt.Id
            };
        }
        public static Volunteers CastVolunteer(Volunteer volunteer)
        {
            return new Volunteers()
            {
                Id = volunteer.Id,
                Address = volunteer.Address,
                Age = volunteer.Age,
                Comments = volunteer.Comments,
                Email = volunteer.Email,
                IsActive = volunteer.IsActive,
                Name = volunteer.Name,
                Pelephone = volunteer.Pelephone,
                Telephone = volunteer.Telephone

            };
        }
        public static Volunteer CastVolunteerToComon(Volunteers volunteer)
        {
            return new Volunteer()
            {
                Id = volunteer.Id,
                Address = volunteer.Address,
                Age = volunteer.Age,
                Comments = volunteer.Comments,
                Email = volunteer.Email,
                IsActive = volunteer.IsActive,
                Name = volunteer.Name,
                Pelephone = volunteer.Pelephone,
                Telephone = volunteer.Telephone

            };
        }
        public static Groups CastGroup(Group group)
        {
            return new Groups()
            {
                Id = group.Id,
                Address = group.Address,
                Comments = group.Comments,
                Contact = group.Contact,
                email = group.email,
                Name = group.Name,
                Phone = group.Phone
            };
        }
        public static User CastUser(Common.User user)
        {
            return new User()
            {
                Id = user.Id,
                isVolunteer = user.isVolunteer,
                Password = user.Password,
                UserName = user.UserName
            };
        }
        public static Common.User CastUserToComon(User user)
        {
            return new Common.User()
            {
                Id = user.Id,
                isVolunteer = user.isVolunteer,
                Password = user.Password,
                UserName = user.UserName
            };
        }
    }
}
