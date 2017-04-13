package luxuryautos.controller;

import luxuryautos.Factory.BasketItemFactory;
import luxuryautos.model.BasketItem;
import luxuryautos.model.Customer;
import luxuryautos.service.BasketItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@Controller
@RequestMapping("/basketItem")
public class BasketItemController {

    private BasketItemService basketItemService;

    private BasketItemFactory basketItemFactory;

    @Autowired
    public void setBasketItemFactory(BasketItemFactory basketItemFactory) {
        this.basketItemFactory = basketItemFactory;
    }

    @Autowired
    public void setBasketItemService(BasketItemService basketItemService) {
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

//    @RequestMapping(value = "/customer", method = RequestMethod.POST)
//    public
//    @ResponseBody
//    List<BasketItem> customer(@RequestBody Customer customer) throws Exception {
//
//        return basketItemService.findByCustomer(customer);
//    }

    @RequestMapping(value = "/all/{purchased}", method = RequestMethod.POST)
    public
    @ResponseBody
    List<BasketItem> getAll(@RequestBody Customer customer, @PathVariable boolean purchased) throws Exception {
//        BasketItemFactory basketItemFactory = new BasketItemFactory();

        BasketItemService basketItemService = basketItemFactory.getBasketItems(purchased);

        return basketItemService.findByCustomer(customer);
    }


}
