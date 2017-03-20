package luxuryautos.controller;

import luxuryautos.model.Make;
import luxuryautos.service.MakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/make")
public class MakeController {
    
    private final MakeService makeService;

    @Autowired
    public MakeController(MakeService makeService) {
        this.makeService = makeService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public
    @ResponseBody
    Make createMake(@RequestBody Make make) throws Exception {

        return makeService.save(make);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Make> getAll() throws Exception {

        return makeService.all();
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    Make getMake(@PathVariable("id") Long id) throws Exception {

        return makeService.view(id);
    }
}
