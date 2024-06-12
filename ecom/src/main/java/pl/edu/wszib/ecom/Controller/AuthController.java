package pl.edu.wszib.ecom.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.edu.wszib.ecom.Configuration.JwtProvider;
import pl.edu.wszib.ecom.Exception.ResourceNotFound;
import pl.edu.wszib.ecom.Exception.UserException;
import pl.edu.wszib.ecom.Model.Address;
import pl.edu.wszib.ecom.Model.Product;
import pl.edu.wszib.ecom.Model.User;
import pl.edu.wszib.ecom.Repository.AddressRepository;
import pl.edu.wszib.ecom.Repository.UserRepository;
import pl.edu.wszib.ecom.Request.LoginRequest;
import pl.edu.wszib.ecom.Response.AuthResponse;
import pl.edu.wszib.ecom.Service.UserServiceImplementation;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword();
        String firstName = user.getName();
        String lastName = user.getLastName();

        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("user with email " + email + " is already exist");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setName(firstName);
        createdUser.setLastName(lastName);
        createdUser.setRole("CUSTOMER");

        User savedUser = userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        return new ResponseEntity<AuthResponse>(new AuthResponse(token, "signup success"), HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
        try {
            String username = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            // Uwierzytelnianie użytkownika
            Authentication authentication = authenticate(username, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generowanie tokenu JWT
            String token = jwtProvider.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponse(token, "login success"), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();  // Zalogowanie wyjątku
            return new ResponseEntity<>(new AuthResponse(null, "login failed"), HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/user/profile")
    public ResponseEntity<User> getUserByToken(@RequestHeader("Authorization") String token) {
        try {
            // Sprawdzenie poprawności tokena JWT i uzyskanie nazwy użytkownika
            String username = jwtProvider.getEmailFromToken(token.substring(7)); // Usunięcie prefiksu "Bearer "

            // Pobranie użytkownika na podstawie nazwy użytkownika
            User user = userRepository.findByEmail(username);

            // Sprawdzenie czy użytkownik istnieje
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Użytkownik nie znaleziony
            }

            return new ResponseEntity<>(user, HttpStatus.OK); // Zwrócenie użytkownika
        } catch (Exception e) {
            e.printStackTrace(); // Zalogowanie wyjątku
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Błąd uwierzytelniania
        }

    }


    

    public Authentication authenticate(String username, String password) {
        // Pobranie szczegółów użytkownika
        UserDetails userDetails = userServiceImplementation.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Username");
        }

        // Sprawdzanie hasła
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }

        // Uwierzytelnianie użytkownika
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }

}
