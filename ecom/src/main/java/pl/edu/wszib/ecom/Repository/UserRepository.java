package pl.edu.wszib.ecom.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.wszib.ecom.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);
}
