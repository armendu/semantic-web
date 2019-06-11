using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OwlSparql.DTOs;
using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Query.Datasets;

namespace OwlSparql.Controllers
{
    [Route("api/[controller]")]
    public class RedditDataController : Controller
    {
        private readonly IGraph _redditGraph;
        
        private readonly SparqlQueryParser _parser;

        public RedditDataController()
        {
            _redditGraph = new Graph();   
            FileLoader.Load(_redditGraph, @"Ontologies/pizza.owl");

            //First we need an instance of the SparqlQueryParser
            _parser = new SparqlQueryParser(); 
        }

        [HttpGet("[action]")]
        public RecentPosts GetTopTenRecentPosts()
        {
            //Then we can parse a SPARQL string into a query
            SparqlQuery query = _parser.ParseFromString(@"
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX reddit: <http://www.semanticweb.org/armendukëhaxhaj/ontologies/2019/4/reddit#>
            SELECT ?post ?title ?date
            WHERE { 
              ?post rdf:type reddit:Post .
              ?post reddit:hasName ?title .
              ?post reddit:hasDateCreated ?date }
            ORDER BY DESC(?date)
            LIMIT 10");

            InMemoryDataset ds = new InMemoryDataset(_redditGraph);

            //Get the Query processor
            ISparqlQueryProcessor processor = new ExplainQueryProcessor(ds);

            RecentPosts dto = new RecentPosts
            {
                Data = new List<RecentPostsData>()
            };

            Object results = processor.ProcessQuery(query);

            if (results is SparqlResultSet resultSet)
            {
                foreach (SparqlResult result in resultSet.Results)
                {
                    string post = result.TryGetValue( "post", out var node) ? ((IUriNode)node).Uri.Fragment.Replace('#', ' ') : string.Empty;
                    string title = result.TryGetValue( "title", out var titleNode) ? ((IUriNode)titleNode).Uri.Fragment.Replace('#', ' ') : string.Empty;
                    string date = result.TryGetValue( "title", out var dateNode) ? ((IUriNode)dateNode).Uri.Fragment.Replace('#', ' ') : string.Empty;

                    dto.Data.Add(new RecentPostsData
                    {
                        Post = post,
                        Title = title,
                        Date = date
                    });
                }
            }

            return dto;
        }
    }
}