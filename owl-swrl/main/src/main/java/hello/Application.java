package hello;

import org.semanticweb.owlapi.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import java.io.File;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.swrlapi.core.SWRLRuleEngine;
import org.swrlapi.factory.SWRLAPIFactory;
import org.swrlapi.parser.SWRLParseException;
import org.swrlapi.sqwrl.SQWRLQueryEngine;
import org.swrlapi.sqwrl.SQWRLResult;
import org.swrlapi.sqwrl.exceptions.SQWRLException;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {

            System.out.println("Let's inspect the beans provided by Spring Boot:");

            try {
                // Create an OWL ontology using the OWLAPI
                OWLOntologyManager ontologyManager = OWLManager.createOWLOntologyManager();

                File file = new File("C:\\Users\\Armend Ukëhaxhaj\\Documents\\Workspace\\Personal\\semantic-web\\owl-swrl\\main\\src\\main\\ontologies\\pizza.owl");

                OWLOntology ontology = ontologyManager.loadOntologyFromOntologyDocument(file);

                OWLDocumentFormat format = ontologyManager.getOntologyFormat(ontology);
//                PrefixDocumentFormat prefix = format.asPrefixOWLOntologyFormat();
//                prefix.setPrefix("pizza", "<http://www.co-ode.org/ontologies/pizza/pizza.owl#>");

                // Create a SWRL rule engine using the SWRLAPI
                SWRLRuleEngine ruleEngine = SWRLAPIFactory.createSWRLRuleEngine(ontology);

                // Run the rule engine
                ruleEngine.infer();

                // Create SQWRL query engine using the SWRLAPI
                SQWRLQueryEngine queryEngine = SWRLAPIFactory.createSQWRLQueryEngine(ontology);

                // Create and execute a SQWRL query using the SWRLAPI
                SQWRLResult result = queryEngine.runSQWRLQuery("q1", "swrlb:add(?x, 2, 2) -> sqwrl:select(?x)");

                // Process the SQWRL result
                if (result.next())
                    System.out.println("x: " + result.getLiteral("x").getInteger());

            } catch (OWLOntologyCreationException e) {
                System.err.println("Error creating OWL ontology: " + e.getMessage());
                System.exit(-1);
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
        };
    }

}
