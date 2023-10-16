using demo.Common;
using System.ComponentModel.DataAnnotations;
using System;

namespace demo.Customers.Dto
{
    public class CreateCustomerDto
    {
        public string CodeCustomer { get; set; }
        public string NameCustomer { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }
    }
}
