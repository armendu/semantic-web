using System.Collections.Generic;

namespace OwlSparql.DTOs
{
    public class CoffeeAndTea
    {
        public List<Data> Data;
    }

    public class Data
    {
        public string Address { get; set; }
        public string Place { get; set; }
    }
}