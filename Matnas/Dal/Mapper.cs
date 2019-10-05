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
                dateAdded = eventt.dateAdded,
                description = eventt.description,
                Id = eventt.Id
            };
        }
        public static Event CastEventToComon(Events eventt)
        {
            return new Event()
            {
                dateAdded = eventt.dateAdded,
                description = eventt.description,
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
                Id=user.Id,
                isVolunteer=user.isVolunteer,
                Password=user.Password,
                UserName=user.UserName
            };
        } public static Common.User CastUserToComon(User user)
        {
            return new Common.User()
            {
                Id=user.Id,
                isVolunteer=user.isVolunteer,
                Password=user.Password,
                UserName=user.UserName
            };
        }
    }
}
