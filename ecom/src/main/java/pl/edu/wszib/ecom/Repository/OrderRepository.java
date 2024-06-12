package pl.edu.wszib.ecom.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.wszib.ecom.Model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
