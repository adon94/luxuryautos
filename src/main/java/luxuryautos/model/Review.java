package luxuryautos.model;

import javax.persistence.*;

@Entity
@Table(name = "REVIEW")
public class Review extends AbstractEntity {

    private int rating;

    @Lob
    private String description;

    @ManyToOne
    private Customer customer;

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
