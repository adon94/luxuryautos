package luxuryautos.controller;

import luxuryautos.model.Customer;
import luxuryautos.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/customer")
public class CustomerController {
    
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public
    @ResponseBody
    Customer createCustomer(@RequestBody Customer customer) throws Exception {

        return customerService.save(customer);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Customer> getAll() throws Exception {

        return customerService.all();
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    Customer getCustomer(@PathVariable("id") Long id) throws Exception {

        return customerService.view(id);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<Customer> login(@RequestBody Customer customer) throws Exception {

        return customerService.login(customer);
    }
}
