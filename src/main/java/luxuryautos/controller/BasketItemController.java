package luxuryautos.controller;

import luxuryautos.model.BasketItem;
import luxuryautos.model.Customer;
import luxuryautos.service.BasketItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/basketItem")
public class BasketItemController {

    private final BasketItemService basketItemService;

    @Autowired
    public BasketItemController(BasketItemService basketItemService) {
        this.basketItemService = basketItemService;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public
    @ResponseBody
    BasketItem createBasketItem(@RequestBody BasketItem basketItem) throws Exception {

        return basketItemService.save(basketItem);
    }

    @RequestMapping(value = "/purchase", method = RequestMethod.POST)
    public
    @ResponseBody
    ResponseEntity<List<BasketItem>> purchase(@RequestBody List<BasketItem> basketItem) throws Exception {

        return basketItemService.purchase(basketItem);
    }

    @RequestMapping(value = "/customer", method = RequestMethod.POST)
    public
    @ResponseBody
    List<BasketItem> customer(@RequestBody Customer customer) throws Exception {

        return basketItemService.findByCustomer(customer);
    }
}
