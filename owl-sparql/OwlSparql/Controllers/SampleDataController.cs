using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Query.Datasets;

namespace OwlSparql.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<string> FirstSparql()
        {
            IGraph g = new Graph();
            FileLoader.Load(g, @"Ontologies/pizza.owl");

            //First we need an instance of the SparqlQueryParser
            SparqlQueryParser parser = new SparqlQueryParser();

            //Then we can parse a SPARQL string into a query
            SparqlQuery q = parser.ParseFromString(@"
            PREFIX pizza: <http://www.co-ode.org/ontologies/pizza/pizza.owl#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>

            SELECT DISTINCT ?s WHERE {
              ?s rdfs:subClassOf ?restriction .
              ?restriction owl:onProperty pizza:hasSpiciness .
              ?restriction owl:someValuesFrom pizza:Hot .
            }");

            //Create a dataset for our queries to operate over
            //We need to explicitly state our default graph or the unnamed graph is used
            //Alternatively you can set the second parameter to true to use the union of all graphs
            //as the default graph
            InMemoryDataset ds = new InMemoryDataset(g);

            //Get the Query processor
            ISparqlQueryProcessor processor = new ExplainQueryProcessor(ds);

            List<string> toReturn = new List<string>();

            //Use the SparqlQueryParser to give us a SparqlQuery object
            //Should get a Graph back from a CONSTRUCT query
            Object results = processor.ProcessQuery(q);
            if (results is SparqlResultSet resultSet)
            {
                foreach (SparqlResult result in resultSet.Results)
                {
                    //Do what you want with each result
                    toReturn.Add(result.ToString());
                }
            }

            return toReturn;
        }
    }
}