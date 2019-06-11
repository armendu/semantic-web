using System.Collections.Generic;

namespace OwlSparql.DTOs
{
    public class RecentPosts
    {
        public List<RecentPostsData> Data;
    }

    public class RecentPostsData
    {
        public string Post { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
    }
}