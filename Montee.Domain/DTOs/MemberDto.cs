using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Montee.Domain.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; }
    }
}
