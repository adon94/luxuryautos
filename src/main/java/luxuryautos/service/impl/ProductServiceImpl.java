package luxuryautos.service.impl;

import luxuryautos.dao.ProductDAO;
import luxuryautos.model.Product;
import luxuryautos.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductDAO productDAO;

    @Autowired
    public ProductServiceImpl(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }


    @Override
    public Product create(Product product) throws Exception {
        return productDAO.save(product);
    }

    @Override
    public List<Product> createMultiple(List<Product> products) throws Exception {

        for (Product p : products){
            int newStock = p.getStock() - 1;
            p.setStock(newStock);
        }

        return productDAO.save(products);
    }

    @Override
    public List<Product> viewAll() throws Exception {
        return productDAO.findAll();
    }

    @Override
    public Product view(Long id) throws Exception {
        return productDAO.findOne(id);
    }
}
