package pl.edu.wszib.ecom.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; // Identyfikator typu Long lub innego odpowiedniego typu

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // Relacja do Product - każdy OrderItem jest powiązany z jednym Produktem

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private BigDecimal productValue;
}
