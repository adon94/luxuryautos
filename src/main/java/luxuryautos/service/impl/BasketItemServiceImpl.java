package luxuryautos.service.impl;

import luxuryautos.dao.BasketItemDAO;
import luxuryautos.dao.ProductDAO;
import luxuryautos.model.BasketItem;
import luxuryautos.model.Customer;
import luxuryautos.model.Product;
import luxuryautos.service.BasketItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BasketItemServiceImpl implements BasketItemService {

    private final BasketItemDAO basketItemDAO;

    @Autowired
    public BasketItemServiceImpl(BasketItemDAO basketItemDAO) {
        this.basketItemDAO = basketItemDAO;
    }

    private ProductDAO productDAO;

    @Autowired
    public void setProductDAO(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @Override
    public BasketItem view(Long id) throws Exception {
        return null;
    }

    @Override
    public List<BasketItem> findByCustomer(Customer customer) throws Exception {
        return basketItemDAO.findByCustomer(customer);
    }

    @Override
    public List<BasketItem> all() throws Exception {
        return basketItemDAO.findAll();
    }

    @Override
    public BasketItem save(BasketItem basketItem) throws Exception {

        List<BasketItem> basketItems = basketItemDAO.findByProduct(basketItem.getProduct());

        if(basketItems.isEmpty()) {
            if(basketItem.getQuantity() == 0) {
                basketItem.setQuantity(1);
            }
            return basketItemDAO.save(basketItem);
        } else {
            BasketItem b = basketItems.get(0);
            b.setQuantity(b.getQuantity() + basketItem.getQuantity());
            return basketItemDAO.save(b);
        }
    }

    @Override
    public ResponseEntity<List<BasketItem>> purchase(List<BasketItem> basketItems) throws Exception {
        List<Product> productUpdates = new ArrayList<>();
        List<BasketItem> rejectedItems = new ArrayList<>();

        for (BasketItem basketItem : basketItems) {

            int currentStock = basketItem.getProduct().getStock();
            int newStock = currentStock - basketItem.getQuantity();
            if (newStock >= 0) {
                basketItem.getProduct().setStock(newStock);
                productUpdates.add(basketItem.getProduct());

                basketItem.setQuantityPurchased(basketItem.getQuantity() + basketItem.getQuantityPurchased());
                basketItem.setQuantity(0);
            } else {
                rejectedItems.add(basketItem);
            }
        }

        if (rejectedItems.isEmpty()) {
            productDAO.save(productUpdates);

            return new ResponseEntity<List<BasketItem>>(basketItemDAO.save(basketItems), HttpStatus.OK);
        } else {
            return new ResponseEntity<List<BasketItem>>(rejectedItems, HttpStatus.CONFLICT);
        }
    }

    @Override
    public boolean remove(Long id) throws Exception {
        return false;
    }
}