package hello;

import hello.models.ProfileHasCheckedIn;
import hello.models.ProfileHasCheckedInData;
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
public class FoursquareDataController {
    public OWLOntology ontology;
    public SQWRLQueryEngine queryEngine;
    public FoursquareDataController() {
        OWLOntologyManager ontologyManager = OWLManager.createOWLOntologyManager();
        File file = new File("src\\main\\ontologies\\Foursquare.owl");
        try{
            OWLOntology ontology = ontologyManager.loadOntologyFromOntologyDocument(file);

            // Create SQWRL query engine using the SWRLAPI
            queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);
        } catch (OWLOntologyCreationException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/foursquaredata/first-swrl")
    public List<String> firstSwrl() {

        List<String> names = new ArrayList<String>();

        try {
            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("Q1", "Place(?x) ^ isRatedBy(?x, ?y) ^ isRightInMap(?y, true) -> sqwrl:select(?x)");

            // Process the SQWRL result
            while (result.next())
                names.add(result.getValue("x").toString());
//                names.add(result.getLiteral("x").getString());

        } catch (SWRLParseException e) {
            System.err.println("Error parsing SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (SQWRLException e) {
            System.err.println("Error running SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (RuntimeException e) {
            System.err.println("Error starting application: " + e.getMessage());
            System.exit(-1);
        }

        return names;
    }

    @RequestMapping("/foursquaredata/second-swrl")
    public ProfileHasCheckedIn secondSwrl() {

        ProfileHasCheckedIn profileHasCheckedIn = new ProfileHasCheckedIn();

        try {
            // Create an OWL ontology using the OWLAPI
            OWLOntologyManager ontologyManager = OWLManager.createOWLOntologyManager();
            File file = new File("src\\main\\ontologies\\Foursquare.owl");

            OWLOntology ontology = ontologyManager.loadOntologyFromOntologyDocument(file);

            // Create SQWRL query engine using the SWRLAPI
            SQWRLQueryEngine queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);

            // Create and execute a SQWRL query using the SWRLAPI
            SQWRLResult result = queryEngine.runSQWRLQuery("q2", "Profile(?p) ^ hasCheckedIn(?p, ?s) ^ Place(?s) -> sqwrl:select(?p, ?s)");

            // Process the SQWRL result
            while (result.next()){

                ProfileHasCheckedInData dataToBeAdded = new ProfileHasCheckedInData();

                System.out.println("Salary: " + result.getLiteral("s"));

                profileHasCheckedIn.data.add(dataToBeAdded);
            }

        } catch (SWRLParseException e) {
            System.err.println("Error parsing SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (SQWRLException e) {
            System.err.println("Error running SWRL rule or SQWRL query: " + e.getMessage());
            System.exit(-1);
        } catch (RuntimeException e) {
            System.err.println("Error occurred: " + e.getMessage());
            System.exit(-1);
        } catch (OWLOntologyCreationException e) {
            e.printStackTrace();
        }

        return profileHasCheckedIn;
    }
}
