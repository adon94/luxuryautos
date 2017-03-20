package luxuryautos.service.impl;

import luxuryautos.dao.CustomerDAO;
import luxuryautos.model.Customer;
import luxuryautos.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomerServiceImpl(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    public Customer view(Long id) throws Exception {
        return customerDAO.findOne(id);
    }

    @Override
    public List<Customer> all() throws Exception {
        return customerDAO.findAll();
    }

    @Override
    public Customer save(Customer customer) throws Exception {
        return customerDAO.save(customer);
    }

    @Override
    public boolean remove(Long id) throws Exception {
        customerDAO.delete(id);
        return customerDAO.exists(id);
    }
}
