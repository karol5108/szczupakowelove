package pl.edu.wszib.ecom.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.wszib.ecom.Dto.RegistrationDto;
import pl.edu.wszib.ecom.Model.User;
import pl.edu.wszib.ecom.Model.UserSecurity;
import pl.edu.wszib.ecom.Repository.UserRepository;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .map(UserSecurity::new)
                .orElseThrow(() -> new UsernameNotFoundException("Username is not found " + username));
    }

    public void registerUser(String username, String password) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("rozpoczeto rejestracje");
        if (isPasswordValid(password)) {
            if (!userRepository.existsByUsername(username)) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode(password));
                user.setRoles("ROLE_USER");
                userRepository.save(user);
            } else {
                throw new IllegalArgumentException("Użytkownik o podanym loginie już istnieje.");
            }
        } else {
            throw new IllegalArgumentException("Nieprawidłowe dane rejestracyjne. Sprawdź, czy login ma co najmniej 3 znaki, a hasło ma co najmniej 3 znaki.");
        }
    }

    public User save(RegistrationDto userRegistrationDto) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = new User();
        user.setUsername(userRegistrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
        user.setRoles("ROLE_USER");
        return  userRepository.save(user);
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 3;
    }
}
