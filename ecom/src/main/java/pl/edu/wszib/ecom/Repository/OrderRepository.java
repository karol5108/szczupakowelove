package pl.edu.wszib.ecom.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.wszib.ecom.Model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
