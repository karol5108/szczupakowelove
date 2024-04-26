package pl.edu.wszib.ecom.Repository;

import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.wszib.ecom.Model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsProductByNameAndSize(String name, double size);
    Product findByNameAndSize(String name, double size);



    List<Product> findByType(String type);
}
