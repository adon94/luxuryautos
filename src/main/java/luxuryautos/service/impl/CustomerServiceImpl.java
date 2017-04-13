package luxuryautos.service.impl;

import luxuryautos.dao.CustomerDAO;
import luxuryautos.dao.ProductDAO;
import luxuryautos.model.Customer;
import luxuryautos.model.Product;
import luxuryautos.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerDAO customerDAO;

    @Autowired
    public CustomerServiceImpl(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    private ProductDAO productDAO;

    @Autowired
    public void setProductDAO(ProductDAO productDAO) {
        this.productDAO = productDAO;
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

    @Override
    public ResponseEntity<Customer> login(Customer customer) throws Exception {
        List<Customer> cs = customerDAO.findByEmail(customer.getEmail());
        Customer c;
        if(!cs.isEmpty()) {
            c = cs.get(0);
            if(c.getPassword().equals(customer.getPassword())){
                return new ResponseEntity<Customer>(c, HttpStatus.OK);
            } else {
                return new ResponseEntity<Customer>(customer, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<Customer>(customer, HttpStatus.NOT_FOUND);
        }
    }
}
