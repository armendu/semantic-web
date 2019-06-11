using System.Collections.Generic;

namespace OwlSparql.DTOs
{
    public class PlacesAndLikes
    {
        public List<PlacesAndLikesData> Data;
    }

    public class PlacesAndLikesData
    {
        public string Place { get; set; }
        public string Likes { get; set; }
    }
}