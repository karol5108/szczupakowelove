package pl.edu.wszib.ecom.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.edu.wszib.ecom.Exception.ResourceNotFound;
import pl.edu.wszib.ecom.Model.Order;
import pl.edu.wszib.ecom.Model.OrderItem;
import pl.edu.wszib.ecom.Model.Product;
import pl.edu.wszib.ecom.Model.User;
import pl.edu.wszib.ecom.Repository.OrderItemRepository;
import pl.edu.wszib.ecom.Repository.OrderRepository;
import pl.edu.wszib.ecom.Repository.ProductRepository;
import pl.edu.wszib.ecom.Repository.UserRepository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/orders")

public class OrderController {
    private BigDecimal calculateOrderValue(Set<OrderItem> orderItems) {
        BigDecimal orderValue = orderItems.stream().
                map(OrderItem::getProductValue).
                reduce(BigDecimal.ZERO, BigDecimal::add);
        return orderValue;
    }
    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private UserRepository userRepo;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {return orderRepo.findAll();}

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable long id) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new ResourceNotFound("ID not found in db " + id));
        orderRepo.delete(order);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable long id){
        Order order = orderRepo.findById(id).orElseThrow(() -> new ResourceNotFound("ID not found in db " + id));
        return ResponseEntity.ok(order);
    }
    @PostMapping("/new-order/{id}/{quantity}/{color}")
    public ResponseEntity<Order> newOrder(@PathVariable long id, @PathVariable int quantity, @PathVariable String color){
        Product product = productRepo.findById(id).orElseThrow(()-> new ResourceNotFound("ID not found in db "+ id));

        OrderItem item = new OrderItem();
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setColor(color);
        item.setProductValue(product.getPrice().multiply(BigDecimal.valueOf(quantity)));

        Set<OrderItem> orderItems = new HashSet<>();
        orderItems.add(item);

        Order order = new Order();
        order.setCreateDate(Instant.now());
        order.setModifyDate(Instant.now());
        order.setLines(orderItems);
        order.setOrderValue(product.getPrice().multiply(BigDecimal.valueOf(quantity)));

        orderRepo.save(order);

        return ResponseEntity.ok(order);

    }
    @PostMapping("/new-order/{id}/{quantity}/{color}/{userId}")
    public ResponseEntity<Order> newOrderAuthorizedUser(@PathVariable long id, @PathVariable int quantity, @PathVariable String color, @PathVariable Long userId){
        Product product = productRepo.findById(id).orElseThrow(()-> new ResourceNotFound("Product not found in db with id:  "+ id));
        User authorizedUser = userRepo.findById(userId).orElseThrow(()-> new ResourceNotFound("User not found in db with id:  "+ id));

        OrderItem item = new OrderItem();
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setColor(color);
        item.setProductValue(product.getPrice().multiply(BigDecimal.valueOf(quantity)));

        Set<OrderItem> orderItems = new HashSet<>();
        orderItems.add(item);

        Order order = new Order();
        order.setCreateDate(Instant.now());
        order.setModifyDate(Instant.now());
        order.setLines(orderItems);
        order.setOrderValue(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
        order.setUser(authorizedUser);
        order.setStatus("W TRAKCIE");

        orderRepo.save(order);

        return ResponseEntity.ok(order);

    }

    @PostMapping("/add-to-exist/{id}/{quantity}/{color}/{orderId}")
    public ResponseEntity<Order> newOrder(@PathVariable long id, @PathVariable int quantity, @PathVariable String color, @PathVariable Long orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new ResourceNotFound("order not found " + orderId));

        Product product = productRepo.findById(id).orElseThrow(() -> new ResourceNotFound("product not found " + id));

        // CZY W KOSZYKU
        OrderItem existingItem = null;
        for (OrderItem item : order.getLines()) {
            if (item.getProduct().getId() == id && item.getColor().equals(color)) {
                existingItem = item;
                break;
            }
        }

        if (existingItem != null) {
            // JESLI W KOSZYKU INKREMENTUJ
            int newQuantity = existingItem.getQuantity() + quantity;
            existingItem.setQuantity(newQuantity);
            existingItem.setProductValue(existingItem.getProductValue().add(existingItem.getProduct().getPrice()));
        } else {

            OrderItem newItem = new OrderItem();
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setProductValue(product.getPrice());
            newItem.setColor(color);
            order.getLines().add(newItem);
        }
        order.setOrderValue(calculateOrderValue(order.getLines()));
        order.setModifyDate(Instant.now());

        orderRepo.save(order);

        return ResponseEntity.ok(order);

    }


}
