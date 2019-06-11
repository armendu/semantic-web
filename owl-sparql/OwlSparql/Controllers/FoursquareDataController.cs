using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OwlSparql.DTOs;
using VDS.RDF;
using VDS.RDF.Nodes;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Query.Datasets;

namespace OwlSparql.Controllers
{
    [Route("api/[controller]")]
    public class FoursquareDataController : Controller
    {
        private readonly IGraph _foursquareGraph;
        private readonly SparqlQueryParser _parser;

        public FoursquareDataController()
        {
            _foursquareGraph = new Graph();

            FileLoader.Load(_foursquareGraph, @"Ontologies/Foursquare.owl");

            //First we need an instance of the SparqlQueryParser
            _parser = new SparqlQueryParser();
        }

        [HttpGet("[action]")]
        public CoffeeAndTea GetPlacesThatServeBreakfastAndTea()
        {
            //Then we can parse a SPARQL string into a query
            SparqlQuery query = _parser.ParseFromString(@"
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX foursquare: <http://www.semanticweb.org/hekurankastrati/ontologies/2019/5/foursquare#>
            SELECT ?place ?address
            WHERE {
              ?place foursquare:hasInfo ?info .
              ?info foursquare:hasAddress ?address
              { ?place rdf:type foursquare:BreakFast }
              UNION
              { ?place rdf:type foursquare:CoffeAndTea }
            }");

            //Create a dataset for our queries to operate over
            //We need to explicitly state our default graph or the unnamed graph is used
            //Alternatively you can set the second parameter to true to use the union of all graphs
            //as the default graph
            InMemoryDataset ds = new InMemoryDataset(_foursquareGraph);

            //Get the Query processor
            ISparqlQueryProcessor processor = new ExplainQueryProcessor(ds);

            CoffeeAndTea dto = new CoffeeAndTea
            {
                Data = new List<Data>()
            };
            //Use the SparqlQueryParser to give us a SparqlQuery object
            //Should get a Graph back from a CONSTRUCT query
            Object results = processor.ProcessQuery(query);

            if (results is SparqlResultSet resultSet)
            {
                foreach (SparqlResult result in resultSet.Results)
                {
                    string addressData = result.TryGetValue("address", out var node)
                        ? ((IUriNode) node).Uri.Fragment.Replace('#', ' ')
                        : string.Empty;
                    string placeData = result.TryGetValue("place", out var placeNode)
                        ? ((IUriNode) placeNode).Uri.Fragment.Replace('#', ' ')
                        : string.Empty;

                    dto.Data.Add(new Data
                    {
                        Address = addressData,
                        Place = placeData
                    });
                }

//                dto.Data.Add(new Data
//                {
//                    Address = "test",
//                    Place = "asda"
//                });
            }

            return dto;
        }

        [HttpGet("[action]")]
        public List<string> GetPlacesWithSocialMedia()
        {
            //Then we can parse a SPARQL string into a query
            SparqlQuery query = _parser.ParseFromString(@"
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX foursquare: <http://www.semanticweb.org/hekurankastrati/ontologies/2019/5/foursquare#>
            SELECT ?socialmedia
            WHERE {
              { ?socialmedia rdf:type foursquare:Facebook }
              UNION
              { ?socialmedia rdf:type foursquare:Instagram}
            }");

            InMemoryDataset ds = new InMemoryDataset(_foursquareGraph);

            //Get the Query processor
            ISparqlQueryProcessor processor = new ExplainQueryProcessor(ds);

            List<string> places = new List<string>();

            Object results = processor.ProcessQuery(query);

            if (results is SparqlResultSet resultSet)
            {
                foreach (SparqlResult result in resultSet.Results)
                {
                    string place = result.TryGetValue("socialmedia", out var node)
                        ? ((IUriNode) node).Uri.Fragment.Replace('#', ' ')
                        : string.Empty;

                    places.Add(place);
                }
            }

            return places;
        }

        [HttpGet("[action]/place={inputPlace}")]
        public PlacesAndLikes GetAllLikesForDinnerPlace(string inputPlace)
        {
            //Then we can parse a SPARQL string into a query
            SparqlQuery query = _parser.ParseFromString(@"
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX foursquare: <http://www.semanticweb.org/hekurankastrati/ontologies/2019/5/foursquare#>
            SELECT ?place (COUNT(?profile) as ?likes)
            WHERE {
            ?place rdf:type foursquare:" + inputPlace + @" .
            ?profile rdf:type foursquare:Profile .
            ?profile foursquare:hasLikedPlace ?place .
            }
            GROUP BY ?place");

            InMemoryDataset ds = new InMemoryDataset(_foursquareGraph);

            //Get the Query processor
            ISparqlQueryProcessor processor = new ExplainQueryProcessor(ds);

            PlacesAndLikes dto = new PlacesAndLikes
            {
                Data = new List<PlacesAndLikesData>()
            };

            Object results = processor.ProcessQuery(query);

            if (results is SparqlResultSet resultSet)
            {
                foreach (SparqlResult result in resultSet.Results)
                {
                    string place = result.TryGetValue("place", out var node)
                        ? ((IUriNode) node).Uri.Fragment.Replace('#', ' ')
                        : string.Empty;
                    string likes = result.TryGetValue("likes", out var likeNode)
                        ? ((LongNode) likeNode).Value
                        : string.Empty;

                    dto.Data.Add(new PlacesAndLikesData
                    {
                        Place = place,
                        Likes = likes
                    });
                }
            }

            return dto;
        }
    }
}