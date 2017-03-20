package luxuryautos.dao;

import luxuryautos.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface ProductDAO extends JpaRepository<Product, Long> {

}
