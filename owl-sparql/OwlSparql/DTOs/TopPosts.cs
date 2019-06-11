using System.Collections.Generic;

namespace OwlSparql.DTOs
{
    public class TopPosts
    {
        public List<TopPostsData> Data;
    }

    public class TopPostsData
    {
        public string Post { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Votes { get; set; }
    }
}