package luxuryautos.service;

import luxuryautos.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {

    Product create(Product product) throws Exception;
    List<Product> viewAll() throws Exception;
    Product view(Long id) throws Exception;
}
