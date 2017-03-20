package luxuryautos.controller;

import luxuryautos.model.Model;
import luxuryautos.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/model")
public class ModelController {

    private final ModelService modelService;

    @Autowired
    public ModelController(ModelService modelService) {
        this.modelService = modelService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public
    @ResponseBody
    Model createModel(@RequestBody Model model) throws Exception {

        return modelService.save(model);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Model> getAll() throws Exception {

        return modelService.all();
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    Model getModel(@PathVariable("id") Long id) throws Exception {

        return modelService.view(id);
    }
}
