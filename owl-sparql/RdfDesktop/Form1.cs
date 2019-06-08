using System;
using System.Windows.Forms;
using VDS.RDF;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Query.Datasets;
using VDS.RDF.Writing.Formatting;

namespace RdfDesktop
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            IGraph g = new Graph();
            FileLoader.Load(g, @"Ontologies/pizza.owl");
            
            //First we need an instance of the SparqlQueryParser
            SparqlQueryParser parser = new SparqlQueryParser();

            //Create a dataset for our queries to operate over
            //We need to explicitly state our default graph or the unnamed graph is used
            //Alternatively you can set the second parameter to true to use the union of all graphs
            //as the default graph
            InMemoryDataset ds = new InMemoryDataset(g);

            //Then we can parse a SPARQL string into a query
            SparqlQuery q = parser.ParseFromString(@"
            PREFIX pizza: <http://www.co-ode.org/ontologies/pizza/pizza.owl#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>

            SELECT * WHERE {
              ?topping rdfs:subClassOf pizza:PizzaTopping .
              ?topping rdfs:subClassOf ?restriction .
              ?restriction rdf:type owl:Restriction .
              ?restriction ?p ?o .
            }");

            //Get the Query processor
            ISparqlQueryProcessor processor = new LeviathanQueryProcessor(ds);

            var results = processor.ProcessQuery(q);
            if (results is IGraph resultsGraph)
            {
                //Print out the Results
                NTriplesFormatter formatter = new NTriplesFormatter();
                foreach (Triple t in resultsGraph.Triples)
                {
                    Console.WriteLine(t.ToString(formatter));
                }
                Console.WriteLine("Query took " + q.QueryExecutionTime + " milliseconds");
            }

            Console.Read();
        }
    }
}
