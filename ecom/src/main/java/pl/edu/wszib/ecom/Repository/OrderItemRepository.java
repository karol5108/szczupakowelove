package pl.edu.wszib.ecom.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.wszib.ecom.Model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
