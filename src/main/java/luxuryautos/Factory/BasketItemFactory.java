package luxuryautos.Factory;

import luxuryautos.service.BasketItemService;
import luxuryautos.service.impl.BasketItemServiceImpl;
import luxuryautos.service.impl.PurchasedBasketItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasketItemFactory {

    private PurchasedBasketItems purchasedBasketItems;

    private BasketItemServiceImpl basketItemServiceImpl;

    @Autowired
    public void setBasketItemServiceImpl(BasketItemServiceImpl basketItemServiceImpl) {
        this.basketItemServiceImpl = basketItemServiceImpl;
    }

    @Autowired
    public void setPurchasedBasketItems(PurchasedBasketItems purchasedBasketItems) {
        this.purchasedBasketItems = purchasedBasketItems;
    }

    public BasketItemService getBasketItems(boolean purchased) {
        if (purchased) {
            return purchasedBasketItems;
        } else {
            return basketItemServiceImpl;
        }
    }
}
