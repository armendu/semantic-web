package hello;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLDocumentFormat;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.swrlapi.core.SWRLRuleEngine;
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

    public RedditDataController() {

        // Create an OWL ontology using the OWLAPI
        OWLOntologyManager ontologyManager = OWLManager.createOWLOntologyManager();

        try {
            File file = new File("src/main/ontologies/Reddit.owl");

            ontology = ontologyManager.loadOntologyFromOntologyDocument(file);

            OWLDocumentFormat format = ontologyManager.getOntologyFormat(ontology);
//                PrefixDocumentFormat prefix = format.asPrefixOWLOntologyFormat();
//                prefix.setPrefix("pizza", "<http://www.co-ode.org/ontologies/pizza/pizza.owl#>");

            // Create a SWRL rule engine using the SWRLAPI
            SWRLRuleEngine ruleEngine = SWRLAPIFactory.createSWRLRuleEngine(ontology);

            // Run the rule engine
            ruleEngine.infer();

        } catch (OWLOntologyCreationException e) {
            System.err.println("Error creating OWL ontology: " + e.getMessage());
            System.exit(-1);
        } catch (RuntimeException e) {
            System.err.println("Error starting application: " + e.getMessage());
            System.exit(-1);
        }
    }

    @RequestMapping("/redditdata/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/redditdata/first-swrl")
    public List<String> firstSwrl() {

        List<String> names = new ArrayList<String>();

        try {
            // Create SQWRL query engine using the SWRLAPI
            SQWRLQueryEngine queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);

            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("q1", "");

            System.out.println("x: " + result.getLiteral("x"));

            // Process the SQWRL result
            if (result.next())
                System.out.println("x: " + result.getLiteral("x"));
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

    @RequestMapping("/redditdata/get-subscribers")
    public List<String> getSubscribers() {

        List<String> names = new ArrayList<String>();

        try {
            // Create SQWRL query engine using the SWRLAPI
            SQWRLQueryEngine queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);

            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("q1",
                    "SubReddit(?f) ^ hasName(?f, \"Kosova EU Qualification\") ^ hasSubscriber(?f, ?subscriber) ^ hasName(?subscriber, ?names) -> sqwrl:select(?names)");

            System.out.println("f: " + result.getLiteral("names"));

            // Process the SQWRL result
            if (result.next())
                System.out.println("x: " + result.getLiteral("names"));
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
            // Create SQWRL query engine using the SWRLAPI
            SQWRLQueryEngine queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);


            String query = "Profile(?f) ^ hasName(?f, \"Rina\") ^ hasSubscriber(?f, ?subscriber)" +
                    "^ hasName(?subscriber, \"Armend\") ^ hasSubscriber(?subscriber, ?mutual) " +
                    "^ hasSubscriber(?mutual, ?f) -> sqwrl:select(?mutual)";

            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("q1",
                    query);

            System.out.println("x: " + result.getLiteral("x"));

            // Process the SQWRL result
            if (result.next())
                System.out.println("x: " + result.getLiteral("x"));
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
