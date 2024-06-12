package pl.edu.wszib.ecom.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.wszib.ecom.Model.Address;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findAddressByUserId ( Long userId );
}
