package hello;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.swrlapi.factory.SWRLAPIFactory;
import org.swrlapi.parser.SWRLParseException;
import org.swrlapi.sqwrl.SQWRLQueryEngine;
import org.swrlapi.sqwrl.SQWRLResult;
import org.swrlapi.sqwrl.exceptions.SQWRLException;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@RestController
public class RedditDataController {
    OWLOntology ontology;
    SQWRLQueryEngine queryEngine;

    public RedditDataController() {
        try {
            // Create an OWL ontology using the OWLAPI
            OWLOntologyManager ontologyManager = OWLManager.createOWLOntologyManager();

            File file = new File("src\\main\\ontologies\\Reddit.owl");

            ontology = ontologyManager.loadOntologyFromOntologyDocument(file);

            // Create SQWRL query engine using the SWRLAPI
            queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);
        } catch (OWLOntologyCreationException ex) {
            ex.printStackTrace();
        }
    }

    @RequestMapping("/redditdata/get-subscribers")
    public List<String> getSubscribers() {

        List<String> names = new ArrayList<String>();

        try {
            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("q1",
                    "SubReddit(?f) ^ hasName(?f, \"Kosova\" ^^ rdf:PlainLiteral) -> sqwrl:select(?f)");

            // Process the SQWRL result
            while (result.next())
                names.add(result.getValue("f").toString());

        } catch (SWRLParseException e) {
            System.err.println("Error parsing SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (SQWRLException e) {
            System.err.println("Error running SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (RuntimeException e) {
            System.err.println("Error occurred: " + e.getMessage());
            System.exit(-1);
        }

        return names;
    }

    @RequestMapping("/redditdata/get-mutual-subscribers")
    public List<String> getMutualSubscribers() {

        List<String> names = new ArrayList<String>();

        try {

            String query = "Profile(?f) ^ hasName(?f, \"Rina\" ^^ rdf:PlainLiteral) ^ hasSubscriber(?f, ?subscriber)" +
                    "^ hasName(?subscriber, \"Armend\" ^^ rdf:PlainLiteral) ^ hasSubscriber(?subscriber, ?mutual) " +
                    "^ hasSubscriber(?mutual, ?f) -> sqwrl:select(?mutual)";

            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("q2",
                    query);


            // Process the SQWRL result
            if (result.next())
                names.add(result.getValue("x").toString());

        } catch (SWRLParseException e) {
            System.err.println("Error parsing SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (SQWRLException e) {
            System.err.println("Error running SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (RuntimeException e) {
            System.err.println("Error occurred: " + e.getMessage());
            System.exit(-1);
        }

        return names;
    }


}