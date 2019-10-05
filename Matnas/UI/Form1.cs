using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Bll;
using Common;

namespace UI
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Family family = new Family()
            {
                Id = (int)ID.Value,
                FirstNameFather = firstNameF.Text,
                FirstNameMother = firstNameM.Text,
                LastName = lastName.Text,
                Address = address.Text,
                NumChildren = (int)numKids.Value,
                PelephoneFather = pelF.Text,
                PelephoneMother = pelM.Text,
                Telephone = telephone.Text,
                Reason = resean.Text,
                Reference = referens.Text,
                Status = status.Text
            };
            FamilyManager.AddFamily(family);
        }

        private void Button2_Click(object sender, EventArgs e)
        {
            EventManager.AddEvent(new Event() { Id = 8, dateAdded = DateTime.Now, description = "dfggfdghd" });
            EventManager.UpdateEvent(new Event() { Id =8, dateAdded = DateTime.Now, description = "new des" });
        }

        private void Button3_Click(object sender, EventArgs e)
        {
            foreach (var item in GroupManager.GetGroups())
            {
               listView1.Items.Add(item.ToString());
            }
           
        }
    }
}
