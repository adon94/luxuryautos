package luxuryautos.controller;

import luxuryautos.model.Product;
import luxuryautos.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public
    @ResponseBody
    Product createProduct(@RequestBody Product product) throws Exception {

        return this.productService.create(product);
    }

    @RequestMapping(value = "/create/multiple", method = RequestMethod.POST)
    public
    @ResponseBody
    List<Product> createMultiple(@RequestBody List<Product> products) throws Exception {

        return this.productService.createMultiple(products);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getAll() throws Exception {

        return this.productService.viewAll();
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    Product getProduct(@PathVariable("id") Long id) throws Exception {

        return this.productService.view(id);
    }
}