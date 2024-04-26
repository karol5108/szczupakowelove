package pl.edu.wszib.ecom.Model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String img;
    private String video;
    private int colors;
    @ElementCollection
    private List<String> colorsImg;

    private double size;

    private int quantity;

    private BigDecimal price;

    private double weight;

    private String description;
    private BigDecimal lowest30price;

}
