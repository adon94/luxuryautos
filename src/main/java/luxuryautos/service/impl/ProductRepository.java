package luxuryautos.service.impl;

import luxuryautos.dao.ProductDAO;
import luxuryautos.model.Product;
import luxuryautos.service.Container;
import luxuryautos.service.Iterator;
import java.util.List;

public class ProductRepository implements Container {

    private ProductDAO productDAO;

    private List<Product> products = productDAO.findAll();

    @Override
    public Iterator getIterator() {
        return new ProductIterator();
    }

    private class ProductIterator implements Iterator {

        int index;

        @Override
        public boolean hasNext() {

            if(index < products.size()){
                return true;
            }
            return false;
        }

        @Override
        public Object next() {

            if(this.hasNext()){
                return products.get(index++);
            }
            return null;
        }
    }
}
