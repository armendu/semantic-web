package hello;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HelloController {

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/first-swrl")
    public List<String> firstSwrl(){

        List<String> someList = new ArrayList<>();
        someList.add("test");
        someList.add("test1");

        return someList;
    }


}
