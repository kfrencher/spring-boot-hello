package hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @RequestMapping("/users")
    public Map<String, Object> index(@RequestParam String query) throws InterruptedException {
        String transformedQuery = query.toLowerCase();
        List<Map> users = Arrays.asList(
                createUser("frenken", "Kenneth Frencher"),
                createUser("whigdon", "Donte Whiggam"),
                createUser("faucette", "Arrey Faucette")
        );

        List<Map> filteredUsers = users.stream()
                .filter(user -> user.get("username").toString().toLowerCase().contains(transformedQuery)
                        || user.get("display").toString().toLowerCase().contains(transformedQuery)).collect(Collectors.toList());

        Map<String, Object> data = new HashMap<>();
        data.put("users", filteredUsers);
        Thread.sleep(2000);
        return data;
    }

    private Map createUser(String username, String display){
        Map<String,String> user = new HashMap<>();
        user.put("username", username);
        user.put("display", display);
        return user;
    }
}
