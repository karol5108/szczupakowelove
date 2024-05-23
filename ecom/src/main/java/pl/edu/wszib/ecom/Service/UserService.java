package pl.edu.wszib.ecom.Service;

import org.springframework.stereotype.Service;
import pl.edu.wszib.ecom.Exception.ResourceNotFound;
import pl.edu.wszib.ecom.Exception.UserException;
import pl.edu.wszib.ecom.Model.User;

@Service
public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserByByJwt(String jwt) throws UserException;

}
