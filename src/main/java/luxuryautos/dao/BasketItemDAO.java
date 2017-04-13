package luxuryautos.dao;

import luxuryautos.model.BasketItem;
import luxuryautos.model.Customer;
import luxuryautos.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface BasketItemDAO extends JpaRepository<BasketItem, Long> {

    List<BasketItem> findByCustomer(Customer customer);
    List<BasketItem> findByProduct(Product product);
}
