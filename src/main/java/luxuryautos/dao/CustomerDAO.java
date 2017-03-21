package luxuryautos.dao;

import luxuryautos.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface CustomerDAO extends JpaRepository<Customer, Long> {
    List<Customer> findByEmail(String email);
}
