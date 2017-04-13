package luxuryautos.service;

import luxuryautos.model.BasketItem;
import luxuryautos.model.Customer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BasketItemService {

    BasketItem view(Long id) throws Exception;
    List<BasketItem> findByCustomer(Customer customer) throws Exception;
    List<BasketItem> all() throws Exception;
    BasketItem save(BasketItem basketItem) throws Exception;
    ResponseEntity<List<BasketItem>> purchase(List<BasketItem> basketItem) throws Exception;
    boolean remove(Long id) throws Exception;
}
