package luxuryautos.service;

import luxuryautos.model.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CustomerService {

    Customer view(Long id) throws Exception;
    List<Customer> all() throws Exception;
    Customer save(Customer customer) throws Exception;
    boolean remove(Long id) throws Exception;
}
