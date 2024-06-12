package pl.edu.wszib.ecom.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.wszib.ecom.Configuration.JwtProvider;
import pl.edu.wszib.ecom.Exception.ResourceNotFound;
import pl.edu.wszib.ecom.Model.Address;
import pl.edu.wszib.ecom.Model.Order;
import pl.edu.wszib.ecom.Model.User;
import pl.edu.wszib.ecom.Repository.AddressRepository;
import pl.edu.wszib.ecom.Repository.OrderRepository;
import pl.edu.wszib.ecom.Repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderRepository orderRepository;




    @PutMapping("/new-address/{userId}")
    public ResponseEntity<User> addAddress(@RequestBody Address address, @PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFound("User not found in db with id:  " + userId));

        address.setUser(user);
        if (user.getAddresses() == null) {
            List<Address> newAddress = new ArrayList<>();
            newAddress.add(address);
            user.setAddresses(newAddress);
        } else {
            user.getAddresses().add(address);
        }
        if (user != null) {
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/addresses/{userId}")
    public List<Address> getUserAddresses(@PathVariable Long userId) {
        return addressRepository.findAddressByUserId(userId);
    }

    @GetMapping("/orders/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId){
        return orderRepository.findByUserId(userId);
    }
}