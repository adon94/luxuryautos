package luxuryautos.service.impl;

import luxuryautos.dao.BasketItemDAO;
import luxuryautos.model.BasketItem;
import luxuryautos.model.Customer;
import luxuryautos.service.BasketItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class PurchasedBasketItems implements BasketItemService {

    private BasketItemDAO basketItemDAO;

    @Autowired
    public void setBasketItemDAO(BasketItemDAO basketItemDAO) {
        this.basketItemDAO = basketItemDAO;
    }

    @Override
    public BasketItem view(Long id) throws Exception {
        return null;
    }

    @Override
    public List<BasketItem> findByCustomer(Customer customer) throws Exception {
        List<BasketItem> basketItems = basketItemDAO.findByCustomer(customer);

        List<BasketItem> basketItems1 = new ArrayList<>();
        for (BasketItem b : basketItems) {
            if (b.getQuantityPurchased() != 0){
                basketItems1.add(b);
            }
        }

        return basketItems1;
    }

    @Override
    public List<BasketItem> all() throws Exception {
        return null;
    }

    @Override
    public BasketItem save(BasketItem basketItem) throws Exception {
        return null;
    }

    @Override
    public ResponseEntity<List<BasketItem>> purchase(List<BasketItem> basketItem) throws Exception {
        return null;
    }

    @Override
    public boolean remove(Long id) throws Exception {
        return false;
    }
}
