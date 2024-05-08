package pl.edu.wszib.ecom.Repository;

import org.springframework.data.repository.CrudRepository;
import pl.edu.wszib.ecom.Dto.RegistrationDto;
import pl.edu.wszib.ecom.Model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long>{
    Optional<User> findByUsername(String username);
    User save(RegistrationDto userRegistrationDto);


    boolean existsByUsername(String username);
}
